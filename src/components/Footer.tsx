import { product } from "@/content/product";

const credit = product.model.credit;

export default function Footer() {
  return (
    <footer className="shell py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="t-wide text-[1.75rem] font-extrabold">
            {product.brand}
          </p>
          <p className="body mt-3 text-[0.9375rem]">
            Site de démonstration réalisé dans le cadre du cours de CEJM sur le
            commerce électronique. La marque, le produit et les prix sont
            fictifs ; aucune vente n&apos;est réellement proposée.
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h2 className="t-data hair-b pb-2 text-ink-soft">Mentions légales</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            Éditeur : projet étudiant, sans activité commerciale.
            <br />
            Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            États-Unis.
          </p>
          <p className="t-data mt-3 text-ink-soft">
            LCEN du 21 juin 2004, art. 6
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="t-data hair-b pb-2 text-ink-soft">Crédits</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            Modèle 3D{" "}
            <a className="link" href={credit.sourceUrl}>
              {credit.title}
            </a>{" "}
            par {credit.author}, sous licence{" "}
            <a className="link" href={credit.licenseUrl}>
              {credit.license}
            </a>
            . Optimisé pour le web (meshopt, textures WebP 1024 px).
          </p>
        </div>
      </div>
    </footer>
  );
}
