"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiCreditCard, FiMapPin, FiUser, FiUsers, FiX, FiUpload } from "react-icons/fi";
import { Tournament } from "@/lib/tournaments";

interface RegistrationPaymentProps { tournament: Tournament }
const FEE_MODE = "per_entry" as "per_entry" | "per_participant";

function parseRupiah(value?: string): number {
    const digits = (value ?? "").replace(/\D/g, "");
    return digits ? Number(digits) : 0;
}

function formatRupiah(value: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

export function RegistrationPayment({ tournament }: RegistrationPaymentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sector = searchParams.get("sektor") ?? "";
    const age = searchParams.get("umur") ?? "";
    const participants = searchParams.getAll("peserta");
    const participantCount = Math.max(participants.length, 1);

    const [selectedClass, setSelectedClass] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("bank");
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const classes = tournament.classes ?? [];
    const matchedClass = sector
        ? classes.find((item) =>
              item.name.toLowerCase().includes(sector.toLowerCase())
          )
        : undefined;
    const showClassPicker = !matchedClass && classes.length > 0;

    const feeClass =
        matchedClass ??
        classes.find((item) => item.code === selectedClass) ??
        classes[0];

    const categoryLabel = [sector, age].filter(Boolean).join(" · ") || feeClass?.name || "-";
    const baseFee = parseRupiah(feeClass?.fee);
    const total = baseFee * (FEE_MODE === "per_participant" ? participantCount : 1);
    const totalLabel = feeClass
        ? baseFee > 0
            ? formatRupiah(total)
            : feeClass.fee
        : "-";

    const playerLabel = (index: number) =>
        participants.length > 1 ? `Pemain ${index + 1}` : "Pemain";

    function handlePayment() {
        if (!paymentProof) {
            alert(
                "Silakan upload bukti pembayaran terlebih dahulu."
            );
            return;
        }

        setShowSuccess(true);
    }

    function handleCloseSuccess() {
        setShowSuccess(false);
        router.push("/");
    }

    return (
        <main className="min-h-screen bg-[#F5F6F7]">
            <header className="border-b border-[#DDE3E8] bg-white">
                <div className="mx-auto flex h-[68px] max-w-[1300px] items-center justify-between px-5">
                    <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-[12px] font-medium text-[#53697D] transition hover:text-[#E50909]">
                        <FiArrowLeft size={17} />
                        Kembali
                    </button>

                    <Image src="/shutter.png" alt="Shuttler" width={90} height={40} className="h-auto w-[78px] object-contain" />
                    <div className="w-[65px]" />
                </div>
            </header>

            <section className="mx-auto max-w-[1300px] px-5 py-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#E50909]">Pembayaran</p>

                <h1 className="mt-1 text-[25px] font-bold text-[#263D50]">Selesaikan Pembayaran</h1>
                <p className="mt-1 text-[13px] text-[#66798A]">Lengkapi pembayaran untuk menyelesaikan pendaftaran turnamen.</p>
            </section>

            <section className="mx-auto max-w-[1300px] px-5 pb-10">
                <div className="grid items-start gap-5 lg:grid-cols-[1fr_370px]">
                    <div className="space-y-5">
                        <div className="rounded-[12px] border border-[#D5DCE2] bg-white p-5 shadow-sm">
                            <h2 className="text-[16px] font-bold text-[#53697D]">Detail Turnamen</h2>
                            <div className="mt-4 flex gap-4">
                                <div className="relative h-[90px] w-[125px] shrink-0 overflow-hidden rounded-[8px] border border-[#DDE3E8] bg-white">
                                    <Image src={tournament.image} alt={tournament.name} fill className="object-contain" />
                                </div>

                                <div>
                                    <h3 className="text-[15px] font-bold leading-[1.4] text-[#263D50]">
                                        {tournament.name}
                                    </h3>

                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center gap-2 text-[11px] text-[#66798A]">
                                            <FiCalendar size={14} className="text-[#E50909]" />
                                            <span>{tournament.date}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-[11px] text-[#66798A]">
                                            <FiMapPin size={14} className="text-[#E50909]" />
                                            <span>{tournament.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showClassPicker && (
                            <div className="rounded-[12px] border border-[#D5DCE2] bg-white p-5 shadow-sm">
                                <h2 className="text-[16px] font-bold text-[#53697D]">Pilih Kelas Pertandingan</h2>
                                <p className="mt-1 text-[10px] text-[#8A98A4]">
                                    Kelas untuk {categoryLabel} belum ditemukan, silakan pilih secara manual.
                                </p>

                                <div className="mt-4 space-y-2">
                                    {classes.map((item) => (
                                        <label key={item.code} className={`flex cursor-pointer items-center justify-between rounded-[8px] border p-3 transition ${feeClass?.code === item.code
                                            ? "border-[#E50909] bg-[#FFF5F5]"
                                            : "border-[#DDE3E8] bg-white hover:border-[#E50909]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="category" value={item.code} checked={feeClass?.code === item.code}
                                                    onChange={() => setSelectedClass(item.code)}
                                                    className="radio-input"
                                                />

                                                <div>
                                                    <p className="text-[12px] font-semibold text-[#263D50]">
                                                        {item.name}
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] text-[#8A98A4]">
                                                        Kode: {item.code}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="text-[12px] font-bold text-[#E50909]">
                                                {item.fee}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="rounded-[12px] border border-[#D5DCE2] bg-white p-5 shadow-sm">
                            <h2 className="text-[16px] font-bold text-[#53697D]">Metode Pembayaran</h2>
                            <div className="mt-4 space-y-3">
                                <label
                                    className={`flex cursor-pointer items-center gap-3 rounded-[8px] border p-4 transition ${
                                        paymentMethod === "bank"
                                            ? "border-[#E50909] bg-[#FFF5F5]"
                                            : "border-[#DDE3E8] bg-white"
                                    }`}
                                >
                                    <input type="radio" name="payment" value="bank" checked={paymentMethod === "bank"}
                                        onChange={() => setPaymentMethod("bank")}
                                        className="radio-input"
                                    />

                                    <FiCreditCard size={20} className="text-[#E50909]"/>
                                    <div>
                                        <p className="text-[12px] font-semibold text-[#263D50]">Transfer Bank</p>
                                        <p className="mt-0.5 text-[10px] text-[#8A98A4]">Pembayaran melalui transfer bank</p>
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-center gap-3 rounded-[8px] border p-4 transition ${
                                        paymentMethod === "qris"
                                            ? "border-[#E50909] bg-[#FFF5F5]"
                                            : "border-[#DDE3E8] bg-white"
                                    }`}
                                >
                                    <input type="radio" name="payment" value="qris" checked={paymentMethod === "qris"}
                                        onChange={() => setPaymentMethod("qris")}
                                        className="radio-input"
                                    />
                                    <FiCreditCard size={20} className="text-[#E50909]"/>
                                    <div>
                                        <p className="text-[12px] font-semibold text-[#263D50]">QRIS</p>
                                        <p className="mt-0.5 text-[10px] text-[#8A98A4]">Pembayaran melalui QRIS</p>
                                    </div>
                                </label>
                            </div>

                            {paymentMethod === "bank" && (
                                <div className="mt-4 rounded-[8px] bg-[#F8FAFB] p-4">
                                    <p className="text-[10px] font-semibold uppercase text-[#8A98A4]">Rekening Pembayaran</p>
                                    <p className="mt-2 text-[14px] font-bold text-[#263D50]">
                                        {tournament.registration?.bank ?? "Bank Shuttler"}
                                    </p>

                                    <p className="mt-1 text-[12px] text-[#53697D]">
                                        {tournament.registration?.accountNumber ?? "Nomor rekening belum tersedia"}
                                    </p>

                                    <p className="mt-2 text-[10px] text-[#8A98A4]">
                                        Atas nama: Shuttler Badminton
                                    </p>

                                    {total > 0 && (
                                        <p className="mt-3 border-t border-[#E5E9EC] pt-3 text-[11px] text-[#53697D]">
                                            Transfer sesuai total:{" "}
                                            <span className="font-bold text-[#E50909]">{totalLabel}</span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {paymentMethod === "qris" && (
                                <div className="mt-4 rounded-[8px] bg-[#F8FAFB] p-4">
                                    <p className="text-[10px] font-semibold uppercase text-[#8A98A4]">QRIS</p>
                                    <div className="mt-3 flex justify-center">
                                        <div className="overflow-hidden rounded-[8px] border border-[#DDE3E8] bg-white p-3">
                                            <Image src="/qris.png" alt="QRIS Pembayaran" width={220} height={220} className="h-[220px] w-[220px] object-contain"/>
                                        </div>
                                    </div>

                                    <p className="mt-3 text-center text-[10px] leading-[1.5] text-[#8A98A4]">
                                        Scan QRIS menggunakan aplikasi pembayaran yang mendukung QRIS.
                                    </p>
                                </div>
                            )}

                            <div className="mt-5 border-t border-[#E5E9EC] pt-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[12px] font-semibold text-[#263D50]">
                                            Bukti Pembayaran
                                            <span className="ml-1 text-[#E50909]">*</span>
                                        </p>

                                        <p className="mt-1 text-[10px] text-[#8A98A4]">
                                            Upload bukti pembayaran yang sudah dilakukan.
                                        </p>
                                    </div>

                                </div>

                                <label htmlFor="paymentProof"
                                    className={`mt-4 flex cursor-pointer items-center gap-3 rounded-[8px] border border-dashed p-4 transition ${
                                        paymentProof
                                            ? "border-[#20A653] bg-[#F4FBF6]"
                                            : "border-[#CBD5DC] bg-[#FAFBFC] hover:border-[#E50909] hover:bg-[#FFF8F8]"
                                    }`}
                                >

                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                            paymentProof
                                                ? "bg-[#EAF8EF] text-[#20A653]"
                                                : "bg-[#FFF0F0] text-[#E50909]"
                                        }`}
                                    >
                                        {paymentProof ? (
                                            <FiCheckCircle size={18} />
                                        ) : (
                                            <FiUpload size={18} />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        {paymentProof ? (
                                            <>
                                                <p className="truncate text-[11px] font-semibold text-[#20A653]">{paymentProof.name}</p>
                                                <p className="mt-0.5 text-[9px] text-[#8A98A4]">File berhasil dipilih</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-[11px] font-semibold text-[#53697D]">Pilih bukti pembayaran</p>
                                                <p className="mt-0.5 text-[9px] text-[#9AA7B2]">JPG, PNG atau PDF • Maks. 2MB</p>
                                            </>
                                        )}
                                    </div>
                                </label>

                                <input id="paymentProof" name="paymentProof" type="file" accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0] ?? null;
                                        if (!file) {
                                            setPaymentProof(null);
                                            return;
                                        }

                                        if (file.size > 2 * 1024 * 1024) {
                                            alert("Ukuran file maksimal 2MB.");
                                            event.target.value = "";
                                            setPaymentProof(null);
                                            return;
                                        }
                                        setPaymentProof(file);
                                    }}
                                    className="file-input"
                                />
                            </div>
                        </div>
                    </div>

                    <aside className="sticky top-5 rounded-[12px] border border-[#D5DCE2] bg-white p-5 shadow-sm">
                        <h2 className="text-[17px] font-bold text-[#53697D]">Ringkasan Pembayaran</h2>

                        <div className="mt-5 space-y-4">
                            <div>
                                <p className="text-[10px] text-[#8A98A4]">Turnamen</p>
                                <p className="mt-1 text-[12px] font-semibold leading-[1.4] text-[#263D50]">
                                    {tournament.name}
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiCalendar size={14} className="mt-0.5 shrink-0 text-[#E50909]" />
                                <div>
                                    <p className="text-[10px] text-[#8A98A4]">Tanggal</p>
                                    <p className="mt-0.5 text-[12px] font-semibold text-[#263D50]">{tournament.date}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiMapPin size={14} className="mt-0.5 shrink-0 text-[#E50909]" />
                                <div>
                                    <p className="text-[10px] text-[#8A98A4]">Lokasi</p>
                                    <p className="mt-0.5 text-[12px] font-semibold text-[#263D50]">{tournament.location}</p>
                                </div>
                            </div>

                            <div className="border-t border-[#E5E9EC]" />

                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0]">
                                    {participantCount > 1 ? (
                                        <FiUsers size={15} className="text-[#E50909]" />
                                    ) : (
                                        <FiUser size={15} className="text-[#E50909]" />
                                    )}
                                </div>

                                <div className="min-w-0 space-y-2">
                                    {participants.length > 0 ? (
                                        participants.map((name, index) => (
                                            <div key={index}>
                                                <p className="text-[10px] text-[#8A98A4]">{playerLabel(index)}</p>
                                                <p className="mt-0.5 truncate text-[12px] font-semibold text-[#263D50]">{name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div>
                                            <p className="text-[10px] text-[#8A98A4]">Peserta</p>
                                            <p className="mt-0.5 text-[12px] font-semibold text-[#263D50]">Peserta Pendaftaran</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] text-[#8A98A4]">Kategori</p>
                                <p className="mt-1 text-[12px] font-semibold text-[#263D50]">{categoryLabel}</p>
                            </div>

                            <div className="border-t border-[#E5E9EC]" />

                            {FEE_MODE === "per_participant" && participantCount > 1 && baseFee > 0 && (
                                <div className="space-y-2 text-[11px] text-[#66798A]">
                                    <div className="flex justify-between">
                                        <span>Biaya per peserta</span>
                                        <span>{formatRupiah(baseFee)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Jumlah peserta</span>
                                        <span>× {participantCount}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[12px] text-[#66798A]">Total Pembayaran</span>
                                <span className="text-[18px] font-bold text-[#E50909]">{totalLabel}</span>
                            </div>
                        </div>

                        <button type="button" onClick={handlePayment} className="mt-6 flex h-[44px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#E50909] text-[12px] font-semibold text-white transition hover:bg-[#C90707]">
                            <FiCreditCard size={16} />
                            Bayar Sekarang
                        </button>

                        <p className="mt-3 text-center text-[9px] leading-[1.4] text-[#8A98A4]">
                            Dengan melanjutkan pembayaran, kamu menyetujui ketentuan pendaftaran turnamen.
                        </p>
                    </aside>
                </div>
            </section>

            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
                    <div className="relative w-full max-w-[390px] rounded-[14px] bg-white p-7 text-center shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                        <button type="button" onClick={() => setShowSuccess(false)} className="absolute right-4 top-4 text-[#8A98A4] transition hover:text-[#263D50]">
                            <FiX size={18} />
                        </button>

                        <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#EAF8EF]">
                            <FiCheckCircle size={34} className="text-[#20A653]" />
                        </div>

                        <h2 className="mt-5 text-[20px] font-bold text-[#263D50]">Data Sedang di Proses!</h2>
                        <p className="mt-2 text-[12px] leading-[1.5] text-[#66798A]">
                            Pembayaran pendaftaran kamu akan masuk ketika data telah diverifikasi oleh pihak Shuttler.
                        </p>

                        <div className="mt-5 space-y-3 rounded-[8px] bg-[#F8FAFB] p-4 text-left">
                            <div className="flex justify-between gap-4">
                                <span className="text-[10px] text-[#8A98A4]">Turnamen</span>
                                <span className="max-w-[200px] text-right text-[10px] font-semibold text-[#263D50]">
                                    {tournament.name}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-[10px] text-[#8A98A4]">Tanggal</span>
                                <span className="max-w-[200px] text-right text-[10px] font-semibold text-[#263D50]">
                                    {tournament.date}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-[10px] text-[#8A98A4]">Lokasi</span>
                                <span className="max-w-[200px] text-right text-[10px] font-semibold text-[#263D50]">
                                    {tournament.location}
                                </span>
                            </div>

                            {participants.length > 0 && (
                                <div className="flex justify-between gap-4">
                                    <span className="text-[10px] text-[#8A98A4]">Pemain</span>
                                    <span className="max-w-[200px] text-right text-[10px] font-semibold text-[#263D50]">
                                        {participants.join(" & ")}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between gap-4">
                                <span className="text-[10px] text-[#8A98A4]">Kategori</span>
                                <span className="max-w-[200px] text-right text-[10px] font-semibold text-[#263D50]">
                                    {categoryLabel}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-[10px] text-[#8A98A4]">Total</span>
                                <span className="text-right text-[12px] font-bold text-[#20A653]">
                                    {totalLabel}
                                </span>
                            </div>
                        </div>

                        <button type="button" onClick={handleCloseSuccess} className="mt-5 h-[42px] w-full rounded-[7px] bg-[#E50909] text-[12px] font-semibold text-white transition hover:bg-[#C90707]">
                            Selesai
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}