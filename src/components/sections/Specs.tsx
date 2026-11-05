import { product } from "@/content/product";

export default function Specs() {
  return (
    <section id="technique" className="rule-b">
      <div className="shell py-14 md:grid md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-3">
          <h2 className="d-m">Fiche technique</h2>
          <p className="body mt-3 text-[0.9375rem]">
            Mesures faites à 1 mètre, en champ libre. Les valeurs de
            l&apos;autonomie correspondent à une lecture Bluetooth à mi-volume,
            batterie neuve.
          </p>
        </div>

        <dl className="mt-8 grid md:col-span-9 md:mt-0 md:grid-cols-2 md:gap-x-10">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="hair-b flex items-baseline justify-between gap-6 py-3"
            >
              <dt className="text-[0.9375rem] whitespace-nowrap">
                {spec.label}
              </dt>
              <dd className="t-data text-right text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
