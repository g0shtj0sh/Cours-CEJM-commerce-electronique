type IconProps = { className?: string; filled?: boolean };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export function HeartIcon({ className = "size-5", filled }: IconProps) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function UserIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 18.5c1-2.4 3-3.5 5.5-3.5s4.5 1.1 5.5 3.5" />
    </svg>
  );
}

export function BagIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function ShareIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
      <path d="M14 4h6v6M20 4l-9 9" />
    </svg>
  );
}

export function DocumentIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </svg>
  );
}

export function ChevronIcon({ className = "size-3" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CloseIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SearchIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function PhoneIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4h4l1.5 5-2.2 1.6a12 12 0 0 0 5.1 5.1L15 13.5l5 1.5v4a2 2 0 0 1-2 2C10 21 3 14 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function ShieldIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 5 6v6c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Pictogramme des liens « modèle précédent / suivant » de la maquette. */
export function SwitchIcon({ className = "size-5", flip }: IconProps & { flip?: boolean }) {
  return (
    <svg {...base} className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <rect x="2.5" y="6" width="19" height="12" rx="6" />
      <circle cx="9" cy="12" r="6" />
    </svg>
  );
}
