"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiUpload, FiX } from "react-icons/fi";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const LICENSE_LEVELS = ["Belum bersertifikat", "Wasit Daerah (Kabupaten/Kota)", "Wasit Provinsi", "Wasit Nasional", "Wasit BWF / Internasional"];
const EDUCATION = ["SMA / SMK", "D3", "S1", "S2", "Lainnya"];
const ROLES = ["Referee", "Umpire", "Service Judge", "Line Judge"];
const DAYS = ["Hari kerja", "Sabtu", "Minggu", "Hari libur nasional"];

export default function DaftarWasitPage() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [travel, setTravel] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const licensed = level !== "" && level !== LICENSE_LEVELS[0];

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  function handleFile(key: string, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || file.size > MAX_FILE_SIZE) {
      if (file) alert("Ukuran file maksimal 2MB.");
      event.target.value = "";
      setFiles((prev) => ({ ...prev, [key]: "" }));
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: file.name }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!gender) return setError("Jenis kelamin belum dipilih.");
    if (roles.length === 0) return setError("Pilih minimal satu posisi yang diminati.");
    if (days.length === 0) return setError("Pilih minimal satu hari ketersediaan.");
    if (!travel) return setError("Pilih kesediaan ditugaskan ke luar kota.");
    if (String(data.get("password")).length < 8) return setError("Password minimal 8 karakter.");
    if (data.get("password") !== data.get("confirmPassword")) return setError("Konfirmasi password tidak sama.");

    setError("");
    setLoading(true);

    try {
      // TODO: kirim ke backend, mis. await fetch("/api/wasit/daftar", { method: "POST", body: data });
      // Tambahkan juga gender, level, travel, roles, dan days (state) ke payload.
      setShowSuccess(true);
    } catch {
      setError("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F6F7]">
      <header className="border-b border-[#DDE3E8] bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1000px] items-center justify-between px-5">
          <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-[12px] font-medium text-[#53697D] transition hover:text-[#E50909]"><FiArrowLeft size={17} />Kembali</button>
          <Image src="/shutter.png" alt="Shuttler" width={90} height={40} className="h-auto w-[78px] object-contain" />
          <div className="w-[65px]" />
        </div>
      </header>

      <section className="mx-auto max-w-[1000px] px-5 py-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#E50909]">Wasit</p>
        <h1 className="mt-1 text-[25px] font-bold text-[#263D50]">Formulir Pendaftaran Wasit</h1>
        <p className="mt-1 text-[13px] text-[#66798A]">Lengkapi data di bawah ini dengan benar. Pendaftaran akan diverifikasi oleh pihak Shuttler.</p>
      </section>

      <form onSubmit={handleSubmit} className="mx-auto max-w-[1000px] space-y-5 px-5 pb-10">
        <Card title="Data Diri">
          <div className="grid gap-x-4 gap-y-4 md:grid-cols-6">
            <Field name="fullName" label="Nama lengkap" required placeholder="Masukkan nama lengkap" className="md:col-span-3" />
            <Field name="nickname" label="Nama panggilan" required placeholder="Masukkan nama panggilan" className="md:col-span-3" />

            <div className="md:col-span-2">
              <label className="field-label">Jenis Kelamin <Required /></label>
              <div className="mt-2 flex h-9.5 items-center gap-5">
                {["Laki-laki", "Perempuan"].map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-2 text-[12px] text-[#6C7D8B]">
                    <input type="radio" name="gender" value={item} checked={gender === item} onChange={() => setGender(item)} className="radio-input" />{item}
                  </label>
                ))}
              </div>
            </div>

            <Field name="birthPlace" label="Tempat lahir" required placeholder="Masukkan tempat lahir" className="md:col-span-2" />
            <Field name="birthDate" label="Tanggal lahir" required type="date" className="md:col-span-2" />
            <Field name="nik" label="Nomor Induk Kependudukan (NIK)" required placeholder="Masukkan NIK (16 digit)" className="md:col-span-3" pattern="\d{16}" title="NIK harus 16 digit angka" />
            <FileDrop id="photo" title="Pasfoto terbaru" required hint="JPG atau PNG • Maks. 2MB" accept=".jpg,.jpeg,.png" fileName={files.photo} onChange={(e) => handleFile("photo", e)} className="md:col-span-3" />
          </div>
        </Card>

        <Card title="Kontak & Alamat">
          <TextareaField name="address" label="Alamat lengkap tempat tinggal" required placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kode Pos" />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field name="city" label="Kota / Kabupaten" required placeholder="Masukkan kota / kabupaten" />
            <Field name="province" label="Provinsi" required placeholder="Masukkan provinsi" />
            <Field name="phone" label="Nomor telepon / WhatsApp aktif" required placeholder="08XXXXXXXXXX" type="tel" />
            <Field name="email" label="Alamat email aktif" required placeholder="nama@gmail.com" type="email" />
          </div>
        </Card>

        <Card title="Pendidikan & Pekerjaan">
          <div className="grid gap-4 md:grid-cols-3">
            <SelectField name="education" label="Pendidikan terakhir" required options={["Pilih pendidikan", ...EDUCATION]} />
            <Field name="job" label="Pekerjaan saat ini" required placeholder="Contoh: Guru, Wiraswasta" />
            <Field name="club" label="Asal PB / Pengcab / Pengprov" placeholder="Opsional" />
          </div>
        </Card>

        <Card title="Lisensi & Pengalaman">
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField name="level" label="Tingkat lisensi wasit" required options={["Pilih tingkat lisensi", ...LICENSE_LEVELS]} onChange={setLevel} />
            {licensed && <Field name="licenseNumber" label="Nomor lisensi / sertifikat" required placeholder="Masukkan nomor lisensi" />}
            {licensed && <Field name="licenseIssuer" label="Penerbit lisensi" required placeholder="Contoh: PBSI Provinsi DIY" />}
            {licensed && <Field name="licenseYear" label="Tahun terbit" required placeholder="Contoh: 2022" type="number" />}
            <Field name="experienceYears" label="Lama pengalaman (tahun)" required type="number" placeholder="0" />
            <Field name="tournamentCount" label="Jumlah turnamen yang pernah dipimpin" required type="number" placeholder="0" />
          </div>

          <div className="mt-4"><TextareaField name="experience" label="Riwayat pengalaman bertugas" placeholder="Tuliskan nama turnamen, tahun, dan posisi saat bertugas (jika ada)" /></div>

          <div className="mt-5">
            <label className="field-label">Posisi yang diminati <Required /></label>
            <CheckGroup options={ROLES} selected={roles} onToggle={(v) => toggle(roles, setRoles, v)} />
          </div>
        </Card>

        <Card title="Ketersediaan">
          <label className="field-label">Hari yang tersedia <Required /></label>
          <CheckGroup options={DAYS} selected={days} onToggle={(v) => toggle(days, setDays, v)} />

          <div className="mt-5">
            <label className="field-label">Bersedia ditugaskan ke luar kota? <Required /></label>
            <div className="mt-2 flex items-center gap-5">
              {["Bersedia", "Tidak bersedia"].map((item) => (
                <label key={item} className="flex cursor-pointer items-center gap-2 text-[12px] text-[#6C7D8B]">
                  <input type="radio" name="travel" value={item} checked={travel === item} onChange={() => setTravel(item)} className="radio-input" />{item}
                </label>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Dokumen Pendukung">
          <p className="text-[11px] text-[#6C7D8B]">Unggah dokumen dalam format JPG/PNG/PDF dengan ukuran maksimal 2MB per file.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <FileDrop id="ktp" title="Scan / Foto KTP" required fileName={files.ktp} onChange={(e) => handleFile("ktp", e)} />
            <FileDrop id="license" title="Scan Sertifikat / Lisensi Wasit" required={licensed} fileName={files.license} onChange={(e) => handleFile("license", e)} />
            <FileDrop id="recommendation" title="Surat Rekomendasi (opsional)" fileName={files.recommendation} onChange={(e) => handleFile("recommendation", e)} />
          </div>
        </Card>

        <Card title="Akun Login">
          <p className="text-[11px] text-[#6C7D8B]">Akun ini dipakai untuk masuk ke portal setelah pendaftaran disetujui. Email yang dipakai sama dengan email di atas.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field name="password" label="Password" required type="password" placeholder="Minimal 8 karakter" autoComplete="new-password" />
            <Field name="confirmPassword" label="Konfirmasi password" required type="password" placeholder="Ulangi password" autoComplete="new-password" />
          </div>
        </Card>

        <Card title="Persetujuan">
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-5 text-[#687B8A]"><input type="checkbox" required className="checkbox-input" /><span>Saya menyatakan bahwa semua data yang saya isi adalah benar dan dapat dipertanggungjawabkan.</span></label>
            <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-5 text-[#687B8A]"><input type="checkbox" required className="checkbox-input" /><span>Saya bersedia mematuhi kode etik wasit dan <span className="font-semibold text-[#E50909]">Syarat & Ketentuan</span> yang berlaku.</span></label>
          </div>
        </Card>

        {error && <p role="alert" className="rounded-md border border-[#F5C2C2] bg-[#FFF5F5] px-3 py-2 text-[12px] text-[#C90000]">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-md bg-[#E50909] px-7 text-[12px] font-semibold text-white transition hover:bg-[#C90000] disabled:cursor-not-allowed disabled:opacity-70">
            <FiCheckCircle size={15} />{loading ? "Memproses..." : "Kirim Pendaftaran"}
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="relative w-full max-w-[390px] rounded-[14px] bg-white p-7 text-center shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
            <button type="button" onClick={() => setShowSuccess(false)} className="absolute right-4 top-4 text-[#8A98A4] transition hover:text-[#263D50]"><FiX size={18} /></button>
            <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#EAF8EF]"><FiCheckCircle size={34} className="text-[#20A653]" /></div>
            <h2 className="mt-5 text-[20px] font-bold text-[#263D50]">Pendaftaran Terkirim!</h2>
            <p className="mt-2 text-[12px] leading-[1.5] text-[#66798A]">Data kamu akan diverifikasi oleh pihak Shuttler. Kami akan menghubungi lewat email atau WhatsApp setelah pendaftaran disetujui.</p>
            <button type="button" onClick={() => router.push("/")} className="mt-5 h-[42px] w-full rounded-[7px] bg-[#E50909] text-[12px] font-semibold text-white transition hover:bg-[#C90707]">Selesai</button>
          </div>
        </div>
      )}
    </main>
  );
}

function Required() {
  return <span className="text-[#E50909]">*</span>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#D9E0E5] bg-white p-4 shadow-sm md:p-5">
      <h2 className="border-l-4 border-[#E50909] pl-3 text-[17px] font-bold text-[#263D50]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, className = "", required = false, ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="field-label">{label} {required && <Required />}</label>
      <input required={required} className="field-input" {...props} />
    </div>
  );
}

function SelectField({ name, label, options, required = false, onChange }: { name: string; label: string; options: string[]; required?: boolean; onChange?: (value: string) => void }) {
  return (
    <div>
      <label className="field-label">{label} {required && <Required />}</label>
      <select name={name} required={required} defaultValue="" onChange={(e) => onChange?.(e.target.value)} className="field-input cursor-pointer">
        <option value="" disabled>{options[0]}</option>
        {options.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

function TextareaField({ name, label, placeholder, required = false }: { name: string; label: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="field-label">{label} {required && <Required />}</label>
      <textarea name={name} rows={3} required={required} placeholder={placeholder} className="mt-1.5 min-h-22.5 w-full resize-none rounded-md border border-[#D7DFE5] px-3 py-2.5 text-[13px] text-[#263D50] outline-none transition focus:border-[#E50909]" />
    </div>
  );
}

function CheckGroup({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <div className="mt-2 flex flex-wrap gap-3">
      {options.map((option) => {
        const active = selected.includes(option);

        return (
          <label key={option} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-[12px] transition ${active ? "border-[#E50909] bg-[#FFF5F5] text-[#263D50]" : "border-[#D7DFE5] bg-white text-[#6C7D8B] hover:border-[#E50909]"}`}>
            <input type="checkbox" checked={active} onChange={() => onToggle(option)} className="checkbox-input" />{option}
          </label>
        );
      })}
    </div>
  );
}

function FileDrop({ id, title, required = false, fileName, accept = ".jpg,.jpeg,.png,.pdf", hint = "JPG, PNG atau PDF • Maks. 2MB", className = "", onChange }: {
  id: string; title: string; required?: boolean; fileName?: string; accept?: string; hint?: string; className?: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const selected = Boolean(fileName);

  return (
    <div className={className}>
      <p className="text-[12px] font-semibold text-[#263D50]">{title} {required && <Required />}</p>

      <label htmlFor={id} className={`mt-2 flex cursor-pointer items-center gap-3 rounded-[8px] border border-dashed p-4 transition ${selected ? "border-[#20A653] bg-[#F4FBF6]" : "border-[#CBD5DC] bg-[#FAFBFC] hover:border-[#E50909] hover:bg-[#FFF8F8]"}`}>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected ? "bg-[#EAF8EF] text-[#20A653]" : "bg-[#FFF0F0] text-[#E50909]"}`}>
          {selected ? <FiCheckCircle size={18} /> : <FiUpload size={18} />}
        </div>

        <div className="min-w-0">
          {selected ? (
            <>
              <p className="truncate text-[11px] font-semibold text-[#20A653]">{fileName}</p>
              <p className="mt-0.5 text-[9px] text-[#8A98A4]">File berhasil dipilih</p>
            </>
          ) : (
            <>
              <p className="text-[11px] font-semibold text-[#53697D]">Pilih file</p>
              <p className="mt-0.5 text-[9px] text-[#9AA7B2]">{hint}</p>
            </>
          )}
        </div>
      </label>

      <input id={id} name={id} type="file" accept={accept} required={required} onChange={onChange} className="file-input" />
    </div>
  );
}