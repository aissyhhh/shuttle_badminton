
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { TournamentDetail } from "@/components/TournamentDetail";
import { getTournamentBySlug } from "@/lib/tournamentsApi";

interface TournamentDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function TournamentDetailPage({
  params,
  searchParams,
}: TournamentDetailPageProps) {
  const { slug } = await params;
  const { tab } = await searchParams;

  let tournament;

  try {
    tournament = await getTournamentBySlug(slug);
  } catch {
    notFound();
  }

  const validTabs = ["INFORMASI", "PLAYERS", "DRAW", "MATCH"];
  const activeTab = validTabs.includes(tab ?? "")
    ? tab!
    : "INFORMASI";

  return (
    <>
      <Navbar />

      <section className="relative min-h-[280px] overflow-hidden sm:min-h-[320px] lg:h-[360px]">
        <Image
          src="/hero-detail.png"
          alt="Badminton"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex min-h-[280px] w-full max-w-7xl items-center px-4 py-8 sm:min-h-[320px] sm:px-6 lg:h-[360px] lg:px-10">
          <div className="w-full max-w-2xl text-white">
            <h1 className="max-w-xl break-words text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              {tournament.nama}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {tournament.status === "berlangsung" && (
                <Link
                  href={`/turnamen/${tournament.slug}/live-score`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#c61818] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition hover:bg-[#5d2020] sm:px-5"
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                  LIVE SCORE
                </Link>
              )}

              {tournament.status === "akan_datang" && (
                <Link
                  href={`/pendaftaran/${tournament.slug}`}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#263D50] sm:px-6"
                >
                  REGISTER
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <TournamentDetail tournament={tournament} initialTab={activeTab}/>

      <Footer />
    </>
  );
}
