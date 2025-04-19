'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const WORDS = [
  { id: 'Nosotros', pos: new THREE.Vector3(-6, 3, 0) },
  { id: 'Contacto', pos: new THREE.Vector3(5, -2, 0) },
];

function Snake() {
  const segments = useRef<THREE.Vector3[]>([]);
  const curve = useRef(new THREE.CatmullRomCurve3([]));
  const meshRef = useRef<THREE.Mesh>(null!);

  if (segments.current.length === 0) {
    segments.current = Array.from({ length: 60 }).map(
      (_, i) => new THREE.Vector3(-10 + i * 0.4, 0, 0)
    );
    curve.current.points = segments.current;
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.4;
    const head = new THREE.Vector3(
      Math.cos(t) * 8,
      Math.sin(t * 1.2) * 4,
      0
    );
    segments.current.unshift(head);
    segments.current.pop();
    curve.current.points = segments.current;
    const geo = new THREE.TubeGeometry(
      curve.current,
      60,
      0.15 + 0.03 * Math.sin(clock.getElapsedTime() * 3),
      8,
      false
    );
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = geo;
  });

  return (
    <mesh ref={meshRef} material={new THREE.MeshBasicMaterial({ color: '#fff' })}>
      <bufferGeometry />
    </mesh>
  );
}

export default function SnakeAnimation() {
  const [eaten, setEaten] = useState<Set<string>>(new Set());

  // Aquí puedes detectar colisiones y actualizar eaten

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <OrthographicCamera
        makeDefault
        left={-10}
        right={10}
        top={7}
        bottom={-7}
        near={0.1}
        far={100}
        position={[0, 0, 20]}
      />
      <ambientLight intensity={0.5} />
      <Snake />
      {WORDS.map((w) =>
        !eaten.has(w.id) ? (
          <Text key={w.id} position={[w.pos.x, w.pos.y, w.pos.z]} fontSize={1} color="#facc15">
            {w.id}
          </Text>
        ) : null
      )}
    </Canvas>
  );
}