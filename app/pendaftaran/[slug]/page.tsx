import { tournaments } from "@/lib/tournaments";
import { RegistrationHero } from "@/components/RegistrationHero";
import { RegistrationSidebar } from "@/components/RegistrationSidebar";
import { RegistrationForm } from "@/components/RegistrationForm";

interface PageProps { params: Promise<{ slug: string }> }

export default async function TournamentRegistrationPage({ params }: PageProps) {
  const { slug } = await params;
  const tournament = tournaments.find(
    (tournament) => tournament.id === slug
  );

  if (!tournament) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F6F7]">
        <p className="text-[14px] text-[#66798A]">Turnamen tidak ditemukan.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F6F7]">
      <RegistrationHero tournament={tournament} />
      <section className="mx-auto max-w-[11300px] px-5 py-6">
        <div className="grid items-start gap-5 lg:grid-cols-[330px_minmax(0,1fr)]">
          <RegistrationSidebar tournament={tournament} />
          <RegistrationForm />
        </div>
      </section>
    </main>
  );
}