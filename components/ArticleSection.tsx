"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleFilter } from "./ArticleFilter";
import { Pagination } from "./Pagination";
import { fetchArticles, type ArticleItem } from "@/lib/articleApi";

const PAGE_SIZE = 9;

export function ArticleSection() {
  const [category, setCategory] = useState("semua");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<ArticleItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchArticles({
      page,
      limit: PAGE_SIZE,
      kategori: category === "semua" ? undefined : category,
      search: debouncedSearch || undefined,
    })
      .then((res) => {
        if (cancelled) return;
        setItems(res.items);
        setTotalPages(Math.max(1, res.totalPages));
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, category, debouncedSearch]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const [firstArticle, ...restArticles] = items;

  return (
    <div className="mx-auto max-w-344 px-8 py-13">
      <ArticleFilter
        category={category}
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={setSearch}
      />

      <section>
        <div className="mb-6 flex items-end justify-between border-b border-[#24394B]/50 pb-3">
          <h2 className="text-2xl font-bold text-[#24394B] sm:text-3xl">Berita Menarik</h2>
        </div>

        {error ? (
          <p className="p-6 text-center text-sm text-[#C90000]">{error}</p>
        ) : loading ? (
          <p className="p-6 text-center text-sm text-gray-500">Memuat artikel...</p>
        ) : !firstArticle ? (
          <p className="p-6 text-center text-sm text-gray-500">Tidak ada artikel yang cocok.</p>
        ) : (
          <>
            <article className="mb-5 flex flex-col gap-4 rounded-md bg-[#FAFAFA] p-3 shadow-md hover:shadow-lg sm:flex-row sm:gap-6 sm:p-5">
              <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-sm sm:h-55 sm:w-72 md:w-85">
                <Image src={firstArticle.image} alt={firstArticle.title} fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 288px, 340px" className="object-cover" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-lg font-bold leading-snug text-[#24394B] sm:text-xl">
                  {firstArticle.title}
                </h3>
                <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-gray-500 sm:mt-3">
                  {firstArticle.description}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
                  <span className="text-xs font-semibold text-[#24394B] sm:text-sm">
                    {firstArticle.date}
                  </span>
                  <Link href={`/berita/${firstArticle.slug}`} className="text-xs font-medium text-[#BF6666] underline sm:text-sm">
                    Selengkapnya →
                  </Link>
                </div>
              </div>
            </article>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {restArticles.map((item) => (
                <article key={item.slug} className="flex min-w-0 gap-3 rounded-md bg-[#FAFAFA] p-2 shadow-md transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm sm:h-25 sm:w-22.5">
                    <Image src={item.image} alt={item.title} fill sizes="90px" className="object-cover" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#24394B]">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                      {item.description}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                      <span className="text-[10px] font-semibold text-[#24394B] sm:text-xs">
                        {item.date}
                      </span>
                      <Link href={`/berita/${item.slug}`} className="text-[10px] text-[#C06D6D] underline sm:text-xs">
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {!loading && !error && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}