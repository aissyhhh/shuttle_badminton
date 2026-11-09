const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ArticleItem {
  image: string;
  title: string;
  description: string;
  date: string;
  category: string;
  slug: string;
}

interface ApiArticle {
  id: number;
  slug: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  gambar: string;
  publish_at: string | number | null;
}

function toItem(a: ApiArticle): ArticleItem {
  return {
    slug: a.slug,
    title: a.judul,
    description: a.deskripsi,
    category: a.kategori,
    image: a.gambar || "/placeholder.png",
    date: a.publish_at
      ? new Date(a.publish_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
  };
}

export async function fetchArticles(
  params: { page?: number; limit?: number; kategori?: string; search?: string } = {},
) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.kategori) qs.set("kategori", params.kategori);
  if (params.search) qs.set("search", params.search);

  const res = await fetch(`${API_URL}/articles?${qs.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal memuat artikel");

  const json = await res.json();
  return {
    items: (json.data as ApiArticle[]).map(toItem),
    page: json.page as number,
    total: json.total as number,
    totalPages: json.totalPages as number,
  };
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const res = await fetch(`${API_URL}/articles/slug/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Gagal memuat artikel");
  return toItem(await res.json());
}