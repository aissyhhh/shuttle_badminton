import Image from "next/image";

interface ArticleItem {
  image: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

interface ArticleListProps {
  items: ArticleItem[];
}

export function ArticleList({ items }: ArticleListProps) {
  const [firstArticle, ...restArticles] = items;

  return (
    <section>
      <div className="mb-6 flex items-end justify-between border-b border-[#24394B]/50 pb-3">
        <h2 className="text-3xl font-bold text-[#24394B]">
          Berita Menarik
        </h2>
      </div>

      {!firstArticle ? (
        <p className="p-6 text-center text-sm text-gray-500">
          Tidak ada artikel yang cocok.
        </p>
      ) : (
        <>
          <article className="mb-5 flex gap-6 rounded-md bg-[#FAFAFA] p-5 shadow-md hover:shadow-lg">
            <div className="relative h-[220px] w-[340px] shrink-0 overflow-hidden rounded-sm">
              <Image src={firstArticle.image} alt={firstArticle.title} fill className="object-cover"/>
            </div>

            <div className="flex flex-1 flex-col">
              <h3 className="text-xl font-bold text-[#24394B]">
                {firstArticle.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {firstArticle.description}
              </p>

              <div className="mt-auto flex justify-between pt-4">
                <span className="text-sm font-semibold text-[#24394B]">
                  {firstArticle.date}
                </span>

                <a href="/" className="text-sm font-medium text-[#BF6666] underline">
                  Selengkapnya →
                </a>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {restArticles.map((item, index) => (
              <article key={index} className="flex gap-4 rounded-md bg-[#FAFAFA] p-2 shadow-md transition-shadow duration-300 hover:shadow-lg">
                <div className="relative h-[100px] w-[90px] shrink-0 overflow-hidden rounded-sm">
                  <Image src={item.image} alt={item.title} fill className="object-cover"/>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-sm font-bold text-[#24394B]">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {item.description}
                  </p>
                  <div className="mt-auto flex justify-between pt-2">
                    <span className="text-xs font-semibold text-[#24394B]">
                      {item.date}
                    </span>
                    <a href="#" className="text-xs font-medium text-[#C06D6D] underline">
                      Selengkapnya →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
