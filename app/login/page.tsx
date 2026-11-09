"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { apiFetch } from "@/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setError("");
  setLoading(true);

  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.user.role !== "admin") {
      throw new Error("Halaman ini khusus admin");
    }

    localStorage.setItem("token", data.token);
    router.push("/admin");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="flex min-h-screen items-center bg-[#FBFBFB] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-[460px]">
          <h1 className={`${montserrat.className} text-3xl font-semibold leading-tight text-[#0F172A] sm:text-4xl`}>
            Sistem Manajemen
            <span className="block font-bold text-[#D91111]">
              Shuttler Badminton
            </span>
          </h1>

          <p className="mt-3 text-xs leading-5 text-[#53697D] sm:text-sm">Sistem Manajemen turnamen, penjadwalan, dan operasional pertandinganolahraga badminton</p>

          <Image src="/login-players.png" alt="Dua pemain bulutangkis sedang smash" width={636} height={618} priority className="login-float mt-6 h-auto w-full max-w-[340px] mix-blend-multiply sm:max-w-[380px]"/>
        </div>

        <div className="w-full max-w-[520px] rounded-3xl bg-white px-7 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:px-12 sm:py-12 lg:ml-auto">
          <h2 className="text-center text-2xl font-bold text-[#263D50] sm:text-3xl">
            Selamat Datang Kembali!
          </h2>

          <p className="mt-2 text-center text-sm leading-relaxed text-[#66798A]">
            Silakan masuk menggunakan akun anda untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit} className="mt-9">
            <label htmlFor="email" className="text-sm font-medium text-[#44566A]">EMAIL</label>
            <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email anda" className="mt-2 h-12 w-full rounded-xl border border-[#D7DFE5] px-4 text-sm text-[#263D50] outline-none transition placeholder:text-[#8A98A4] focus:border-[#E53030]"/>

            <label htmlFor="password" className="mt-6 block text-sm font-medium text-[#44566A]">PASSWORD</label>
            <div className="relative mt-2">
              <input id="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password anda" className="h-12 w-full rounded-xl border border-[#D7DFE5] pl-4 pr-12 text-sm text-[#263D50] outline-none transition placeholder:text-[#8A98A4] focus:border-[#E53030]"/>
              <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A98A4] transition hover:text-[#263D50]"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <Link href="/admin/lupa-password" className="mt-4 inline-block text-xs font-medium text-[#E53030] hover:underline">Lupa Password?</Link>

            {error && (
              <p role="alert" className="mt-4 rounded-lg border border-[#F5C2C2] bg-[#FFF5F5] px-3 py-2 text-sm text-[#C90000]">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="mt-6 h-13 w-full rounded-xl bg-[#E53030] text-base font-bold text-white transition hover:bg-[#C92626] disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
