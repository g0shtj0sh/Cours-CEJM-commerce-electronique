"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/settings";

/** Les trois cartes sous le carrousel de l'accueil. */
export default function HomeStories({
  images,
}: {
  images: { why: string; range: string; service: string };
}) {
  const t = useT();
  const stories = [
    { href: "/marque", title: t.home.whyTitle, text: t.home.whyText, image: images.why },
    { href: "/montres", title: t.home.rangeTitle, text: t.home.rangeText, image: images.range },
    { href: "/garantie", title: t.home.serviceTitle, text: t.home.serviceText, image: images.service },
  ];

  return (
    <section aria-label={t.home.explore} className="pad grid gap-6 pb-14 md:grid-cols-3">
      {stories.map((story) => (
        <Link
          key={story.href}
          href={story.href}
          className="group relative block aspect-[4/3] overflow-hidden rounded-panel bg-card"
        >
          <Image
            src={story.image}
            alt=""
            fill
            decoding="sync"
            sizes="(min-width: 768px) 30vw, 90vw"
            className="object-cover transition-opacity duration-200 group-hover:opacity-85"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <span className="absolute inset-x-5 bottom-4 block lg:inset-x-6 lg:bottom-5">
            <span className="label block">{story.title}</span>
            <span className="mt-1 block text-sm text-ink/80">{story.text}</span>
          </span>
        </Link>
      ))}
    </section>
  );
}
