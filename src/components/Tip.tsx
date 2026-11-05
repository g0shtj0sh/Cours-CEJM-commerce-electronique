/** Infobulle au survol : dit ce que fait un bouton représenté par une icône. */
export default function Tip({
  label,
  side = "bottom",
  children,
}: {
  label: string;
  side?: "bottom" | "bottom-end" | "left";
  children: React.ReactNode;
}) {
  const position = {
    bottom: "top-[calc(100%+0.625rem)] left-1/2 -translate-x-1/2",
    "bottom-end": "top-[calc(100%+0.625rem)] right-0",
    left: "top-1/2 right-[calc(100%+0.625rem)] -translate-y-1/2",
  }[side];

  return (
    <span className="group relative inline-flex">
      {children}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute z-50 rounded-full bg-ink px-2.5 py-1 text-[0.6875rem] font-semibold whitespace-nowrap text-night opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100",
          position,
        ].join(" ")}
      >
        {label}
      </span>
    </span>
  );
}
