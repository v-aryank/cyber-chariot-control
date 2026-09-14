# NEXUS Car Control

A modern web-based control dashboard for an ESP32-powered robotic car.

> **Status:** Prototype / Active development

## Features

- Responsive robotic-car control dashboard
- Forward, backward, left, right, and stop controls
- Futuristic dark interface
- React + TypeScript component architecture
- TanStack Router integration
- Tailwind CSS styling
- Vite development environment
- Designed for ESP32 Wi-Fi control

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Start
- Tailwind CSS
- ESP32

## Project Structure

```text
cyber-chariot-control/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── lib/
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── styles.css
│   └── routeTree.gen.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Allow access from other devices on the same network

```bash
npm run dev -- --host 0.0.0.0
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

For another device on the same Wi-Fi network, use the displayed network address:

```text
http://192.168.x.x:5173/
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## ESP32 Integration

The intended communication flow is:

```text
Web Dashboard
      │
      │ Wi-Fi / HTTP / WebSocket
      ▼
ESP32 Controller
      │
      ▼
Motor Driver
      │
      ▼
DC Motors
```

The ESP32 firmware should:

1. Connect to Wi-Fi.
2. Receive movement commands.
3. Control the motor driver.
4. Return connection or telemetry data when required.

Example command:

```json
{
  "command": "forward"
}
```

Possible commands:

```text
forward
backward
left
right
stop
```

> Match the command format with the ESP32 firmware.

## Development Notes

- Keep `tanstackRouter()` before `react()` in `vite.config.ts`.
- Do not commit private credentials or `.env` files.
- Test the dashboard before connecting the physical car.
- Always keep an emergency stop command available.

## Safety

- Test with the wheels lifted first.
- Check motor-driver wiring before powering the system.
- Use a suitable power supply.
- Keep the car supervised during testing.

## Roadmap

- [ ] Connect dashboard to ESP32
- [ ] Add live connection status
- [ ] Add joystick/touch control
- [ ] Add speed control
- [ ] Add battery monitoring
- [ ] Add ultrasonic obstacle detection
- [ ] Add camera streaming
- [ ] Add autonomous navigation
- [ ] Add telemetry logs

## Author

**Aryan Kabir**

Electrical Engineering student, web developer, and robotics/AI enthusiast.

## License

This project is intended for educational, experimental, and personal robotics development.