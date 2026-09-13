import { cn } from "@/lib/utils";

export function StatusDot({ active = false, alert = false }: { active?: boolean; alert?: boolean }) {
  return <span className={cn("status-dot", active && "status-dot-active", alert && "status-dot-alert")} aria-hidden="true" />;
}