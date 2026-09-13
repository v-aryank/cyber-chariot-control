# NEXUS Robotic Control System

## Goal
Build a polished, responsive engineering command center for a custom ESP32-powered four-wheel robot. The first version will operate safely in demo mode and be structured for later HTTP control of real hardware.

## What will be built
- A dark, cinematic interface with electric-blue and cyan technical accents, precise borders, grid details, and responsive layouts.
- A full-bleed hero featuring a custom interactive 3D robot built from Three.js primitives: four rubber wheels, yellow TT motors, charcoal chassis, battery enclosure, and two motor-driver boards, with no sonar hardware.
- Desktop and mobile navigation with live connection state and direct section access.
- Motion controls for forward, backward, left, right, and emergency stop, including keyboard controls and touch-friendly press-and-hold behavior.
- Safety behavior: release-to-stop, stop on tab hiding, stop on disconnect, blocked movement while disconnected, and autonomous-mode confirmation.
- Demo mode with clearly labeled simulated telemetry and responsive visual controls without hardware requests.
- Configurable ESP32 connection panel supporting access-point and local-network modes, connection testing, and explicit connect/disconnect states.
- Telemetry, diagnostics, command history, and settings panels with compact engineering presentation.
- A fixed, always-accessible emergency stop control.

## Technical details
- Install and use `three`, `@react-three/fiber`, and `@react-three/drei` for the custom robot scene.
- Split the application into focused sections, hooks, types, and an ESP32 API service rather than one large page file.
- Keep the ESP32 address in one configurable state and route all hardware actions through a central `sendCommand(command)` API abstraction.
- Use semantic OKLCH design tokens in the global stylesheet, with Space Grotesk, IBM Plex Mono, and Inter loaded in the document head.
- Implement real connection requests defensively; demo mode remains the default so the interface works immediately.
- Add route-specific metadata and accessible labels, focus states, reduced-motion handling, and mobile-safe sizing.
- Verify the rendered application at desktop and mobile sizes, including 3D visibility, controls, overflow, runtime errors, and build status.

## Assumption
No robot reference images are currently available in the project upload area, so the vehicle will be modeled from the detailed hardware description using refined 3D primitives.
