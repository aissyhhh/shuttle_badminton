import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[#894949] px-10 py-12 text-white">
            <div className="mx-auto max-w-1400px">
                <div className="flex items-start justify-between">
                    <div>
                        <Image src="/shutter.png" alt="Shutter Badminton" width={140} height={70} className="h-16 w-auto" />
                        <p className="mt-4 max-w-650px text-base leading-relaxed">
                            Elevate your game. Connect with top athletes and
                            <br />
                            experience sports in a breathable, boundless new arena
                        </p>
                    </div>

                    <nav className="flex gap-8 pt-4">
                        <a href="#beranda" className="font-semibold hover:text-white/70">Beranda</a>
                        <a href="#artikel" className="font-semibold hover:text-white/70">Artikel</a>
                        <a href="#pemain" className="font-semibold hover:text-white/70">Pemain</a>
                        <a href="#turnamen" className="font-semibold hover:text-white/70">Turnamen</a>
                    </nav>
                </div>

                <div className="my-8 border-t border-white/40" />

                <p className="text-sm">
                     © 2026 Shuttler Badminton
                </p>
            </div>
        </footer>
    )
}