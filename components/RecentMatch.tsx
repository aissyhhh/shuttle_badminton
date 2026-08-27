const recentMatch = [
    {
        tournament: "Sela Open 2026",
        category: "Men's Singles Final",
        date: "July 31, 2026",
        players: [
            {
                name: "Jonathan Christie",
                country: "INA",
                score: "21",
                score2: "21",
            },
            {
                name: "Anthony Ginting",
                country: "INA",
                score: "16",
                score2: "15",
            },
        ],
    },
    {
        tournament: "POLYTRON Pontianak International Challenge 2026",
        category: "Men's Singles Qualification",
        date: "",
        players: [
            {
                name: "Radithya Bayu Wardhana",
                country: "INA",
                score: "21",
                score2: "21",
            },
            {
                name: "Pranav Rao Gandham",
                country: "IND",
                score: "14",
                score2: "19",
            },
        ],
    },
    {
        tournament: "BWF World Championships 2026",
        category: "Women's Singles Final",
        date: "May 20, 2026",
        players: [
            {
                name: "An Se Young",
                country: "KOR",
                score: "21",
                score2: "21",
            },
            {
                name: "Akane Yamaguchi",
                country: "JPN",
                score: "17",
                score2: "14",
            },
        ],
    },
];

export function RecentMatch() {
    return (
        <section className="bg-[#FAF8F7] py-14">
            <div className="mx-auto max-w-1400px px-6">
                <div className="mb-6 border-b border-[#C58B8B] pb-2">
                    <h2 className="text-2xl font-semibold text-[#823F3F]">
                        Match Results
                    </h2>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {recentMatch.map((match, index) => (
                        <div key={index} className="overflow-hidden rounded-lg bg-white shadow-[0_3px_12px_rgba(130,63,63,0.12)]">
                            <div className="flex items-center justify-between bg-[#914D4D] px-4 py-3 ">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        {match.tournament}
                                    </h3>

                                    <p className="text-[10px] text-white/70">
                                        {match.category}
                                    </p>
                                </div>

                                <span className="text-[10px] text-white/70">
                                    {match.date}
                                </span>
                            </div>

                            <div className="space-y-2 p-3">
                                {match.players.map((player, playerIndex) => (
                                    <div key={playerIndex} className="flex items-center  px-4 py-3">
                                        <div className="flex min-w-0 flex-1 items-center gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-[#823F3F]">
                                                    {player.name}
                                                </p>

                                                <p className="text-[10px] text-[#756B6B]">
                                                    {player.country}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 text-sm font-bold text-[#823F3F]">
                                            <span>{player.score}</span>
                                            <span>{player.score2}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}