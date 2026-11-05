"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronIcon } from "@/components/Icons";

/**
 * Liste déroulante au style du site. La liste native afficherait le menu du
 * système à l'ouverture. Celle-ci s'ouvre vers le haut, pour ne pas être coupée
 * par le bas des panneaux, et s'utilise au clavier comme une liste classique.
 */
export default function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const labelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    items.current[Math.max(options.indexOf(value), 0)]?.focus();
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, options, value]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  const onListKey = (event: React.KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: Math.min(index + 1, options.length - 1),
      ArrowUp: Math.max(index - 1, 0),
      Home: 0,
      End: options.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      items.current[moves[event.key]]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className="relative">
      <span id={labelId} className="label text-muted">
        {label}
      </span>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label} : ${value}`}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="field mt-1.5 flex items-center justify-between gap-2 text-left whitespace-nowrap transition-colors hover:border-muted"
      >
        {value}
        <ChevronIcon
          className={["size-3 shrink-0 transition-transform", open ? "rotate-180" : ""].join(" ")}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-labelledby={labelId}
          className="pop-in absolute bottom-[calc(100%+0.375rem)] left-0 z-50 w-full min-w-max rounded-xl border border-line bg-card p-1"
        >
          {options.map((option, index) => (
            <li key={option} role="presentation">
              <button
                ref={(element) => {
                  items.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  close();
                }}
                onKeyDown={(event) => onListKey(event, index)}
                className={[
                  "flex min-h-10 w-full items-center justify-between gap-4 rounded-lg px-2.5 text-left text-sm whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:bg-white/10",
                  option === value ? "text-ink" : "text-muted",
                ].join(" ")}
              >
                {option}
                {option === value ? (
                  <span aria-hidden className="size-2 rounded-full bg-[var(--accent)]" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
