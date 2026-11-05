import { parcours, reperes } from "@/content/cejm";

export default function Cejm() {
  return (
    <section id="cours" className="rule-b bg-alu-hi">
      <div className="shell py-14 md:py-20">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="d-l">
              Le commerce
              <br />
              électronique
            </h2>
          </div>
          <div className="mt-5 md:col-span-6 md:col-start-7 md:mt-2">
            <p className="body-l">
              Cette page est un cas pratique. Chaque obligation décrite ci-dessous
              se retrouve dans un bloc du site : le prix affiché toutes taxes
              comprises, la confirmation en deux temps, le délai de rétractation
              rappelé avant le paiement.
            </p>
          </div>
        </div>

        {/* Le parcours d'achat est une séquence : la numérotation porte
            une information, elle n'est pas décorative. */}
        <div className="mt-14 md:mt-20">
          <h3 className="t-data rule-b pb-2 text-ink-soft">
            Le parcours d&apos;achat, étape par étape
          </h3>
          <ol>
            {parcours.map((etape, index) => (
              <li
                key={etape.titre}
                className="hair-b grid gap-x-6 gap-y-2 py-6 md:grid-cols-12"
              >
                <div className="t-narrow text-[2.25rem] leading-none font-bold text-alu-lo md:col-span-1">
                  {index + 1}
                </div>
                <h4 className="d-m self-start md:col-span-4">{etape.titre}</h4>
                <div className="md:col-span-7">
                  <p className="body">{etape.texte}</p>
                  <p className="t-data mt-3 text-blue">{etape.source}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Les repères ne forment pas une séquence : pas de numéros, des
            panneaux séparés par des filets. */}
        <div className="mt-14 md:mt-20">
          <h3 className="t-data rule-b pb-2 text-ink-soft">
            Repères de cours
          </h3>
          <div className="grid md:grid-cols-2">
            {reperes.map((bloc, index) => (
              <section
                key={bloc.titre}
                className={[
                  "hair-b py-7 md:py-8",
                  index % 2 === 1 ? "md:hair-l md:pl-8" : "md:pr-8",
                ].join(" ")}
              >
                <h4 className="d-m">{bloc.titre}</h4>
                <dl className="mt-4">
                  {bloc.entrees.map(([terme, definition]) => (
                    <div key={terme} className="py-2.5">
                      <dt className="text-[0.9375rem] font-bold">{terme}</dt>
                      <dd className="body mt-1 text-[0.9375rem]">
                        {definition}
                      </dd>
                    </div>
                  ))}
                </dl>
                {"source" in bloc && bloc.source ? (
                  <p className="t-data mt-2 text-blue">{bloc.source}</p>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
