"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  trigger: React.ReactNode;
  triggerClassName?: string;
  align?: "left" | "right";
  children: React.ReactNode;
};

/** Petit panneau ouvert au clic, fermé par Échap ou un clic extérieur. */
export default function Popover({
  label,
  trigger,
  triggerClassName,
  align = "left",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        className={triggerClassName}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </button>
      {open ? (
        <div
          className={[
            "absolute top-[calc(100%+0.625rem)] z-50 w-64 rounded-2xl border border-line bg-card p-4 text-sm leading-relaxed shadow-2xl",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
