# Nexus Command

Build a premium futuristic web application called:

NEXUS // ROBOTIC CONTROL SYSTEM

This is a web-based control dashboard for my custom 4-wheel robotic car powered by ESP32 and L298N motor drivers.

The application should feel like a real engineering command center, not a generic dashboard or a simple remote-control webpage.

The visual direction is inspired by:
- Advanced robotics laboratories
- Futuristic engineering interfaces
- JARVIS-style technology dashboards
- Spacecraft control systems
- Industrial automation software
- Premium sci-fi interfaces

The application must be highly polished, visually impressive, responsive, and functional.

==================================================
1. DESIGN SYSTEM
==================================================

Primary theme:

- Black background
- Deep black surfaces
- Electric blue accent
- Cyan highlights
- Subtle blue glow
- Dark metallic elements
- White and muted gray typography

Suggested colors:

Background:
#05070A

Surface:
#0B1017

Secondary Surface:
#101923

Electric Blue:
#00A8FF

Bright Cyan:
#00D9FF

Primary Text:
#EAF6FF

Muted Text:
#718096

Borders:
rgba(0, 168, 255, 0.18)

The interface should feel technical, minimal, premium, and cinematic.

Do not make it look like a gaming website.

Do not use excessive gradients, excessive rounded cards, colorful dashboards, or generic SaaS templates.

Use sharp engineering-inspired panels with subtle rounded corners.

Use thin borders, precise spacing, technical labels, and elegant animations.

==================================================
2. TYPOGRAPHY
==================================================

Use a modern technical typography system.

Recommended fonts:

- Space Grotesk for headings
- IBM Plex Mono for technical data
- JetBrains Mono or another monospace font for telemetry
- Inter for readable interface text

Typography should create a strong contrast between:

Engineering data:
Monospace, compact, technical.

Main headings:
Modern, bold, futuristic.

Use uppercase labels where appropriate.

Examples:

NEXUS
ROBOTIC CONTROL SYSTEM
MOTION CONTROL
TELEMETRY
SYSTEM STATUS
MOTOR OUTPUT
CONNECTION
AUTONOMOUS MODE

Avoid excessive text.

==================================================
3. HERO SECTION
==================================================

Create a large cinematic hero section.

This should be the most visually impressive part of the application.

Hero content:

Small technical label:

NEXUS // HARDWARE INTERFACE 01

Main heading:

CONTROL THE MACHINE.

Secondary heading:

A command interface for intelligent motion.

Supporting text:

Operate, monitor, and eventually automate a custom robotic vehicle through a connected ESP32 control system.

Hero should contain a large interactive 3D model of my robotic car.

==================================================
4. 3D ROBOTIC CAR MODEL
==================================================

IMPORTANT:

Use the uploaded robotic car images as the primary visual reference for the vehicle design.

The uploaded images show my actual custom robotic car.

The 3D model should resemble this specific vehicle.

Vehicle design requirements:

- Four large black rubber wheels
- Yellow TT DC gear motors
- Dark black or charcoal rectangular chassis
- Compact four-wheel robotic car body
- Low-profile engineering design
- Two motor driver boards mounted on the upper chassis
- Central battery enclosure
- Visible mechanical construction
- Dark industrial materials
- Realistic proportions
- Clean technical appearance

VERY IMPORTANT:

Remove all ultrasonic sonar sensors from the 3D model.

Do not include:

- Front ultrasonic sensors
- Side ultrasonic sensors
- Sensor brackets
- Sonar modules
- Circular sensor housings
- Any sensor array

The final vehicle should be a clean 4-wheel robotic car without sonar sensors.

The vehicle should look like a simplified, refined version of my real hardware.

==================================================
5. 3D MODEL IMPLEMENTATION
==================================================

Use Three.js with React Three Fiber if possible.

Use:

- @react-three/fiber
- @react-three/drei
- Three.js

If a real custom 3D model is not available, create a convincing stylized 3D robotic car using Three.js primitives.

The model should include:

- Chassis
- Four wheels
- Yellow motor housings
- Battery enclosure
- Motor driver boards
- Subtle metallic materials
- Realistic lighting
- Dark industrial finish

The 3D model should not be a generic car.

It should clearly look like a small engineering robot.

3D interaction:

- Slowly rotate the vehicle automatically
- Allow mouse drag rotation
- Allow touch rotation on mobile
- Allow zooming
- Add subtle floating motion
- Add a soft electric-blue rim light
- Add subtle ground shadow
- Add a technical grid beneath the vehicle
- Add small animated blue light accents

Do not overdo the animation.

The vehicle must remain the main visual focus.

==================================================
6. HERO TECHNICAL OVERLAY
==================================================

Add subtle technical UI elements around the 3D car.

Examples:

VEHICLE ID:
NXS-04

PLATFORM:
4WD ROBOTIC PLATFORM

CONTROLLER:
ESP32

DRIVER:
L298N

STATUS:
STANDBY

MODE:
MANUAL

These labels should appear as elegant floating technical overlays.

Use animated thin lines and small glowing indicators.

Avoid cluttering the 3D model.

==================================================
7. MAIN APPLICATION STRUCTURE
==================================================

Create the following main sections:

1. Navigation
2. Hero / Vehicle Overview
3. Motion Control
4. Telemetry
5. Connection Panel
6. System Diagnostics
7. Command History
8. Settings

The navigation should be minimal and technical.

Navigation:

NEXUS logo

CONTROL
TELEMETRY
SYSTEM
SETTINGS

Right side:

Connection indicator

ESP32 STATUS

Example:

● DISCONNECTED

==================================================
8. MOTION CONTROL PANEL
==================================================

Create a dedicated motion-control section.

Title:

MOTION CONTROL

Subtitle:

Manual vehicle operation interface.

The control interface should be visually premium and easy to use.

Main control layout:

              FORWARD
                 ↑

       LEFT     STOP     RIGHT
        ←        ■         →

              BACKWARD
                 ↓

Use a futuristic directional control interface.

Buttons should have:

- Electric-blue hover glow
- Smooth press animation
- Clear icons
- Technical labels
- Strong visual feedback
- Accessible contrast

Controls:

FORWARD
BACKWARD
LEFT
RIGHT
STOP

Also include:

- Speed slider
- Current speed percentage
- Movement direction
- Current command
- Manual mode indicator

Example:

SPEED
70%

DIRECTION
FORWARD

COMMAND
MOVE_FORWARD

==================================================
9. SAFETY FEATURES
==================================================

This is a physical robotic car.

The interface must include proper safety behavior.

Implement:

- Large emergency STOP button
- Keyboard control
- Release-to-stop behavior for directional controls
- Stop command when connection is lost
- Stop command when the browser tab becomes hidden
- Prevent movement when the system is disconnected
- Clear connection status
- Confirmation before enabling autonomous mode

IMPORTANT:

The STOP button should always remain easy to access.

Do not make the emergency stop hidden inside a menu.

Keyboard controls:

W = Forward
S = Backward
A = Left
D = Right
Space = Emergency Stop

Arrow keys should also work.

==================================================
10. TELEMETRY SECTION
==================================================

Create a technical telemetry dashboard.

Display:

BATTERY VOLTAGE
MOTOR STATUS
CONNECTION STATUS
CURRENT MODE
LAST COMMAND
WIFI SIGNAL
UPTIME

Example visual values:

BATTERY:
12.1V

MOTOR STATUS:
STANDBY

CONNECTION:
DISCONNECTED

CURRENT MODE:
MANUAL

WIFI SIGNAL:
--

UPTIME:
00:00:00

Use animated data updates.

If real telemetry is unavailable, show:

DEMO DATA

Do not pretend simulated values are real hardware measurements.

==================================================
11. CONNECTION PANEL
==================================================

Create a dedicated ESP32 connection panel.

Title:

HARDWARE CONNECTION

Fields:

ESP32 IP ADDRESS

Example placeholder:

192.168.4.1

Connection mode:

- ESP32 Access Point
- Local Wi-Fi Network

Connection status:

DISCONNECTED
CONNECTING
CONNECTED
ERROR

Buttons:

CONNECT
DISCONNECT
TEST CONNECTION

Display:

ESP32
L298N MOTOR DRIVER
4WD MOTOR SYSTEM

The UI should be designed so that actual ESP32 communication can be connected later.

==================================================
12. ESP32 API INTEGRATION
==================================================

Design the frontend around a clean API abstraction.

The initial ESP32 firmware will expose HTTP endpoints such as:

GET /forward
GET /backward
GET /left
GET /right
GET /stop

The frontend should have a central API service.

Example conceptual structure:

src/
  components/
  sections/
  hooks/
  services/
    esp32Api.js
  lib/
  types/

Create a clean command function:

sendCommand(command)

Supported commands:

forward
backward
left
right
stop

The ESP32 IP address must be configurable.

Do not hardcode the IP address throughout the application.

Use a single configurable endpoint.

==================================================
13. DEMO MODE
==================================================

Since the ESP32 may not always be connected, create a DEMO MODE.

When demo mode is active:

- The 3D car still animates
- Buttons still respond visually
- Telemetry displays clearly marked simulated values
- Connection status shows DEMO MODE
- No real hardware commands are sent

Example:

SYSTEM STATUS:
DEMO MODE

This makes the interface useful even without the physical car.

==================================================
14. SYSTEM DIAGNOSTICS
==================================================

Create a diagnostics section.

Display:

MOTOR DRIVER
L298N

CONTROLLER
ESP32

MOTOR CONFIGURATION
4-WHEEL DRIVE

CONTROL MODE
MANUAL

FIRMWARE
NOT CONNECTED

SYSTEM HEALTH
UNKNOWN

Use technical status indicators.

Make it look like a real robotics engineering interface.

==================================================
15. COMMAND HISTORY
==================================================

Create a small command history panel.

Example:

22:41:03  MOVE_FORWARD
22:41:05  STOP
22:41:09  TURN_LEFT
22:41:12  STOP

Use monospace typography.

Keep the history clean and readable.

==================================================
16. ANIMATIONS
==================================================

Use tasteful premium animations.

Required:

- Smooth page entrance
- Scroll reveal
- Subtle blue glow
- Animated connection indicator
- Smooth button press
- 3D model rotation
- Hover effects
- Animated telemetry values
- Smooth section transitions
- Technical scanning line effects

Avoid:

- Excessive bouncing
- Distracting particle explosions
- Excessive neon
- Slow page transitions
- Overly complicated animations

The interface should feel responsive and engineered.

==================================================
17. RESPONSIVE DESIGN
==================================================

The application must work well on:

- Desktop
- Laptop
- Tablet
- Android phone

On mobile:

- Use a compact layout
- Make motion controls touch-friendly
- Keep STOP button accessible
- Make the 3D model responsive
- Avoid horizontal scrolling
- Ensure controls are usable with one hand

==================================================
18. VISUAL DETAILS
==================================================

Add subtle technical details:

- Thin blue grid lines
- Small status dots
- Monospace telemetry
- Engineering labels
- Fine borders
- Dark panels
- Minimal glowing elements
- Technical section numbering

Examples:

01 // VEHICLE
02 // MOTION
03 // TELEMETRY
04 // SYSTEM

The design should look like a professional robotics software product.

==================================================
19. CODE QUALITY
==================================================

Use:

- React
- TypeScript if possible
- Tailwind CSS
- Three.js / React Three Fiber
- Clean reusable components
- Modular structure
- Responsive layout
- Accessible buttons
- Proper loading states
- Error handling

Avoid putting the entire application into one component.

Keep the code easy to extend.

==================================================
20. FINAL GOAL
==================================================

The final result should feel like:

A futuristic robotic car command center.

Not a generic dashboard.

Not a simple Arduino project page.

Not a normal remote-control app.

It should feel like a serious engineering interface for my own robotic vehicle.

The main visual identity should be:

BLACK + ELECTRIC BLUE + 3D ROBOTIC CAR + TECHNICAL MOTION CONTROL.

Build the first polished version with working demo controls and a clear structure for future ESP32 integration.\


## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
