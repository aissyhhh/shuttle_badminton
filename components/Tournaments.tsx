import Image from "next/image";
import Link from "next/link";
import { tournaments } from "@/lib/tournaments";

export function Tournaments() {
    const upcomingTournaments = tournaments.filter((tournament) => tournament.status === "upcoming");
    const ongoingTournaments = tournaments.filter((tournament) => tournament.status === "ongoing");
    const registerTournaments = tournaments.filter((tournament) => tournament.status === "registration");

    return (
        <section className="rounded-sm bg-[#faf6f6] p-4 sm:p-5 md:p-6">
            {upcomingTournaments.length > 0 && (
                <>
                <h3 className="mb-5 text-lg font-bold text-[#823F3F] sm:text-xl">Upcoming Tournaments</h3>
                <div className="space-y-4">
                    {upcomingTournaments.map((tournament) => (
                        <TournamentCard key={tournament.id} tournament={tournament} button="View Details"/>
                    ))}
                </div>
                </>
            )}

            {ongoingTournaments.length > 0 && (
                <>
                <h3 className="mb-5 mt-8 text-lg font-bold text-[#376e44] sm:text-xl">Ongoing Tournaments</h3>
                <div className="space-y-4">
                    {ongoingTournaments.map((tournament) => (
                        <TournamentCard key={tournament.id} tournament={tournament} button="Live Score"/>
                    ))}
                </div>
                </>
            )}

            {registerTournaments.length > 0 && (
                <>
                <h3 className="mb-5 mt-8 text-lg font-bold text-[#823F3F] sm:text-xl">Register Tournaments</h3>
                <div className="space-y-4">
                    {registerTournaments.map((tournament) => (
                        <TournamentCard key={tournament.id} tournament={tournament} button="Register Now"/>
                    ))}
                </div>
                </>
            )}
        </section>
    );
}

function TournamentCard({tournament, button}: {
    tournament: (typeof tournaments)[number];
    button: string;
}) {
    return (
        <div className="flex min-h-[130px] gap-3 rounded-xl bg-white p-3.5 shadow-[0_3px_12px_rgba(0,0,0,0.12)] sm:gap-4 sm:p-4">
            <Image src={tournament.image} alt={tournament.name} width={130} height={105} className="h-[100px] w-[110px] shrink-0 rounded-md object-cover sm:h-[105px] sm:w-[130px]"/>
            <div className="flex min-w-0 flex-1 flex-col">
                <h4 className="text-sm font-bold leading-tight text-[#263D50] sm:text-base">
                    {tournament.name}
                </h4>

                <div className="mt-2 space-y-1 text-[10px] text-[#756B6B] sm:text-xs">
                    <p>{tournament.date}</p>
                    <p>{tournament.location}</p>
                </div>

                <div className="mt-auto flex justify-end pt-2">
                    <Link href={`/turnamen/${tournament.id}`} className="inline-flex h-8 min-w-[96px] items-center justify-center rounded-lg bg-[#823F3F] px-3 text-[10px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition hover:bg-[#6F3434] sm:h-8.5 sm:min-w-[105px] sm:px-3.5 sm:text-[11px]">
                        {button}
                    </Link>
                </div>
            </div>
        </div>
    );
}