"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { product, type Finish } from "@/content/product";

type Props = {
  finish: Finish;
  /** Intensité du panneau avant rétroéclairé. */
  glow?: number;
  /** Rotation de repos, en radians. */
  rotation?: [number, number, number];
  /** Joue l'entrée à l'apparition (une seule fois). */
  entrance?: boolean;
};

const EASE_OUT_EXPO = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function ProductModel({
  finish,
  glow = 1,
  rotation = [0, 0, 0],
  entrance = true,
}: Props) {
  const { scene } = useGLTF(product.model.src);

  /**
   * L'objet affiché est *dérivé* de la scène chargée, jamais modifié en
   * place : chaque finition produit sa propre copie, avec ses propres
   * matériaux. Les textures, elles, restent partagées — une seule copie
   * en mémoire vidéo.
   */
  const object = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const material = (
        mesh.material as THREE.MeshStandardMaterial
      ).clone();
      material.emissive = new THREE.Color(0xffffff);
      material.color.set(finish.tint).multiplyScalar(finish.gain);
      material.roughness = finish.roughness;
      material.metalness = finish.metalness;
      material.emissiveIntensity = glow;
      mesh.material = material;
    });
    return root;
  }, [scene, finish, glow]);

  // Les matériaux clonés nous appartiennent : on les libère quand l'objet
  // est remplacé ou démonté. Les textures sont partagées, on n'y touche pas.
  useEffect(() => {
    const retired = object;
    return () => {
      retired.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material?.dispose();
      });
    };
  }, [object]);

  const group = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  const done = useRef(!entrance);

  useFrame((state) => {
    if (done.current || !group.current) return;
    if (start.current === null) start.current = state.clock.elapsedTime;

    const t = Math.min((state.clock.elapsedTime - start.current) / 1.3, 1);
    const eased = EASE_OUT_EXPO(t);

    group.current.scale.setScalar(0.88 + 0.12 * eased);
    group.current.rotation.y = rotation[1] + (1 - eased) * -0.55;

    if (t === 1) {
      group.current.scale.setScalar(1);
      group.current.rotation.y = rotation[1];
      done.current = true;
    }
  });

  return (
    <group ref={group} rotation={rotation} scale={entrance ? 0.88 : 1}>
      <group scale={product.model.scale}>
        <primitive object={object} />
      </group>
    </group>
  );
}

useGLTF.preload(product.model.src);
