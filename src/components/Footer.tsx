import Link from "next/link";
import { vendeur } from "@/content/vendeur";

const links = [
  { href: "/montres", label: "Toutes les montres" },
  { href: "/garantie", label: "Garantie, retours et rétractation" },
  { href: "/marque", label: "Marque et brevet" },
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/mentions-legales", label: "Mentions légales et données personnelles" },
];

export default function Footer() {
  return (
    <footer className="pad bg-night py-12 text-sm">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="matrix text-2xl">POINT</p>
          <p className="copy mt-3 text-sm">
            {vendeur.denomination}, {vendeur.formeJuridique.toLowerCase()} au
            capital de {vendeur.capital}. {vendeur.rcs}.
          </p>
        </div>
        <div>
          <h2 className="label text-muted">Nous contacter</h2>
          <p className="mt-3">
            <a className="link text-base font-semibold" href={`tel:${vendeur.telephoneLien}`}>
              {vendeur.telephone}
            </a>
          </p>
          <p className="copy mt-1 text-sm">{vendeur.horaires}</p>
          <p className="copy mt-1 text-sm">{vendeur.siege}</p>
        </div>
        <nav aria-label="Informations">
          <h2 className="label text-muted">Informations</h2>
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
      <p className="mt-10 border-t border-line pt-5 text-xs leading-relaxed text-dim">
        Projet pédagogique de CEJM sur le commerce électronique. La marque, la
        société, ses identifiants et ses titres de propriété industrielle sont
        fictifs. Aucune vente réelle n&apos;a lieu, aucun paiement n&apos;est
        traité et les données saisies restent dans votre navigateur.
      </p>
    </footer>
  );
}
