
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
).replace(/\/$/, "");

export type KelasTurnamenApi = {
  id: number;
  turnamen_id: number;
  sektor: "MS" | "WS" | "MD" | "WD" | "XD";
  kategori_usia: string;
  harga: number;
};

export type TurnamenStatus =
  | "akan_datang"
  | "berlangsung"
  | "selesai";

export type TurnamenApi = {
  id: number;
  slug: string;
  gambar?: string | null;
  nama: string;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  venue: string;
  alamat?: string | null;
  tlp?: string | null;
  email?: string | null;
  start_regist: string;
  end_regist: string;
  status: TurnamenStatus;
  kelas_turnamen: KelasTurnamenApi[];
};

// Mengubah alamat gambar menjadi URL yang bisa diakses
export function getTournamentImageUrl(
  gambar?: string | null
): string | null {
  if (!gambar) return null;

  if (/^https?:\/\//i.test(gambar)) {
    return gambar;
  }

  return `${API_URL}/${gambar.replace(/^\/+/, "")}`;
}

// Mengambil semua data turnamen
export async function getTournaments(): Promise<TurnamenApi[]> {
  const response = await fetch(`${API_URL}/turnamen`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil turnamen (${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Format data turnamen harus berupa array.");
  }

  return data as TurnamenApi[];
}

// Mengambil satu turnamen berdasarkan slug
export async function getTournamentBySlug(
  slug: string
): Promise<TurnamenApi> {
  const tournaments = await getTournaments();

  const tournament = tournaments.find(
    (item) => item.slug === slug
  );

  if (!tournament) {
    throw new Error("Turnamen tidak ditemukan.");
  }

  return tournament;
}
