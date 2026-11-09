import Image from "next/image";
import Link from "next/link";
import { fetchArticles, type ArticleItem } from "@/lib/articleApi";

export async function LatestArticles() {
  let items: ArticleItem[] = [];
  let failed = false;

  try {
    ({ items } = await fetchArticles({ limit: 3 }));
  } catch {
    failed = true;
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-3 border-b border-[#24394B]/50 pb-3">
        <h2 className="text-xl font-bold text-[#24394B] sm:text-2xl md:text-3xl">
          Berita Terbaru
        </h2>
        <Link href="/berita" className="shrink-0 text-xs font-medium text-[#C06D6D] underline transition hover:text-[#24394B] sm:text-sm">
          Lebih Banyak →
        </Link>
      </div>

      {failed ? (
        <p className="p-6 text-center text-sm text-[#C90000]">Gagal memuat berita.</p>
      ) : items.length === 0 ? (
        <p className="p-6 text-center text-sm text-gray-500">Belum ada berita.</p>
      ) : (
        <div className="space-y-4">
          {items.map((article) => (
            <article key={article.slug} className="flex min-h-0 gap-3 rounded-md bg-[#FAFAFA] p-3 shadow-[0_3px_10px_rgba(0,0,0,0.10)] transition-shadow duration-300 hover:shadow-md sm:min-h-[190px] sm:gap-5 sm:p-4">
              <div className="relative h-[105px] w-[120px] shrink-0 overflow-hidden rounded-sm sm:h-[158px] sm:w-[200px] md:w-[235px]">
                <Image src={article.image} alt={article.title} fill sizes="(max-width: 640px) 120px, (max-width: 768px) 200px, 235px" className="object-cover" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col py-0 sm:py-1">
                <h3 className="line-clamp-3 text-sm font-bold leading-snug text-[#24394B] sm:text-lg">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#7B858D] sm:mt-3 sm:text-sm">
                  {article.description}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3 sm:pt-4">
                  <span className="text-[10px] font-semibold text-[#24394B] sm:text-xs">
                    {article.date}
                  </span>
                  <Link href={`/berita/${article.slug}`} className="shrink-0 text-[10px] font-medium text-[#C06D6D] underline transition hover:text-[#24394B] sm:text-sm">
                    Selengkapnya →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}