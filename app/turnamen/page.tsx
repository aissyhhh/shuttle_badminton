import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TournamentHero } from "@/components/TournamentHero";
import { Tournament } from "@/components/Tournament";

export default function TournamentPage() {
  return (
    <>
      <Navbar />
      <main>
        <TournamentHero />
        <Tournament />
      </main>
      <Footer />
    </>
  );
}