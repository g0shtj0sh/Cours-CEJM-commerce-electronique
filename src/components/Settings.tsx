"use client";

import { ChevronIcon } from "@/components/Icons";
import Popover from "@/components/Popover";
import { useSettings, useT, type Currency } from "@/lib/settings";
import type { Lang } from "@/content/catalogue";

const languages: { id: Lang; label: string }[] = [
  { id: "fr", label: "Français" },
  { id: "en", label: "English" },
];

const currencies: { id: Currency; label: string }[] = [
  { id: "EUR", label: "Euro (€)" },
  { id: "USD", label: "US dollar ($)" },
];

function Option({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors",
        selected ? "bg-white/10 text-ink" : "text-muted hover:text-ink",
      ].join(" ")}
    >
      {label}
      {selected ? <span aria-hidden className="size-2 rounded-full bg-[var(--accent)]" /> : null}
    </button>
  );
}

/** Pastilles de l'en-tête : devise et langue. */
export function SettingsPills() {
  const { lang, currency, setLang, setCurrency } = useSettings();
  const t = useT();

  return (
    <>
      <Popover
        label={t.menu.currency}
        trigger={
          <span className="pill label">
            {currency} <ChevronIcon />
          </span>
        }
      >
        {(close) => (
          <div>
            {currencies.map((item) => (
              <Option
                key={item.id}
                label={item.label}
                selected={currency === item.id}
                onClick={() => {
                  setCurrency(item.id);
                  close();
                }}
              />
            ))}
            <p className="mt-2 border-t border-line pt-2 text-xs text-muted">{t.header.currencyNote}</p>
          </div>
        )}
      </Popover>
      <Popover
        label={t.menu.language}
        trigger={
          <span className="pill label">
            {lang.toUpperCase()} <ChevronIcon />
          </span>
        }
      >
        {(close) => (
          <div>
            {languages.map((item) => (
              <Option
                key={item.id}
                label={item.label}
                selected={lang === item.id}
                onClick={() => {
                  setLang(item.id);
                  close();
                }}
              />
            ))}
            <p className="mt-2 border-t border-line pt-2 text-xs text-muted">{t.header.langNote}</p>
          </div>
        )}
      </Popover>
    </>
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full bg-white/10 p-0.5">
      {options.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={value === item.id}
          onClick={() => onChange(item.id)}
          className={[
            "label min-h-9 min-w-11 rounded-full px-3 transition-colors",
            value === item.id ? "bg-ink text-night" : "text-muted hover:text-ink",
          ].join(" ")}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/** Mêmes réglages dans le menu : c'est l'accès principal sur téléphone. */
export function SettingsToggles() {
  const { lang, currency, setLang, setCurrency } = useSettings();
  const t = useT();

  return (
    <div className="flex flex-wrap gap-2.5">
      <Segmented
        label={t.menu.language}
        value={lang}
        options={[
          { id: "fr", label: "FR" },
          { id: "en", label: "EN" },
        ]}
        onChange={setLang}
      />
      <Segmented
        label={t.menu.currency}
        value={currency}
        options={[
          { id: "EUR", label: "EUR" },
          { id: "USD", label: "USD" },
        ]}
        onChange={setCurrency}
      />
    </div>
  );
}
