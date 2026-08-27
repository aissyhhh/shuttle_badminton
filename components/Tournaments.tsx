import Image from "next/image";

const tournaments = {
    upcoming: {
        image: "/kejurda.png",
        title: "Kejurda PBSI DIY 2026",
        date: "August 26 - August 30",
        location: "Daerah Istimewa Yogyakarta (DIY)",
        button: "View Details",
    },
    ongoing: {
        image: "/hydroplus.png",
        title: "Hydroplus Sirkuit Nasional B Bengkulu",
        date: "August 17 - August 22",
        location: "Bengkulu",
        button: "Live Score",
    },
    register: {
        image: "/acibara.png",
        title: "Acibara Champion Cup",
        date: "August 24 - August 29",
        location: "Nusa Tenggara Barat",
        button: "Register Now",
    },
};

export function Tournaments() {
    return (
        <section className="max-w-500px rounded-sm bg-[#914D4D] p-5">
            <h2 className="mb-7 text-4xl font-bold text-white">
                Tournaments
            </h2>

            <div className="rounded-sm bg-white p-6">
                <h3 className="mb-5 text-xl font-bold text-[#823F3F]">
                    Upcoming Tournaments
                </h3>
                <TournamentCard item={tournaments.upcoming} />

                <h3 className="mb-5 mt-8 text-xl font-bold text-green-800">
                    Ongoing Tournaments
                </h3>
                <TournamentCard item={tournaments.ongoing} />

                <h3 className="mb-5 mt-8 text-xl font-bold text-blue-900">
                    Register Tournaments
                </h3>
                <TournamentCard item={tournaments.register} />
            </div>
        </section>
    );
}

function TournamentCard({ item }: {item:any}) {
    return(
        <div className="flex gap-4 rounded-xl bg-white p-3 shadow-[0_3px_12px_rgba(0,0,0,0.15)]">
            <Image src={item.image} alt={item.title} width={110} height={100} className="h-100px w-110px rounded-sm object-cover"/>

        <div className="flex min-w-0 flex-1 flex-col">
             <h4 className="text-base font-bold leading-tight text-[#823F3F]">
                {item.title}
            </h4>

            <div className="mt-2 space-y-1 text-xs text-[#823F3F]">
                <p>{item.date}</p>
                <p>{item.location}</p>
            </div>

            <div className="mt-auto flex justify-end">
                <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                    {item.button}
                </button>
            </div>
        </div>
        </div>
    )
}