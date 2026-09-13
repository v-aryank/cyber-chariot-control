import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CirclePower, Gauge, Radio, RotateCcw, ShieldAlert, Square, Wifi, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusDot } from "@/components/StatusDot";
import VehicleScene from "@/components/VehicleScene";
import { sendCommand as sendEsp32Command, testConnection } from "@/services/esp32Api";
import type { CommandRecord, ConnectionMode, ConnectionState, RobotCommand } from "@/types/robot";

const commandLabels: Record<RobotCommand, string> = {
  forward: "MOVE_FORWARD", backward: "MOVE_BACKWARD", left: "TURN_LEFT", right: "TURN_RIGHT", stop: "STOP",
};

const initialHistory: CommandRecord[] = [
  { id: 1, command: "forward", timestamp: "22:41:03", simulated: true },
  { id: 2, command: "stop", timestamp: "22:41:05", simulated: true },
  { id: 3, command: "left", timestamp: "22:41:09", simulated: true },
  { id: 4, command: "stop", timestamp: "22:41:12", simulated: true },
];

const telemetry = [
  ["BATTERY VOLTAGE", "12.1 V", "SIMULATED"], ["MOTOR STATUS", "STANDBY", "READY"],
  ["CONNECTION", "DEMO MODE", "LOCAL"], ["CURRENT MODE", "MANUAL", "CONTROL"],
  ["WIFI SIGNAL", "--", "NO LINK"], ["UPTIME", "00:00:00", "SESSION"],
];

export default function ControlCenter() {
  const [demoMode, setDemoMode] = useState(true);
  const [connection, setConnection] = useState<ConnectionState>("demo");
  const [ipAddress, setIpAddress] = useState("192.168.4.1");
  const [connectionMode, setConnectionMode] = useState<ConnectionMode>("access-point");
  const [speed, setSpeed] = useState(70);
  const [activeCommand, setActiveCommand] = useState<RobotCommand>("stop");
  const [history, setHistory] = useState(initialHistory);
  const [connectionError, setConnectionError] = useState("");
  const [autonomous, setAutonomous] = useState(false);
  const commandRef = useRef<RobotCommand>("stop");
  const canMove = demoMode || connection === "connected";

  const recordCommand = useCallback((command: RobotCommand) => {
    setHistory((current) => [{ id: Date.now(), command, timestamp: new Date().toLocaleTimeString("en-GB", { hour12: false }), simulated: demoMode }, ...current].slice(0, 8));
  }, [demoMode]);

  const issueCommand = useCallback(async (command: RobotCommand, force = false) => {
    if (command !== "stop" && (!canMove || autonomous)) return;
    if (commandRef.current === command && command !== "stop") return;
    commandRef.current = command;
    setActiveCommand(command);
    recordCommand(command);
    if (!demoMode && connection === "connected") {
      try { await sendEsp32Command(ipAddress, command); }
      catch (error) {
        setConnection("error");
        setConnectionError(error instanceof Error ? error.message : "Command failed");
        if (command !== "stop" && !force) void issueCommand("stop", true);
      }
    }
  }, [autonomous, canMove, connection, demoMode, ipAddress, recordCommand]);

  const stop = useCallback(() => {
    commandRef.current = "stop";
    void issueCommand("stop", true);
  }, [issueCommand]);

  useEffect(() => {
    const keyMap: Record<string, RobotCommand> = { w: "forward", arrowup: "forward", s: "backward", arrowdown: "backward", a: "left", arrowleft: "left", d: "right", arrowright: "right", " ": "stop" };
    const down = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      const command = keyMap[event.key.toLowerCase()];
      if (!command || event.repeat) return;
      event.preventDefault();
      void issueCommand(command);
    };
    const up = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      const command = keyMap[event.key.toLowerCase()];
      if (command && command !== "stop") stop();
    };
    const hidden = () => { if (document.hidden) stop(); };
    window.addEventListener("keydown", down); window.addEventListener("keyup", up); document.addEventListener("visibilitychange", hidden);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); document.removeEventListener("visibilitychange", hidden); };
  }, [issueCommand, stop]);

  const connect = async () => {
    if (demoMode) { setConnection("demo"); return; }
    setConnection("connecting"); setConnectionError("");
    try { await testConnection(ipAddress); setConnection("connected"); }
    catch (error) { setConnection("error"); setConnectionError(error instanceof Error ? error.message : "Connection failed"); }
  };
  const disconnect = () => { stop(); setConnection(demoMode ? "demo" : "disconnected"); };
  const setDemo = (enabled: boolean) => { stop(); setDemoMode(enabled); setConnection(enabled ? "demo" : "disconnected"); setConnectionError(""); };
  const statusLabel = connection.replace("-", " ").toUpperCase();
  const direction = activeCommand === "stop" ? "STANDBY" : activeCommand.toUpperCase();
  const commandButtons = useMemo(() => [
    { command: "forward" as const, label: "FORWARD", icon: ArrowUp, area: "forward" },
    { command: "left" as const, label: "LEFT", icon: ArrowLeft, area: "left" },
    { command: "stop" as const, label: "STOP", icon: Square, area: "stop" },
    { command: "right" as const, label: "RIGHT", icon: ArrowRight, area: "right" },
    { command: "backward" as const, label: "BACKWARD", icon: ArrowDown, area: "backward" },
  ], []);

  return (
    <main className="nexus-shell">
      <header className="topbar">
        <a href="#vehicle" className="brand" aria-label="NEXUS home"><span className="brand-mark">N</span><span><strong>NEXUS</strong><small>ROBOTIC CONTROL SYSTEM</small></span></a>
        <nav aria-label="Primary navigation">{[["CONTROL","motion"],["TELEMETRY","telemetry"],["SYSTEM","system"],["SETTINGS","settings"]].map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="connection-chip"><StatusDot active={connection === "connected" || connection === "demo"} alert={connection === "error"} /><span>ESP32</span><strong>{statusLabel}</strong></div>
      </header>

      <section id="vehicle" className="hero-section">
        <div className="scan-line" />
        <div className="hero-copy">
          <div className="eyebrow"><span>01</span> NEXUS // HARDWARE INTERFACE 01</div>
          <h1>CONTROL THE<br/><em>MACHINE.</em></h1>
          <h2>A command interface for intelligent motion.</h2>
          <p>Operate, monitor, and eventually automate a custom robotic vehicle through a connected ESP32 control system.</p>
          <div className="hero-actions"><Button asChild variant="technical"><a href="#motion"><Gauge/>OPEN CONTROLS</a></Button><span><StatusDot active /> SYSTEM READY / {demoMode ? "DEMO" : "LIVE"}</span></div>
        </div>
        <div className="vehicle-stage" aria-label="Interactive 3D model of a four-wheel robotic car"><VehicleScene /></div>
        <div className="spec-overlay spec-left"><small>VEHICLE ID</small><strong>NXS-04</strong><small>PLATFORM</small><strong>4WD ROBOTIC PLATFORM</strong><small>CONTROLLER</small><strong>ESP32</strong></div>
        <div className="spec-overlay spec-right"><small>DRIVER</small><strong>L298N × 2</strong><small>STATUS</small><strong className="accent-text">{statusLabel}</strong><small>MODE</small><strong>{autonomous ? "AUTONOMOUS" : "MANUAL"}</strong></div>
        <div className="scroll-cue">SCROLL TO CONTROL <ArrowDown /></div>
      </section>

      <section id="motion" className="content-section motion-section">
        <SectionHeading index="02" label="MOTION" title="MOTION CONTROL" description="Manual vehicle operation interface." />
        <div className="motion-layout">
          <div className="control-deck">
            <div className="panel-topline"><span>INPUT MATRIX / 01</span><span className="key-hint">W A S D + ARROWS</span></div>
            <div className="direction-grid">
              {commandButtons.map(({ command, label, icon: Icon, area }) => <Button key={command} style={{ gridArea: area }} variant={command === "stop" ? "emergency" : "command"} size="command" disabled={command !== "stop" && !canMove} aria-label={label} onPointerDown={() => void issueCommand(command)} onPointerUp={command === "stop" ? undefined : stop} onPointerLeave={command === "stop" ? undefined : stop} onPointerCancel={command === "stop" ? undefined : stop}><Icon/><span>{label}</span></Button>)}
            </div>
            <p className="safety-note"><ShieldAlert/> HOLD TO MOVE · RELEASE TO STOP</p>
          </div>
          <div className="control-readout">
            <div className="speed-header"><span>SPEED LIMIT</span><strong>{speed}<small>%</small></strong></div>
            <Slider aria-label="Vehicle speed" value={[speed]} onValueChange={(value) => setSpeed(value[0] ?? speed)} min={10} max={100} step={5} />
            <div className="metric-row"><span>DIRECTION</span><strong>{direction}</strong></div>
            <div className="metric-row"><span>COMMAND</span><strong>{commandLabels[activeCommand]}</strong></div>
            <div className="metric-row"><span>CONTROL MODE</span><strong>MANUAL</strong></div>
            <div className="mode-indicator"><StatusDot active={canMove}/><span>{canMove ? "INPUT ACCEPTED" : "MOTION LOCKED"}</span></div>
            <Button variant="emergency" className="large-stop" onClick={stop}><ShieldAlert/>EMERGENCY STOP</Button>
          </div>
        </div>
      </section>

      <section id="telemetry" className="content-section">
        <SectionHeading index="03" label="TELEMETRY" title="LIVE TELEMETRY" description="Vehicle data stream and operating state." />
        <div className="telemetry-grid">{telemetry.map(([label,value,note], index) => <article className="telemetry-cell" key={label}><span>0{index + 1}</span><small>{label}</small><strong>{label === "CONNECTION" ? statusLabel : value}</strong><em>{demoMode ? "DEMO DATA" : note}</em></article>)}</div>
      </section>

      <section id="system" className="content-section system-section">
        <div className="connection-panel">
          <SectionHeading index="04" label="CONNECTION" title="HARDWARE CONNECTION" description="Configure the local ESP32 control endpoint." />
          <label className="field-label" htmlFor="esp-ip">ESP32 IP ADDRESS</label>
          <div className="input-line"><Input id="esp-ip" value={ipAddress} onChange={(event) => setIpAddress(event.target.value)} disabled={demoMode} /><Radio /></div>
          <div className="segment-control" aria-label="Connection mode">{(["access-point", "local-network"] as ConnectionMode[]).map((mode) => <Button key={mode} variant={connectionMode === mode ? "default" : "ghost"} onClick={() => setConnectionMode(mode)}>{mode === "access-point" ? "ACCESS POINT" : "LOCAL WI-FI"}</Button>)}</div>
          <div className="connection-actions"><Button variant="technical" onClick={connect} disabled={connection === "connecting"}><CirclePower/>{connection === "connecting" ? "CONNECTING" : "CONNECT"}</Button><Button variant="outline" onClick={disconnect}>DISCONNECT</Button><Button variant="ghost" onClick={connect}>TEST CONNECTION</Button></div>
          {connectionError ? <p className="error-message">{connectionError}</p> : null}
          <div className="hardware-stack">{[["CONTROLLER","ESP32"],["MOTOR DRIVER","L298N"],["DRIVE SYSTEM","4WD"]].map(([a,b]) => <div key={a}><StatusDot active={canMove}/><span>{a}</span><strong>{b}</strong></div>)}</div>
        </div>
        <div className="diagnostics-panel">
          <SectionHeading index="05" label="SYSTEM" title="DIAGNOSTICS" />
          {[["MOTOR DRIVER","L298N","NOMINAL"],["CONTROLLER","ESP32",demoMode ? "SIMULATED" : statusLabel],["MOTOR CONFIGURATION","4-WHEEL DRIVE","READY"],["CONTROL MODE",autonomous ? "AUTONOMOUS" : "MANUAL","ACTIVE"],["FIRMWARE",connection === "connected" ? "ONLINE" : "NOT CONNECTED","--"],["SYSTEM HEALTH",demoMode ? "DEMO MODE" : "UNKNOWN","MONITOR"]].map(([a,b,c]) => <div className="diagnostic-row" key={a}><span><StatusDot active={c === "NOMINAL" || c === "READY" || c === "ACTIVE"}/>{a}</span><strong>{b}</strong><small>{c}</small></div>)}
        </div>
      </section>

      <section className="content-section lower-grid">
        <div className="history-panel"><SectionHeading index="06" label="LOG" title="COMMAND HISTORY" />{history.map((entry) => <div className="history-row" key={entry.id}><time>{entry.timestamp}</time><strong>{commandLabels[entry.command]}</strong><small>{entry.simulated ? "SIM" : "LIVE"}</small></div>)}</div>
        <div id="settings" className="settings-panel"><SectionHeading index="07" label="CONFIG" title="SETTINGS" />
          <div className="setting-row"><span><strong>DEMO MODE</strong><small>Simulate controls without hardware</small></span><Switch checked={demoMode} onCheckedChange={setDemo}/></div>
          <div className="setting-row"><span><strong>AUTONOMOUS MODE</strong><small>Requires safety confirmation</small></span><Switch checked={autonomous} onCheckedChange={(checked) => { if (!checked || window.confirm("Enable autonomous mode? Manual motion controls will be locked until disabled.")) { stop(); setAutonomous(checked); } }}/></div>
          <Button variant="outline" className="reset-button" onClick={() => { setSpeed(70); stop(); }}><RotateCcw/>RESET CONTROL STATE</Button>
        </div>
      </section>

      <footer><span>NEXUS // ROBOTIC CONTROL SYSTEM</span><span>INTERFACE BUILD 01.0</span><span><StatusDot active={canMove}/> {statusLabel}</span></footer>
      <Button variant="emergency" className="fixed-stop" onClick={stop} aria-label="Emergency stop"><Zap/><span>STOP</span></Button>
    </main>
  );
}