import Reveal from "@/components/Reveal";

export default function SectionHeading({
  kicker,
  title,
  sub,
  align = "center",
  as: Tag = "h2",
}: {
  kicker: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      <p className="kicker">{kicker}</p>
      <Tag className="mt-3 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ivory sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {sub && <p className="mt-4 text-base leading-relaxed text-ivory-dim sm:text-lg">{sub}</p>}
      <div className={`gold-line mt-8 ${align === "center" ? "mx-auto max-w-[200px]" : "max-w-[120px]"}`} />
    </Reveal>
  );
}
