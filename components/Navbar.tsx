import Image from "next/image";

const links = [
    { label: "Beranda", href: "/" },
    { label: "Berita", href: "/berita" },
    { label: "Pemain", href: "/pemain" },
    { label: "Turnamen", href: "/turnamen" },
];

export function Navbar() {
    return (
        <nav className="absolute inset-x-0 top-0 z-30 px-4 pt-4">
            <div className="relative mx-auto flex h-68px max-w-1376px items-center rounded-3xl bg-[#243B4D] px-9">
                <Image src="/shutter.png" alt="Shuttler Badminton" width={140} height={70} className="h-12 w-auto"/>

                <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
                {links.map((link) =>(
                    <a key={link.label} href={link.href} className="text-sm font-semibold text-white hover:text-white/80">
                        {link.label}
                    </a>
                ))}
            </div>
            </div>
        </nav>
    )
}