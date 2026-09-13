export type RobotCommand = "forward" | "backward" | "left" | "right" | "stop";
export type ConnectionState = "disconnected" | "connecting" | "connected" | "error" | "demo";
export type ConnectionMode = "access-point" | "local-network";

export interface CommandRecord {
  id: number;
  command: RobotCommand;
  timestamp: string;
  simulated: boolean;
}