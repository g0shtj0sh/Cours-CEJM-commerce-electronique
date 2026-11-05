"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  trigger: React.ReactNode;
  triggerClassName?: string;
  align?: "left" | "right";
  /** Reçoit `close` quand le contenu doit pouvoir fermer le panneau. */
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
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
            "pop-in absolute top-[calc(100%+0.625rem)] z-50 w-[min(16rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-card p-4 text-sm leading-relaxed",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
        >
          {typeof children === "function" ? children(() => setOpen(false)) : children}
        </div>
      ) : null}
    </div>
  );
}
