import Link from "next/link";

const categories = [
  {
    href: "/wc",
    label: "World Championship",
    sub: "IIHF Men's World Championship",
  },
  {
    href: "/olympics",
    label: "Olympic Games",
    sub: "Men's Ice Hockey Tournament",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="mb-12 text-center">
        <p className="mb-2 font-mono text-sm tracking-[0.3em] text-ice uppercase">
          Results Archive
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          International Ice Hockey
        </h1>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {categories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative overflow-hidden rounded-lg border-t-2 border-ice bg-surface p-8 transition-colors hover:bg-[#1a2540]"
          >
            <span className="font-mono text-xs tracking-widest text-muted uppercase">
              {c.sub}
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              {c.label}
            </h2>
            <span className="mt-6 inline-block font-mono text-sm text-ice opacity-0 transition-opacity group-hover:opacity-100">
              View tournaments →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}