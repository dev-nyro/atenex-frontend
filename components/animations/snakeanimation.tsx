'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const WORDS = [
  { id: 'Nosotros', pos: new THREE.Vector3(-6, 3, 0) },
  { id: 'Contacto', pos: new THREE.Vector3(5, -2, 0) },
];

// Curva para la forma de 'A'
const A_SHAPE_POINTS = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-2, -2, 0),
  new THREE.Vector3(0, 2, 0),
  new THREE.Vector3(2, -2, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(1, 0, 0),
]).getPoints(100);

interface SnakeProps {
  eaten: Set<string>;
  onEat: (id: string) => void;
  final: boolean;
}

function Snake({ eaten, onEat, final }: SnakeProps) {
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
    if (final) {
      // Dibujar forma de 'A' estática
      segments.current = A_SHAPE_POINTS.map(p => p.clone());
      curve.current.points = segments.current;
    } else {
      const t = clock.getElapsedTime() * 0.4;
      const head = new THREE.Vector3(
        Math.cos(t) * 8,
        Math.sin(t * 1.2) * 4,
        0
      );
      // Detectar colisiones con palabras
      WORDS.forEach(w => {
        if (!eaten.has(w.id) && head.distanceTo(w.pos) < 0.5) {
          onEat(w.id);
        }
      });
      // Crecer según comidas
      const maxLen = 60 + eaten.size * 5;
      segments.current.unshift(head);
      if (segments.current.length > maxLen) segments.current.pop();
      curve.current.points = segments.current;
    }
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
  const final = eaten.size >= WORDS.length;

  // Callback para registrar palabra comida
  const handleEat = (id: string) => {
    setEaten(prev => new Set(prev).add(id));
  };

  useEffect(() => {
    if (final) {
      // opcional: reproducir sonido o animación al llegar al final
    }
  }, [final]);

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
      <Snake eaten={eaten} onEat={handleEat} final={final} />
      {WORDS.map((w) =>
        !eaten.has(w.id) ? (
          <Text key={w.id} position={[w.pos.x, w.pos.y, w.pos.z]} fontSize={1} color="#facc15">
            {w.id}
          </Text>
        ) : null
      )}
      {final && (
        <Text position={[0, -1, 0]} fontSize={2.5} color="#fff" anchorX="center" anchorY="middle">
          Atenex
        </Text>
      )}
    </Canvas>
  );
}