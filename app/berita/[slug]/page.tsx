import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchArticleBySlug, fetchArticles } from "@/lib/articleApi";

const SIDEBAR_PAGE_SIZE = 4;

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(Number(pageParam) || 1, 1);

  const news = await fetchArticleBySlug(slug);
  if (!news) notFound();

  const latest = await fetchArticles({ page, limit: SIDEBAR_PAGE_SIZE });
  const related = latest.items.filter((item) => item.slug !== slug);
  const totalPages = Math.max(1, latest.totalPages);
  const paragraphs = news.description.split(/\n+/).filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-275 px-6 pt-32 pb-16">
        <nav className="mb-6 text-sm text-gray-400">
          <Link href="/" className="text-[#C06D6D]">Beranda</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/berita" className="text-[#C06D6D]">Artikel</Link>
          <span className="mx-2">&gt;</span>
          <span className="font-semibold text-[#24394B]">
            {news.title.slice(0, 20)}....
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <h1 className="text-3xl font-bold leading-tight text-[#24394B] sm:text-4xl">
              {news.title}
            </h1>
            <p className="mt-2 text-sm text-gray-400">{news.date}</p>

            <div className="relative mt-6 h-80 w-full overflow-hidden rounded-sm">
              <Image src={news.image} alt={news.title} fill className="object-cover" />
            </div>

            <div className="mt-8">
              {paragraphs.map((p, i) => (
                <p key={i} className="mb-3 leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-sm bg-white p-5 shadow-[0_3px_12px_rgba(0,0,0,0.15)]">
            <h3 className="mb-4 text-lg font-bold text-[#823F3F]">Berita Terbaru</h3>

            <div className="flex flex-col gap-4">
              {related.length === 0 ? (
                <p className="text-sm text-gray-500">Tidak ada berita lain.</p>
              ) : (
                related.map((item) => (
                  <Link key={item.slug} href={`/berita/${item.slug}`} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-snug text-[#823F3F]">
                        {item.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4 text-xs">
                {page > 1 ? (
                  <Link
                    href={`/berita/${slug}?page=${page - 1}`}
                    scroll={false}
                    className="font-medium text-[#C06D6D] hover:underline"
                  >
                    ← Sebelumnya
                  </Link>
                ) : (
                  <span className="text-gray-300">← Sebelumnya</span>
                )}

                <span className="text-gray-500">
                  {page} / {totalPages}
                </span>

                {page < totalPages ? (
                  <Link
                    href={`/berita/${slug}?page=${page + 1}`}
                    scroll={false}
                    className="font-medium text-[#C06D6D] hover:underline"
                  >
                    Berikutnya →
                  </Link>
                ) : (
                  <span className="text-gray-300">Berikutnya →</span>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}