import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type InitiativeItem } from "@/data/initiativesData";

export interface InitiativeCardProps {
  initiative?: InitiativeItem;
  heading?: string;
  description?: string;
  image?: string | StaticImageData;
  tag?: string;
  status?: string;
  num?: string;
  link?: string;
  actionLabel?: string;
  isExternalLink?: boolean;
  statBadge?: string;
  highlights?: string[];
  isEnabled?: boolean;
  className?: string;
}

export default function InitiativeCard({
  initiative,
  heading,
  description,
  image,
  tag,
  status,
  num,
  link,
  actionLabel,
  isExternalLink,
  statBadge,
  highlights,
  isEnabled = true,
  className = "",
}: InitiativeCardProps) {
  // Allow passing either a full initiative object or individual props
  const finalHeading = initiative?.heading ?? heading ?? "Initiative";
  const finalDescription = initiative?.description ?? description ?? "";
  const finalImage = initiative?.image ?? image;
  const finalTag = initiative?.tag ?? tag;
  const finalStatus = initiative?.status ?? status;
  const finalNum = initiative?.num ?? num;
  const finalLink = initiative?.link ?? link;
  const finalActionLabel = initiative?.actionLabel ?? actionLabel ?? "Learn More";
  const finalIsExternal = initiative?.isExternalLink ?? isExternalLink ?? (finalLink?.startsWith("http") ?? false);
  const finalStatBadge = initiative?.statBadge ?? statBadge;
  const finalHighlights = initiative?.highlights ?? highlights ?? [];

  return (
    <article
      className={`
        group relative flex flex-col h-full w-full max-w-sm
        bg-white/[0.03] backdrop-blur-md
        border border-white/10 hover:border-white/25
        rounded-2xl overflow-hidden
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.06)]
        ${!isEnabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {/* Top Image Container */}
      {finalImage && (
        <div className="relative h-48 w-full overflow-hidden bg-black/80 flex-shrink-0">
          <Image
            src={finalImage}
            alt={finalHeading}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Number & Status Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            {finalNum && (
              <span className="font-mono text-[11px] font-bold text-white/70 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full tabular-nums">
                {finalNum}
              </span>
            )}
            {finalStatus && (
              <span className="text-[10px] font-medium tracking-wider uppercase text-white/80 bg-white/10 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded-full">
                {finalStatus}
              </span>
            )}
          </div>

          {/* Stat Badge */}
          {finalStatBadge && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="text-[11px] font-semibold text-white/90 bg-black/75 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-md shadow-sm">
                ✦ {finalStatBadge}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Tag */}
        {finalTag && (
          <div className="mb-2">
            <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-white/40">
              {finalTag}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-white transition-colors">
          {finalHeading}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/65 leading-relaxed mb-4 flex-grow">
          {finalDescription}
        </p>

        {/* Key Highlights */}
        {finalHighlights.length > 0 && (
          <ul className="mb-6 space-y-1.5 border-t border-white/5 pt-3">
            {finalHighlights.slice(0, 2).map((highlight, idx) => (
              <li
                key={idx}
                className="text-[12px] text-white/50 flex items-start gap-1.5"
              >
                <span className="text-white/30 text-[10px] mt-0.5">↳</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer CTA */}
        {finalLink && isEnabled ? (
          <div className="pt-2 mt-auto border-t border-white/5">
            {finalIsExternal ? (
              <a
                href={finalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full text-xs font-semibold tracking-wider uppercase text-white/60 hover:text-white group/btn transition-colors py-1"
                aria-label={`${finalActionLabel} for ${finalHeading} (opens in new tab)`}
              >
                <span>{finalActionLabel}</span>
                <span className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1">
                  ↗
                </span>
              </a>
            ) : (
              <Link
                href={finalLink}
                className="inline-flex items-center justify-between w-full text-xs font-semibold tracking-wider uppercase text-white/60 hover:text-white group/btn transition-colors py-1"
                aria-label={`${finalActionLabel} for ${finalHeading}`}
              >
                <span>{finalActionLabel}</span>
                <span className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </div>
        ) : !isEnabled ? (
          <div className="pt-2 mt-auto border-t border-white/5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
            <span className="text-xs text-amber-300/80">Coming Soon</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function SimpleInitiativeCard({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <article className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col h-full w-full max-w-sm">
      <h3 className="text-xl font-bold mb-3 text-white">{heading}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </article>
  );
}
