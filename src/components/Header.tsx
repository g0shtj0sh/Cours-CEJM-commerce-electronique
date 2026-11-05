"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Popover from "@/components/Popover";
import SiteMenu from "@/components/SiteMenu";
import Tip from "@/components/Tip";
import {
  ArrowLeftIcon,
  BagIcon,
  ChevronIcon,
  HeartIcon,
  UserIcon,
} from "@/components/Icons";
import { useCart, useFavorites } from "@/lib/stores";

const nav = [
  { id: "montres", href: "/montres", label: "Montres" },
  { id: "garantie", href: "/garantie", label: "Garantie & service" },
  { id: "marque", href: "/marque", label: "La marque" },
] as const;

type Active = (typeof nav)[number]["id"];

export default function Header({ active }: { active?: Active }) {
  const { lines } = useCart();
  const { slugs } = useFavorites();
  const pathname = usePathname();
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <header className="pad relative z-40 flex items-center justify-between gap-4 pt-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pt-11">
      <div className="flex items-center gap-4 lg:gap-6">
        {pathname !== "/" ? (
          <Tip label="Retour">
            <button
              type="button"
              aria-label="Revenir à la page précédente"
              onClick={goBack}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <ArrowLeftIcon />
            </button>
          </Tip>
        ) : null}
        <Link href="/" className="matrix flex items-start text-[1.75rem]">
          POINT
          <span className="mt-0.5 ml-0.5 font-sans text-[0.625rem] font-semibold">®</span>
        </Link>
        <SiteMenu />
      </div>

      <nav aria-label="Navigation principale" className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {nav.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active === item.id ? "page" : undefined}
                className={[
                  "label transition-colors hover:text-ink",
                  active === item.id ? "text-ink" : "text-muted",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-end gap-6">
        <div className="hidden items-center gap-2.5 xl:flex">
          <Popover
            label="Devise"
            trigger={
              <span className="pill label">
                EUR <ChevronIcon />
              </span>
            }
          >
            Les prix sont affichés en euros, toutes taxes comprises.
          </Popover>
          <Popover
            label="Langue et pays"
            trigger={
              <span className="pill label">
                FR <ChevronIcon />
              </span>
            }
          >
            Site en français, livraison en France métropolitaine : le droit
            français de la consommation s&apos;applique.
          </Popover>
        </div>

        <Tip label="Mes favoris">
          <Link href="/favoris" aria-label={`Favoris : ${slugs.length}`} className="relative flex">
            <HeartIcon filled={slugs.length > 0} />
            {slugs.length > 0 ? <Count value={slugs.length} /> : null}
          </Link>
        </Tip>

        <Tip label="Mon compte">
          <Popover label="Compte" align="right" triggerClassName="flex" trigger={<UserIcon />}>
            Pas besoin de compte : vous commandez directement, avec votre adresse
            de livraison.
          </Popover>
        </Tip>

        <Tip label="Mon panier" side="bottom-end">
          <Link href="/panier" aria-label={`Panier : ${lines.length} article(s)`} className="relative flex">
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
