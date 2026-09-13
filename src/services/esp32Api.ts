import type { RobotCommand } from "@/types/robot";

const REQUEST_TIMEOUT_MS = 2500;

export function normalizeEsp32Address(address: string) {
  const trimmed = address.trim().replace(/\/$/, "");
  if (!trimmed) throw new Error("Enter an ESP32 address");
  return /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
}

async function requestEndpoint(address: string, endpoint: string) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${normalizeEsp32Address(address)}/${endpoint}`, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`ESP32 returned ${response.status}`);
    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Connection timed out");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function sendCommand(address: string, command: RobotCommand) {
  return requestEndpoint(address, command);
}

export function testConnection(address: string) {
  return requestEndpoint(address, "stop");
}