import { product } from "@/content/product";

const links = [
  { href: "#produit", label: "Le produit" },
  { href: "#technique", label: "Fiche technique" },
  { href: "#cours", label: "Le cours" },
  { href: "#commander", label: "Commander" },
];

export default function Nav() {
  return (
    <header className="rule-b fixed inset-x-0 top-0 z-50 brushed">
      <div className="shell flex h-12 items-center justify-between">
        <a href="#produit" className="t-wide text-[1.0625rem] font-extrabold">
          {product.brand}
        </a>
        {/* Sur petit écran, seul le lien qui mène à l'action reste. */}
        <nav>
          <ul className="flex items-center gap-5">
            {links.map((link, index) => (
              <li
                key={link.href}
                className={[
                  "t-data whitespace-nowrap",
                  index < links.length - 1 ? "hidden sm:block" : "",
                ].join(" ")}
              >
                <a className="hover:text-blue" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
