"use client";

import { product } from "@/content/product";
import { useFinish } from "@/components/FinishContext";

/** Les pastilles agissent sur le modèle 3D en direct. */
export default function FinishPicker() {
  const { finish, setFinishId } = useFinish();

  return (
    <div>
      <p className="t-data text-ink-soft">Finition</p>
      <div className="mt-2 flex items-center gap-2">
        {product.finishes.map((option) => (
          <button
            key={option.id}
            type="button"
            className="swatch"
            style={{ backgroundColor: option.chip }}
            aria-pressed={option.id === finish.id}
            onClick={() => setFinishId(option.id)}
          >
            <span className="sr-only">{option.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[0.9375rem]">{finish.label}</p>
    </div>
  );
}
