"use client";

import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  Lightformer,
  PresentationControls,
  useProgress,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import ProductModel from "./ProductModel";
import type { Finish } from "@/content/product";

/**
 * Éclairage entièrement procédural : des surfaces émissives tiennent le
 * rôle de la boîte à lumière d'un studio photo. Aucune carte HDR n'est
 * téléchargée, donc rien à attendre et rien à héberger.
 */
function Studio({ dark }: { dark: boolean }) {
  return (
    // L'éclairage est fixe : une seule passe suffit, inutile de le
    // recalculer à chaque image.
    <Environment resolution={256} frames={1}>
      {/* Boîte principale, au-dessus et légèrement en avant */}
      <Lightformer
        form="rect"
        intensity={dark ? 1.1 : 3.4}
        position={[0, 3.2, 1.6]}
        rotation={[-Math.PI / 2.4, 0, 0]}
        scale={[7, 5, 1]}
        color="#ffffff"
      />
      {/* Filet latéral : c'est lui qui dessine l'arête de l'aluminium */}
      <Lightformer
        form="rect"
        intensity={dark ? 2.4 : 2.1}
        position={[-4, 0.6, 1.2]}
        rotation={[0, Math.PI / 2.1, 0]}
        scale={[4, 3.5, 1]}
        color={dark ? "#9ec4ff" : "#ffffff"}
      />
      <Lightformer
        form="rect"
        intensity={dark ? 0.6 : 1.5}
        position={[4.2, -0.4, 0.8]}
        rotation={[0, -Math.PI / 2.1, 0]}
        scale={[3, 3, 1]}
        color="#ffffff"
      />
      {/* Renvoi du sol, pour que le dessous ne soit pas noir */}
      <Lightformer
        form="rect"
        intensity={dark ? 0.2 : 1.1}
        position={[0, -3, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[6, 4, 1]}
        color={dark ? "#4a5560" : "#dfe0dc"}
      />
    </Environment>
  );
}

/**
 * Garde l'objet entier dans le cadre quelle que soit la forme du
 * conteneur : on recule la caméra jusqu'à ce que la plus contraignante
 * des deux dimensions tienne. Évite tout rognage sur écran étroit.
 */
function Framing({ radius, margin }: { radius: number; margin: number }) {
  useFrame(({ camera, size }) => {
    // Pendant un redimensionnement, la taille peut passer par zéro : on
    // laisse alors la caméra où elle est plutôt que de la projeter à l'infini.
    if (!size.width || !size.height) return;
    const perspective = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const half = Math.tan((perspective.fov * Math.PI) / 360);
    const distance = Math.max(radius / half, radius / (half * aspect)) * margin;
    if (!Number.isFinite(distance)) return;
    if (Math.abs(perspective.position.z - distance) > 0.002) {
      perspective.position.z = distance;
      perspective.updateProjectionMatrix();
    }
  });
  return null;
}

/** Barre de chargement du modèle. Vit hors du Canvas, dans la mise en page. */
export function ModelProgress() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none flex items-center gap-3">
      <div className="h-px flex-1 bg-ink/20">
        <div
          className="h-px bg-ink transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="t-data text-ink-soft">
        chargement {Math.round(progress)} %
      </span>
    </div>
  );
}

type Props = {
  finish: Finish;
  /** Scène sombre : éclairage froid et panneau avant poussé. */
  dark?: boolean;
  glow?: number;
  /** Diffusion lumineuse autour du panneau avant. Réservé aux scènes sombres. */
  bloom?: boolean;
  /** Autorise la rotation à la souris / au doigt. */
  interactive?: boolean;
  rotation?: [number, number, number];
  /** Air laissé autour de l'objet. 1 = il touche les bords. */
  framing?: number;
  className?: string;
};

export default function ProductStage({
  finish,
  dark = false,
  glow = 1,
  bloom = false,
  interactive = true,
  rotation = [0, -0.45, 0],
  framing = 1.06,
  className,
}: Props) {
  const model = (
    <Center>
      <ProductModel finish={finish} glow={glow} rotation={rotation} />
    </Center>
  );

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ position: [0, 0.15, 4.4], fov: 30 }}
        style={{ touchAction: interactive ? "none" : "auto" }}
      >
        {dark ? <color attach="background" args={["#15191c"]} /> : null}
        <Framing radius={0.98} margin={framing} />
        <Suspense fallback={null}>
          <Studio dark={dark} />
          {interactive ? (
            <PresentationControls
              global
              snap
              cursor
              speed={1.4}
              zoom={1}
              rotation={[0, 0, 0]}
              polar={[-0.25, 0.3]}
              azimuth={[-0.7, 0.7]}
              damping={0.22}
            >
              {model}
            </PresentationControls>
          ) : (
            model
          )}
          {bloom ? (
            <EffectComposer>
              <Bloom
                mipmapBlur
                intensity={1.15}
                luminanceThreshold={0.55}
                luminanceSmoothing={0.3}
              />
            </EffectComposer>
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
}
