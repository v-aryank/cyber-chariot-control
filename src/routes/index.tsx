import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ControlCenter = lazy(() => import("@/components/ControlCenter"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS // Robotic Control System" },
      { name: "description", content: "Command, monitor, and control a custom ESP32 four-wheel robotic platform." },
      { property: "og:title", content: "NEXUS // Robotic Control System" },
      { property: "og:description", content: "Command, monitor, and control a custom ESP32 four-wheel robotic platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Suspense fallback={<div className="loading-screen"><span className="status-dot status-dot-active" /> INITIALIZING NEXUS</div>}>
      <ControlCenter />
    </Suspense>
  );
}