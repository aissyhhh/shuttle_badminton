import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[#894949] px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-10">
            <div className="mx-auto max-w-[1400px]">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                    <div className="max-w-[650px]">
                        <Image src="/shutter.png" alt="Shuttler Badminton" width={140} height={70} className="h-14 w-auto sm:h-16"/>

                        <p className="mt-4 text-sm leading-relaxed sm:text-base">
                            Elevate your game. Connect with top athletes and experience sports in a breathable, boundless new arena.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="/wasit/daftar" className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-xs font-semibold text-[#894949] transition hover:bg-white/85 sm:text-sm">
                                Daftar Jadi Wasit
                            </a>

                            <a href="/login" className="inline-flex h-10 items-center justify-center rounded-full bg-white/15 px-6 text-xs font-semibold text-white transition hover:bg-white/25 sm:text-sm">
                                Masuk
                            </a>
                        </div>
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-3 pt-0 sm:gap-x-8 lg:pt-4">
                        <a href="/" className="text-sm font-semibold hover:text-white/70 sm:text-base">Beranda</a>
                        <a href="/berita" className="text-sm font-semibold hover:text-white/70 sm:text-base">Artikel</a>
                        <a href="/pemain" className="text-sm font-semibold hover:text-white/70 sm:text-base">Pemain</a>
                        <a href="/ranking" className="text-sm font-semibold hover:text-white/70 sm:text-base">Ranking</a>
                        <a href="/turnamen" className="text-sm font-semibold hover:text-white/70 sm:text-base">Turnamen</a>
                    </nav>
                </div>

                <div className="my-7 border-t border-white/40 sm:my-8" />
                <p className="text-xs sm:text-sm">© 2026 Shuttler Badminton</p>
            </div>
        </footer>
    );
}