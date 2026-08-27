import Image from "next/image";

const articles = [
    {
        image: "/ginting.jpg",
        title: "Anthony Sinisuka Ginting: Perjalanan dan Kiprah Sang Pebulu Tangkis Indonesia",
        date: "31 Juli 2026",
        description:"Salah satu pebulu tangkis tunggal putra Indonesia yang dikenal melalui gaya bermainnya yang cepat.",
    },
    {
        image: "/alwi.jpg",
        title: "Alwi Farhan — Harapan Baru Tunggal Putra",
        date: "25 Juli 2026",
        description:"Alwi Farhan menjadi salah satu nama muda yang menarik perhatian dalam perkembangan tunggal putra Indonesia.",
    },
    {
        image: "/badminton.jpg",
        title: "Perkembangan Bulu Tangkis Nasional Indonesia",
        date: "23 Juli 2026",
        description:"Merupakan salah satu cabang olahraga yang memiliki tempat istimewa di Indonesia.",
    },
];

export function Articles() {
    return(
        <section className="flex-1">
            <div className="mb-5 flex items-end justify-between border-b border-[#C06D6D]/50 pb-3">
                <h2 className="text-2xl font-bold text-[#823F3F]">
                    Berita Terbaru
                </h2>
                <a href="#artikel" className="text-sm text-[#C06D6D] underline">
                    Lebih Banyak
                </a>
            </div>

            <div className="space-y-5">
                {articles.map((item) => (
                    <article key={item.title} className="flex gap-6 bg-white p-5 shadow-[0_3px_12px_rgba(0,0,0,0.15)]">
                        <Image src={item.image} alt={item.title} width={180} height={140} className="h-140px w-180px object-cover" />

                        <div className="flex flex-1 flex-col">
                            <h3 className="text-xl font-bold text-[#823F3F]">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-sm text-gray-500">
                                {item.description}
                            </p>
                            <div className="mt-auto flex justify-between">
                                <span className="text-sm text-[#C06D6D]">
                                    {item.date}
                                </span>

                                <a href="#" className="text-sm text-[#C06D6D] underline">Baca Selengkapnya</a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}