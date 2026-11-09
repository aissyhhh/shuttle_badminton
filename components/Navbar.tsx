"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
    { label: "Beranda", href: "/" },
    { label: "Berita", href: "/berita" },
    { label: "Pemain", href: "/pemain" },
    { label: "Ranking", href: "/ranking" },
    { label: "Turnamen", href: "/turnamen" },
];

export function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed inset-x-0 top-0 z-30 px-3 pt-3 sm:px-4 sm:pt-4">
            <div className="relative mx-auto max-w-[1376px]">
                <div className="flex h-[60px] items-center justify-between rounded-3xl bg-[#243B4D] px-5 sm:h-[68px] sm:px-7 lg:px-9">
                    <Link href="/" onClick={() => setOpen(false)}>
                        <Image src="/shutter.png" alt="Shuttler Badminton" width={140} height={70} className="h-10 w-auto sm:h-12"/>
                    </Link>

                    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex lg:gap-8">
                        {links.map((link) => (
                            <Link key={link.label} href={link.href} className={`whitespace-nowrap text-xs font-semibold text-white transition hover:text-[#E89595] lg:text-sm
                                ${pathname === link.href ? "underline underline-offset-4" : ""}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <button type="button" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden" aria-label="Toggle menu">
                        {open ? ( <X size={24} /> ) : ( <Menu size={24} /> )}
                    </button>
                </div>

                {open && (
                    <div className="mt-2 rounded-2xl bg-[#243B4D] px-5 py-4 shadow-lg md:hidden">
                        <div className="flex flex-col gap-1">
                            {links.map((link) => (
                                <Link key={link.label} href={link.href} onClick={() => setOpen(false)}
                                    className={`rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#E89595]
                                        ${pathname === link.href ? "bg-white/10 text-[#E89595]" : ""}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}