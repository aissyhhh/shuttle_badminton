"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/admin/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      <p className="mt-2 text-sm text-gray-600">Login berhasil.</p>

      <button
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-[#E53030] px-4 py-2 text-sm font-bold text-white"
      >
        Logout
      </button>
    </main>
  );
}