import type { Country } from "@/data/clients";

const NAMES: Record<Country, string> = { CO: "Colombia", US: "United States", MX: "México" };

/** A round flag, drawn simply enough to read at 20 px. */
export function Flag({ country, className }: { country: Country; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={NAMES[country]} className={className}>
      <clipPath id={`flag-${country}`}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#flag-${country})`}>
        {country === "CO" ? (
          <>
            <rect width="24" height="12" fill="#FCD116" />
            <rect y="12" width="24" height="6" fill="#003893" />
            <rect y="18" width="24" height="6" fill="#CE1126" />
          </>
        ) : null}
        {country === "MX" ? (
          <>
            <rect width="8" height="24" fill="#006847" />
            <rect x="8" width="8" height="24" fill="#fff" />
            <rect x="16" width="8" height="24" fill="#CE1126" />
            <circle cx="12" cy="12" r="2.2" fill="#8C6239" />
          </>
        ) : null}
        {country === "US" ? (
          <>
            <rect width="24" height="24" fill="#fff" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} y={i * 3.43} width="24" height="1.72" fill="#B22234" />
            ))}
            <rect width="11" height="12" fill="#3C3B6E" />
          </>
        ) : null}
      </g>
    </svg>
  );
}
