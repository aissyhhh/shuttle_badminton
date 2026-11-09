import { notFound } from "next/navigation";

import { players } from "@/lib/players";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DetailHero } from "@/components/DetailHero";
// import { PlayerOverview } from "@/components/PlayerOverview";
import { TournamentHistory } from "@/components/TournamentHistory";

interface PlayerDetailPageProps { params: Promise<{ slug: string }> }

export default async function PlayerDetailPage({ params }: PlayerDetailPageProps) {
  const { slug } = await params;
  const player = players.find((player) => player.id === slug);
  if (!player) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <DetailHero player={player} />
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* <PlayerOverview player={player} /> */}
        <TournamentHistory player={player} />
      </section>
      <Footer />
    </>
  );
}