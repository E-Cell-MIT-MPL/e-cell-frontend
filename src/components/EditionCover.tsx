import Image, { type StaticImageData } from "next/image";

type EditionCoverProps = {
  edition: string | null;
  /** The cover picture (like /blogScreenshot.webp). If missing, a cover is drawn from the edition number. */
  image?: string | StaticImageData;
  highlights?: string[];
  /** "sm" for grid and ring cards, "lg" for the featured card. */
  size?: "sm" | "lg";
  /** Greyscale picture that turns to colour on hover (the card must have the "group" class). */
  muted?: boolean;
  priority?: boolean;
};

/**
 * The cover of one edition. It fills its parent, so place it inside a
 * `relative` box that has a size.
 */
export default function EditionCover({
  edition,
  image,
  highlights = [],
  size = "sm",
  muted = false,
  priority = false,
}: EditionCoverProps) {
  const large = size === "lg";

  // 1) The real cover picture, same look as before.
  if (image) {
    return (
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-white/5">
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes={
            large
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          className={`object-cover transition duration-500 ${
            muted ? "grayscale group-hover:grayscale-0" : ""
          }`}
        />
        {!large && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            {edition && (
              <>
                <span className="absolute bottom-1 left-5 select-none text-7xl font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]">
                  {edition}
                </span>
                <span className="absolute bottom-4 right-5 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
                  Edition
                </span>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  // 2) No picture yet: draw a cover from the edition number and headlines.
  const items = highlights.slice(0, large ? 4 : 3);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-black/50"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      {edition && (
        <span
          className={`pointer-events-none absolute select-none font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.22)] ${
            large
              ? "-right-4 -top-6 text-[16rem]"
              : "-right-2 -top-2 text-[8rem]"
          }`}
        >
          {edition}
        </span>
      )}

      <div
        className={`relative flex h-full flex-col justify-between ${
          large ? "p-8 md:p-10" : "p-4"
        }`}
      >
        <div>
          <p
            className={`font-medium uppercase tracking-[0.3em] text-white/50 ${
              large ? "text-xs" : "text-[10px]"
            }`}
          >
            Startup Scoop
          </p>
          {edition && (
            <p
              className={`mt-1 font-black uppercase tracking-widest text-white ${
                large ? "text-lg" : "text-xs"
              }`}
            >
              Edition {edition}
            </p>
          )}
        </div>

        {items.length > 0 && (
          <ol className={large ? "space-y-3" : "space-y-1.5"}>
            {items.map((item, i) => (
              <li
                key={item}
                className={`flex gap-2 font-bold uppercase leading-tight text-white ${
                  large ? "text-sm md:text-base" : "text-[10px]"
                }`}
              >
                <span className="shrink-0 text-white/40">0{i + 1}</span>
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}