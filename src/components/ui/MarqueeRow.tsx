/**
 * Pure CSS marquee row used in `ProjectsShowcase`. The keyframes are declared
 * via styled-jsx to avoid leaking into other sections.
 *
 * Server-rendered: animation is driven entirely by CSS.
 */
export type MarqueeRowProps = {
  items: string[];
  duration?: number;
  reverse?: boolean;
  primary?: boolean;
};

export function MarqueeRow({
  items,
  duration = 30,
  reverse = false,
  primary = true,
}: MarqueeRowProps) {
  const tripled = [...items, ...items, ...items];
  return (
    <div
      aria-hidden
      className="relative h-[48px] md:h-[72px] w-full overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)",
      }}
    >
      <ul
        className="flex items-center gap-8 h-full whitespace-nowrap will-change-transform"
        style={{
          animation: `lumintik-marquee ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {tripled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-8 shrink-0"
          >
            <span
              className={`block text-[24px] md:text-[56px] font-semibold tracking-[0.56px] leading-[48px] md:leading-[56px] ${
                primary ? "text-slate-900" : "text-slate-300"
              }`}
            >
              {item}
            </span>
            <span
              className={`text-[24px] md:text-[56px] ${primary ? "text-blue-500" : "text-slate-300"}`}
            >
              ✻
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
