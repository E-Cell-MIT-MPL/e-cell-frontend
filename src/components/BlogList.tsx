import { FeaturedBlogCard, BlogPost } from "./BlogCard";
import BlogRing from "./BlogRing";

type BlogListProps = {
  posts: BlogPost[];
};

export default function BlogList({ posts }: BlogListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
          <svg
            className="h-8 w-8 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-medium text-white/60">
          No Articles Yet
        </h2>
        <p className="text-white/40">
          Check back soon for new Startup Scoop editions!
        </p>
      </div>
    );
  }

  // The first post in the list is always treated as the latest edition.
  const [featured, ...archive] = posts;

  return (
    <div className="space-y-20">
      <section aria-labelledby="latest-edition-heading">
        <h2
          id="latest-edition-heading"
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/40"
        >
          01 — Latest edition
        </h2>
        <FeaturedBlogCard post={featured} />
      </section>

      {archive.length > 0 && (
        <section aria-labelledby="archive-heading">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
                02 — Back issues
              </p>
              <h2
                id="archive-heading"
                className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl"
              >
                The archive
              </h2>
            </div>
            <p className="max-w-sm text-white/40">
              Catch up on past startup news and entrepreneurship insights.
            </p>
          </div>

          <BlogRing posts={archive} />
        </section>
      )}
    </div>
  );
}
