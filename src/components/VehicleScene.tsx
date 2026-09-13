import { ContactShadows, Float, Grid, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.48, 0.48, 0.32, 32]} />
        <meshStandardMaterial color="#090b0d" roughness={0.82} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.025, 24]} />
        <meshStandardMaterial color="#313941" metalness={0.82} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Board({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.82, 0.08, 0.58]} />
        <meshStandardMaterial color="#0b5c50" roughness={0.45} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[0.34, 0.1, 0.3]} />
        <meshStandardMaterial color="#171c20" roughness={0.55} />
      </mesh>
      {[-0.31, 0.31].map((x) => (
        <mesh key={x} position={[x, 0.1, 0]}>
          <boxGeometry args={[0.11, 0.12, 0.42]} />
          <meshStandardMaterial color="#2b79b6" metalness={0.35} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Robot() {
  const robotRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (robotRef.current) robotRef.current.rotation.y += delta * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={robotRef} rotation={[0.03, -0.55, -0.03]} position={[0, 0.12, 0]}>
        <mesh castShadow position={[0, 0.18, 0]}>
          <boxGeometry args={[2.7, 0.16, 1.55]} />
          <meshStandardMaterial color="#151c22" metalness={0.74} roughness={0.28} />
        </mesh>
        <mesh castShadow position={[0, 0.37, 0]}>
          <boxGeometry args={[2.25, 0.22, 1.2]} />
          <meshStandardMaterial color="#0b0f13" metalness={0.62} roughness={0.32} />
        </mesh>

        {[-0.94, 0.94].flatMap((x) => [-0.68, 0.68].map((z) => (
          <Wheel key={`${x}-${z}`} position={[x, 0.03, z]} />
        )))}

        {[-0.88, 0.88].flatMap((x) => [-0.48, 0.48].map((z) => (
          <mesh key={`motor-${x}-${z}`} castShadow position={[x, 0.21, z]}>
            <boxGeometry args={[0.62, 0.3, 0.32]} />
            <meshStandardMaterial color="#d6a20c" metalness={0.24} roughness={0.52} />
          </mesh>
        )))}

        <mesh castShadow position={[0, 0.62, 0]}>
          <boxGeometry args={[0.78, 0.48, 0.88]} />
          <meshStandardMaterial color="#242a2f" metalness={0.48} roughness={0.36} />
        </mesh>
        <mesh position={[0, 0.87, 0]}>
          <boxGeometry args={[0.42, 0.05, 0.52]} />
          <meshStandardMaterial color="#080b0e" metalness={0.4} roughness={0.3} />
        </mesh>
        <Board position={[-0.78, 0.54, 0]} />
        <Board position={[0.78, 0.54, 0]} />

        {[-1, 1].map((x) => (
          <mesh key={`rail-${x}`} position={[x * 1.18, 0.45, 0]}>
            <boxGeometry args={[0.045, 0.34, 1.05]} />
            <meshStandardMaterial color="#66737e" metalness={0.9} roughness={0.18} />
          </mesh>
        ))}
        <mesh position={[0, 0.42, -0.72]}>
          <boxGeometry args={[1.35, 0.035, 0.035]} />
          <meshStandardMaterial color="#00c9ff" emissive="#008dcc" emissiveIntensity={2.6} />
        </mesh>
      </group>
    </Float>
  );
}

export default function VehicleScene() {
  return (
    <Canvas camera={{ position: [4.2, 2.8, 4.4], fov: 34 }} dpr={[1, 1.8]} shadows gl={{ antialias: true }}>
      <color attach="background" args={["#05070a"]} />
      <fog attach="fog" args={["#05070a", 7, 13]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 3]} intensity={2.2} color="#d9f4ff" castShadow />
      <pointLight position={[-3, 2, -2]} intensity={22} color="#009dff" distance={8} />
      <pointLight position={[3, 1, 3]} intensity={13} color="#00d9ff" distance={7} />
      <Robot />
      <Grid position={[0, -0.42, 0]} args={[12, 12]} cellSize={0.45} cellThickness={0.55} cellColor="#126086" sectionSize={2.7} sectionThickness={0.9} sectionColor="#0789bd" fadeDistance={7} fadeStrength={1.4} infiniteGrid />
      <ContactShadows position={[0, -0.4, 0]} opacity={0.58} scale={7} blur={2.2} far={4} />
      <OrbitControls enablePan={false} minDistance={4.6} maxDistance={8} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.2} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  );
}