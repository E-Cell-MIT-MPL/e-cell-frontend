import type { StaticImageData } from "next/image";
import EditionCover from "./EditionCover";
import ScatterText from "./ScatterText";

export type BlogPost = {
  id: string;
  /** Cover picture, e.g. "/blogScreenshot.webp". If left out, a cover is drawn from the edition number. */
  image?: string | StaticImageData;
  title: string;
  description: string;
  /** Optional headline stories, shown on the drawn cover when there is no image. */
  highlights?: string[];
  postURL: string;
  publishedAt?: string;
};

type BlogCardProps = {
  post: BlogPost;
};

/** Pulls the edition number out of a title like "Startup Scoop - Edition 16". */
export function getEditionNumber(title: string): string | null {
  const match = title.match(/Edition\s+(\d+)/i);
  return match ? match[1] : null;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // avoids off-by-one-day issues between server and browser
  });
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/** Smaller card used in the "view all" grid. */
export default function BlogCard({ post }: BlogCardProps) {
  const { title, description, postURL, publishedAt, highlights, image } = post;
  const edition = getEditionNumber(title);

  return (
    <article className="group h-full">
      <a
        href={postURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} (opens on LinkedIn in a new tab)`}
        className={`flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/60 motion-safe:hover:-translate-y-1 ${focusRing}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-105">
            <EditionCover
              edition={edition}
              image={image}
              highlights={highlights}
              muted
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-white/40"
            >
              {formatDate(publishedAt)}
            </time>
          )}

          <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-white">
            {title}
          </h3>

          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-white/60">
            {description}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white">
            Read on LinkedIn
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </a>
    </article>
  );
}

/** Large card used for the newest edition at the top of the page. */
export function FeaturedBlogCard({ post }: BlogCardProps) {
  const { title, description, postURL, publishedAt, highlights, image } = post;
  const edition = getEditionNumber(title);

  return (
    <article className="group">
      <a
        href={postURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} (opens on LinkedIn in a new tab)`}
        className={`grid overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:border-white/60 lg:grid-cols-2 ${focusRing}`}
      >
        <div className="relative min-h-[340px] overflow-hidden lg:min-h-[440px]">
          <div className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-105">
            <EditionCover
              edition={edition}
              image={image}
              highlights={highlights}
              size="lg"
              priority
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-center overflow-hidden p-8 md:p-12">
          {edition && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-8 select-none text-[11rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.15)]"
            >
              {edition}
            </span>
          )}

          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
                Latest edition
              </span>
              {publishedAt && (
                <time
                  dateTime={publishedAt}
                  className="text-xs font-medium uppercase tracking-[0.2em] text-white/40"
                >
                  {formatDate(publishedAt)}
                </time>
              )}
            </div>

            <ScatterText
              as="h3"
              text={title}
              className="mb-4 text-3xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-5xl"
            />

            <p className="mb-8 text-base leading-relaxed text-white/60">
              {description}
            </p>

            <span className="inline-flex items-center gap-3 border-b border-white pb-1 text-sm font-semibold uppercase tracking-widest text-white">
              Read on LinkedIn
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}

