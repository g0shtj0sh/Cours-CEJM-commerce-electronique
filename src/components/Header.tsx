"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Popover from "@/components/Popover";
import { SettingsPills } from "@/components/Settings";
import SiteMenu from "@/components/SiteMenu";
import Tip from "@/components/Tip";
import { ArrowLeftIcon, BagIcon, HeartIcon, UserIcon } from "@/components/Icons";
import { useT } from "@/lib/settings";
import { useCart, useFavorites } from "@/lib/stores";

type Active = "montres" | "garantie" | "marque";

export default function Header({ active }: { active?: Active }) {
  const t = useT();
  const { lines } = useCart();
  const { slugs } = useFavorites();
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    { id: "montres", href: "/montres", label: t.nav.watches },
    { id: "garantie", href: "/garantie", label: t.nav.warranty },
    { id: "marque", href: "/marque", label: t.nav.brand },
  ] as const;

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <header className="pad relative z-40 flex items-center justify-between gap-3 pt-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:pt-11">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-4 lg:gap-6">
        {pathname !== "/" ? (
          <Tip label={t.header.back}>
            <button
              type="button"
              aria-label={t.header.backLabel}
              onClick={goBack}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <ArrowLeftIcon />
            </button>
          </Tip>
        ) : null}
        <Link href="/" className="matrix flex items-start text-2xl sm:text-[1.75rem]">
          POINT
          <span className="mt-0.5 ml-0.5 font-sans text-[0.625rem] font-semibold">®</span>
        </Link>
        <SiteMenu />
      </div>

      <nav aria-label={t.nav.mainNav} className="hidden lg:block">
        <ul className="flex items-center gap-7 xl:gap-10">
          {nav.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active === item.id ? "page" : undefined}
                className={[
                  "label whitespace-nowrap transition-colors hover:text-ink",
                  active === item.id ? "text-ink" : "text-muted",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-end gap-3.5 sm:gap-6">
        <div className="hidden items-center gap-2.5 md:flex lg:hidden xl:flex">
          <SettingsPills />
        </div>

        <Tip label={t.header.favorites}>
          <Link
            href="/favoris"
            aria-label={`${t.header.favoritesCount} : ${slugs.length}`}
            className="relative flex"
          >
            <HeartIcon filled={slugs.length > 0} />
            {slugs.length > 0 ? <Count value={slugs.length} /> : null}
          </Link>
        </Tip>

        <Tip label={t.header.account}>
          <Popover
            label={t.header.accountLabel}
            align="right"
            triggerClassName="flex"
            trigger={<UserIcon />}
          >
            {t.header.accountText}
          </Popover>
        </Tip>

        <Tip label={t.header.cart} side="bottom-end">
          <Link
            href="/panier"
            aria-label={`${t.header.cartCount} : ${lines.length}`}
            className="relative flex"
          >
            <BagIcon />
            {lines.length > 0 ? <Count value={lines.length} /> : null}
          </Link>
        </Tip>
      </div>
    </header>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="absolute -right-1.5 -bottom-1.5 flex size-4 items-center justify-center rounded-full bg-ink text-[0.625rem] font-bold text-night">
      {value}
    </span>
  );
}
