"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { product } from "@/content/product";
import { useFinish } from "@/components/FinishContext";

const ProductStage = dynamic(() => import("@/components/three/ProductStage"), {
  ssr: false,
});

/**
 * Encart nocturne. Le second contexte WebGL n'est créé qu'une fois le
 * panneau approché, pour ne pas peser sur le premier affichage.
 */
export default function NightPanel() {
  const { finish } = useFinish();
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = host.current;
    if (!node || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section className="rule-b">
      <div className="shell py-14 md:py-20">
        <div className="grid border border-ink bg-ink text-alu-hi md:grid-cols-5">
          <div
            ref={host}
            className="relative h-[20rem] md:col-span-3 md:h-[30rem]"
          >
            {visible ? (
              <ProductStage
                finish={finish}
                dark
                bloom
                glow={2.6}
                interactive={false}
                rotation={[0, -0.18, 0]}
                framing={1.3}
                className="absolute inset-0"
              />
            ) : null}
          </div>

          <div className="flex flex-col justify-end gap-8 border-t border-alu-lo/30 p-7 md:col-span-2 md:border-t-0 md:border-l md:p-9">
            <div className="flex items-center gap-2">
              <span className="peak" />
              <span className="t-data text-alu-lo">crête</span>
            </div>

            {product.highlights.map((item) => (
              <div key={item.title}>
                <h3 className="text-[1.0625rem] font-bold">{item.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-alu-lo">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
