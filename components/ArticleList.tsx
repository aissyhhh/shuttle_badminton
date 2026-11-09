// import Image from "next/image";
// import Link from "next/link";

// interface ArticleItem {
//     image: string;
//     title: string;
//     description: string;
//     date: string;
//     category: string;
//     slug: string;
// }

// interface ArticleListProps {
//     items: ArticleItem[];
//     variant?: "default" | "home";
// }

// export function ArticleList({items, variant = "default"}: ArticleListProps) {
//     if (variant === "home") {
//         const latestArticles = items.slice(0, 3);

//         return (
//             <section>
//                 <div className="mb-5 flex items-end justify-between gap-3 border-b border-[#24394B]/50 pb-3">
//                     <h2 className="text-xl font-bold text-[#24394B] sm:text-2xl md:text-3xl">
//                         Berita Terbaru
//                     </h2>

//                     <Link href="/berita" className="shrink-0 text-xs font-medium text-[#C06D6D] underline transition hover:text-[#24394B] sm:text-sm">
//                         Lebih Banyak →
//                     </Link>
//                 </div>

//                 <div className="space-y-4">
//                     {latestArticles.map((article) => (
//                         <article key={article.slug} className="flex min-h-0 gap-3 rounded-md bg-[#FAFAFA] p-3 shadow-[0_3px_10px_rgba(0,0,0,0.10)] transition-shadow duration-300 hover:shadow-md sm:min-h-[190px] sm:gap-5 sm:p-4">
//                             <div className="relative h-[105px] w-[120px] shrink-0 overflow-hidden rounded-sm sm:h-[158px] sm:w-[200px] md:w-[235px]">
//                                 <Image src={article.image} alt={article.title} fill sizes="(max-width: 640px) 120px, (max-width: 768px) 200px, 235px" className="object-cover"/>
//                             </div>

//                             <div className="flex min-w-0 flex-1 flex-col py-0 sm:py-1">
//                                 <h3 className="line-clamp-3 text-sm font-bold leading-snug text-[#24394B] sm:text-lg">
//                                     {article.title}
//                                 </h3>

//                                 <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#7B858D] sm:mt-3 sm:text-sm">
//                                     {article.description}
//                                 </p>

//                                 <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3 sm:pt-4">
//                                     <span className="text-[10px] font-semibold text-[#24394B] sm:text-xs">
//                                         {article.date}
//                                     </span>

//                                     <Link href={`/berita/${article.slug}`} className="shrink-0 text-[10px] font-medium text-[#C06D6D] underline transition hover:text-[#24394B] sm:text-sm">
//                                         Selengkapnya →
//                                     </Link>
//                                 </div>
//                             </div>
//                         </article>
//                     ))}
//                 </div>
//             </section>
//         );
//     }

//     const [firstArticle, ...restArticles] = items;
//     return (
//         <section>
//             <div className="mb-6 flex items-end justify-between border-b border-[#24394B]/50 pb-3">
//                 <h2 className="text-2xl font-bold text-[#24394B] sm:text-3xl">Berita Menarik</h2>
//             </div>

//             {!firstArticle ? (
//                 <p className="p-6 text-center text-sm text-gray-500">
//                     Tidak ada artikel yang cocok.
//                 </p>
//             ) : (
//                 <>
//                     <article className=" mb-5 flex flex-col gap-4 rounded-md bg-[#FAFAFA] p-3 shadow-md hover:shadow-lg sm:flex-row sm:gap-6 sm:p-5">
//                         <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-sm sm:h-55 sm:w-72 md:w-85">
//                             <Image src={firstArticle.image} alt={firstArticle.title} fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 288px, 340px" className="object-cover"/>
//                         </div>

//                         <div className="flex min-w-0 flex-1 flex-col">
//                             <h3 className="text-lg font-bold leading-snug text-[#24394B] sm:text-xl">
//                                 {firstArticle.title}
//                             </h3>

//                             <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-gray-500 sm:mt-3">
//                                 {firstArticle.description}
//                             </p>

//                             <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
//                                 <span className="text-xs font-semibold text-[#24394B] sm:text-sm">
//                                     {firstArticle.date}
//                                 </span>

//                                 <Link href={`/berita/${firstArticle.slug}`} className="text-xs font-medium text-[#BF6666] underline sm:text-sm">
//                                     Selengkapnya →
//                                 </Link>
//                             </div>
//                         </div>
//                     </article>

//                     <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                         {restArticles.map((item) => (
//                             <article key={item.slug} className="flex min-w-0 gap-3 rounded-md bg-[#FAFAFA] p-2 shadow-md transition-shadow duration-300 hover:shadow-lg">
//                                 <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm sm:h-25 sm:w-22.5">
//                                     <Image src={item.image} alt={item.title} fill sizes="90px" className="object-cover"/>
//                                 </div>

//                                 <div className="flex min-w-0 flex-1 flex-col">
//                                     <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#24394B]">
//                                         {item.title}
//                                     </h3>

//                                     <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
//                                         {item.description}
//                                     </p>

//                                     <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
//                                         <span className="text-[10px] font-semibold text-[#24394B] sm:text-xs">
//                                             {item.date}
//                                         </span>

//                                         <Link href={`/berita/${item.slug}`} className="text-[10px] text-[#C06D6D] underline sm:text-xs">
//                                             Baca Selengkapnya
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </article>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </section>
//     );
// }