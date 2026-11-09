
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TournamentTabs } from "@/components/TournamentTabs";
import { TournamentLiveScore } from "@/components/TournamentLiveScore";
import { tournaments } from "@/lib/tournaments";
import Link from "next/link";
import Image from "next/image";

interface LiveScorePageProps {
  params: Promise<{ slug: string }>;
}

export default async function LiveScorePage({ params }: LiveScorePageProps) {
  const { slug } = await params;
  const tournament = tournaments.find((tournament) => tournament.id === slug);

  if (!tournament) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <section className="relative min-h-[250px] overflow-hidden sm:min-h-[300px] lg:h-[360px] lg:min-h-0">
        <Image src="/hero-detail.png" alt="Badminton" fill priority sizes="100vw" className="object-cover"/>
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex min-h-[250px] max-w-7xl items-center px-4 py-8 sm:min-h-[300px] sm:px-6 sm:pt-14 lg:h-full lg:px-10 lg:pt-16">
          <div className="max-w-2xl text-white">
            <h1 className="max-w-2xl text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {tournament.name}
            </h1>

            <Link href={`/turnamen/${tournament.id}/live-score`} aria-label="Lihat live score turnamen" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#c61818] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition hover:bg-[#5d2020] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-5 sm:px-5 sm:text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
              LIVE SCORE
            </Link>
          </div>
        </div>
      </section>

      <TournamentTabs tournamentId={tournament.id} />

      <main className="min-w-0 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <TournamentLiveScore tournamentId={tournament.id} />
        </div>
      </main>
      
      <Footer />
    </>
  );
}
