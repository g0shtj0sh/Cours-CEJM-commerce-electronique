"use client";

import Link from "next/link";
import { vendeur } from "@/content/vendeur";
import { useT } from "@/lib/settings";

export default function Footer() {
  const t = useT();
  const links = [
    { href: "/montres", label: t.footer.links.watches },
    { href: "/favoris", label: t.footer.links.favorites },
    { href: "/garantie", label: t.footer.links.warranty },
    { href: "/marque", label: t.footer.links.brand },
    { href: "/cgv", label: t.footer.links.terms },
    { href: "/mentions-legales", label: t.footer.links.legal },
  ];

  return (
    <footer className="pad relative bg-night py-12 text-sm">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="matrix text-2xl">POINT</p>
          <p className="copy mt-3 text-sm">
            {t.footer.company(vendeur.formeJuridique, vendeur.capital, vendeur.rcs)}
          </p>
        </div>
        <div>
          <h2 className="label text-muted">{t.footer.contact}</h2>
          <p className="mt-3">
            <a className="link text-base font-semibold" href={`tel:${vendeur.telephoneLien}`}>
              {vendeur.telephone}
            </a>
          </p>
          <p className="copy mt-1 text-sm">{t.legalHours}</p>
          <p className="copy mt-1 text-sm">{vendeur.siege}</p>
        </div>
        <nav aria-label={t.footer.info}>
          <h2 className="label text-muted">{t.footer.info}</h2>
          <ul className="mt-3 space-y-1.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-accent" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-10 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        {t.footer.notice}
      </p>
    </footer>
  );
}
