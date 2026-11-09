"use client";

import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { useRouter, useParams } from "next/navigation";

type RegistrationType = "tunggal" | "ganda";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const TYPE_OPTIONS: { value: RegistrationType; label: string; hint: string }[] = [
  { value: "tunggal", label: "Tunggal", hint: "1 pemain" },
  { value: "ganda", label: "Ganda", hint: "2 pemain" },
];

const SECTOR_OPTIONS: Record<RegistrationType, string[]> = {
  tunggal: ["Pilih Sektor", "Tunggal Putra", "Tunggal Putri"],
  ganda: ["Pilih Sektor", "Ganda Putra", "Ganda Putri", "Ganda Campuran"],
};

type Member = {
  id: string;
  gender: string;
  files: Record<string, string>;
};

const firstMember = (): Member => ({ id: "member-0", gender: "", files: {} });

const newMember = (): Member => ({
  id: crypto.randomUUID(),
  gender: "",
  files: {},
});

function resizeMembers(members: Member[], target: number): Member[] {
  if (members.length === target) return members;
  if (members.length > target) return members.slice(0, target);
  return [...members, ...Array.from({ length: target - members.length }, newMember)];
}

export function RegistrationForm() {
  const [type, setType] = useState<RegistrationType>("tunggal");
  const [members, setMembers] = useState<Member[]>([firstMember()]);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const lastStep = members.length - 1;
  const isLast = step === lastStep;

  function goTo(next: number) {
    setStep(next);
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(index: number): boolean {
    const container = formRef.current?.querySelector<HTMLElement>(`[data-step="${index}"]`);

    if (container) {
      const fields = Array.from(container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));

      for (const field of fields) {
        if (!field.checkValidity()) {
          field.reportValidity();
          return false;
        }
      }
    }

    const member = members[index];
    if (member && !member.gender) {
      setError(`Jenis kelamin peserta ${index + 1} belum dipilih.`);
      return false;
    }

    setError("");
    return true;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    goTo(step + 1);
  }

  function handleBack() {
    goTo(step - 1);
  }

  function handleTypeChange(next: RegistrationType) {
    setType(next);
    setStep(0);
    setError("");

    setMembers((prev) => resizeMembers(prev, next === "ganda" ? 2 : 1));
  }

  function setGender(id: string, gender: string) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, gender } : m)));
  }

  function setFile(id: string, key: string, name: string) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, files: { ...m.files, [key]: name } } : m)));
  }

  function buildQuery(): string {
    const form = formRef.current;
    const query = new URLSearchParams();

    query.set("tipe", type);

    const sector = form?.querySelector<HTMLSelectElement>('select[name="sector"]')?.value;
    if (sector) query.set("sektor", sector);

    const age = form?.querySelector<HTMLSelectElement>('select[name="umur"]')?.value;
    if (age) query.set("umur", age);

    members.forEach((_, i) => {
      const name = form?.querySelector<HTMLInputElement>(`[data-step="${i}"] input[name="fullName"]`)?.value.trim();
      query.append("peserta", name || `Peserta ${i + 1}`);
    });

    return query.toString();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLast) {
      handleNext();
      return;
    }

    if (!validateStep(step)) return;

    if (type === "ganda" && members.length !== 2) {
      setError("Pendaftaran ganda harus terdiri dari 2 peserta.");
      return;
    }

    const missing = members.findIndex((m) => !m.gender);
    if (missing !== -1) {
      goTo(missing);
      setError(`Jenis kelamin peserta ${missing + 1} belum dipilih.`);
      return;
    }
    router.push(`/payment/${slug}?${buildQuery()}`);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="rounded-[14px] border border-[#D9E0E5] bg-white p-4 shadow-sm md:p-5">
        <div className="mb-5">
          <h1 className="text-[18px] font-bold text-[#263D50]">Formulir Pendaftaran Peserta</h1>
          <p className="mt-1 text-[10px] text-[#81909D]">Lengkapi data di bawah ini dengan benar sesuai dokumen resmi.</p>
        </div>

        <Stepper labels={members.map((_, i) => `Pemain ${i + 1}`)} current={step} />

        {members.map((member, index) => (
          <div key={member.id} data-step={index} hidden={index !== step} className="space-y-5">
            {index === 0 && <JenisSection type={type} onTypeChange={handleTypeChange} />}

            <MemberCard index={index} total={members.length} member={member} onGenderChange={(g) => setGender(member.id, g)} onFileChange={(key, name) => setFile(member.id, key, name)} />

            {index === lastStep && (
              <>
                <ContactSection />
                <ConsentSection />
              </>
            )}
          </div>
        ))}

        {error && (
          <p role="alert" className="mt-5 rounded-md border border-[#F5C2C2] bg-[#FFF5F5] px-3 py-2 text-[12px] text-[#C90000]">
            {error}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button key="back" type="button" onClick={handleBack} className="inline-flex h-10 items-center gap-2 rounded-md border border-[#D7DFE5] bg-white px-5 text-[12px] font-semibold text-[#53697D] transition hover:border-[#E50909] hover:text-[#E50909]">
              <FiArrowLeft size={15} />
              Kembali
            </button>
          ) : (
            <span />
          )}

          {isLast ? (
            <button key="submit" type="submit" className="inline-flex h-10 items-center gap-2 rounded-md bg-[#E50909] px-7 text-[12px] font-semibold text-white transition hover:bg-[#C90000]">
              <FiCheckCircle size={15} />
              Kirim Pendaftaran
            </button>
          ) : (
            <button key="next" type="button" onClick={handleNext} className="inline-flex h-10 items-center gap-2 rounded-md bg-[#E50909] px-7 text-[12px] font-semibold text-white transition hover:bg-[#C90000]">
              Lanjut ke Pemain {step + 2}
              <FiArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
} 

function Stepper({ labels, current }: { labels: string[]; current: number }) {
  return (
    <ol className="mb-5 flex items-center overflow-x-auto pb-1">
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <li key={i} className="flex items-center">
            <div className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${done || active ? "bg-[#E50909] text-white" : "border border-[#D7DFE5] bg-white text-[#81909D]"}`}>
                {done ? <FiCheck size={14} /> : i + 1}
              </span>

              <span className={`whitespace-nowrap text-[12px] ${active ? "font-semibold text-[#263D50]" : "text-[#81909D]"}`}>{label}</span>
            </div>

            {i < labels.length - 1 && <span className={`mx-3 h-px w-8 shrink-0 md:w-14 ${done ? "bg-[#E50909]" : "bg-[#D7DFE5]"}`} />}
          </li>
        );
      })}
    </ol>
  );
}

function JenisSection({ type, onTypeChange }: { type: RegistrationType; onTypeChange: (next: RegistrationType) => void }) {
  return (
    <section className="rounded-xl border border-[#D9E0E5] bg-white p-4 md:p-5">
      <SectionTitle title="Jenis Pendaftaran" />

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {TYPE_OPTIONS.map((option) => {
          const active = type === option.value;

          return (
            <label key={option.value} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition ${active ? "border-[#E50909] bg-[#FFF5F5]" : "border-[#D7DFE5] bg-white hover:border-[#E50909]"}`}>
              <input type="radio" name="registration-type" value={option.value} checked={active} onChange={() => onTypeChange(option.value)} className="radio-input" />
              <span>
                <span className="block text-[12px] font-semibold text-[#263D50]">{option.label}</span>
                <span className="block text-[10px] text-[#81909D]">{option.hint}</span>
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SelectField key={type} name="sector" label="Sektor yang didaftarkan" required options={SECTOR_OPTIONS[type]} />
        <SelectField name="umur" label="Kategori kelompok umur" required options={["Pilih kategori", "Senior", "Junior"]} />
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="rounded-xl border border-[#D9E0E5] bg-white p-4 md:p-5">
      <SectionTitle title="Data Kontak & Alamat" />
      <div className="mt-5">
        <label className="field-label">
          Alamat lengkap tempat tinggal <Required />
        </label>
        <textarea rows={3} required
          placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Provinsi, Kode Pos"
          className="mt-1.5 min-h-18.75 w-full resize-none rounded-md border border-[#D7DFE5] px-3 py-2.5 text-[13px] text-[#263D50] outline-none transition focus:border-[#E50909]"
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Nomor telepon / WhatsApp aktif" required placeholder="08XXXXXXXXXX" type="tel" />
        <Field label="Alamat email aktif" required placeholder="nama@gmail.com" type="email" />
      </div>
    </section>
  );
}

function ConsentSection() {
  return (
    <section className="rounded-xl border border-[#D9E0E5] bg-white p-4 md:p-5">
      <SectionTitle title="Persetujuan" />

      <div className="mt-4 space-y-3">
        <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-5 text-[#687B8A]">
          <input type="checkbox" required className="checkbox-input" />
          <span>Saya menyatakan bahwa semua data yang saya isi adalah benar dan dapat dipertanggungjawabkan.</span>
        </label>

        <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-5 text-[#687B8A]">
          <input type="checkbox" required className="checkbox-input" />
          <span>
            Saya telah membaca dan menyetujui <span className="font-semibold text-[#E50909]">Syarat & Ketentuan</span> yang berlaku.
          </span>
        </label>
      </div>
    </section>
  );
}

function MemberCard({ index, total, member, onGenderChange, onFileChange }: { index: number; total: number; member: Member; onGenderChange: (gender: string) => void; onFileChange: (key: string, fileName: string) => void }) {
  function handleFile(key: string, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      onFileChange(key, "");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran file maksimal 2MB.");
      event.target.value = "";
      onFileChange(key, "");
      return;
    }
    onFileChange(key, file.name);
  }

  const genderName = `gender-${member.id}`;

  return (
    <section className="rounded-xl border border-[#D9E0E5] bg-white p-4 md:p-5">
      <SectionTitle title={`Data Pemain ${index + 1}`} />
      {total > 1 && (
        <p className="mt-1 pl-4 text-[11px] text-[#81909D]">
          Pemain {index + 1} dari {total}
        </p>
      )}

      <SubTitle title="Data diri" first />
      <div className="mt-3 grid gap-x-4 gap-y-4 md:grid-cols-6">
        <Field name="fullName" label="Nama lengkap" required placeholder="Masukan nama lengkap" className="md:col-span-2" />
        <Field label="Nama panggilan" required placeholder="Masukkan nama panggilan" className="md:col-span-2" />

        <div className="md:col-span-2">
          <label className="field-label">
            Jenis Kelamin <Required />
          </label>

          <div className="mt-2 flex h-9.5 items-center gap-5">
            <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#6C7D8B]">
              <input type="radio" name={genderName} value="laki-laki" checked={member.gender === "laki-laki"} onChange={(e) => onGenderChange(e.target.value)} className="radio-input" />
              Laki-laki
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#6C7D8B]">
              <input type="radio" name={genderName} value="perempuan" checked={member.gender === "perempuan"} onChange={(e) => onGenderChange(e.target.value)} className="radio-input" />
              Perempuan
            </label>
          </div>
        </div>

        <Field label="Tempat lahir" required placeholder="Masukan tempat lahir" className="md:col-span-3" />
        <Field label="Tanggal lahir" required type="date" className="md:col-span-3" />
        <Field label="Nomor Induk Kependudukan (NIK)" required placeholder="Masukan NIK (16 Digit)" className="md:col-span-3" />
        <FileDrop id={`${member.id}-pasfoto`} title="Pasfoto terbaru" hint="JPG atau PNG • Maks. 2MB" accept=".jpg,.jpeg,.png" required fileName={member.files.pasfoto} onChange={(e) => handleFile("pasfoto", e)} className="md:col-span-3" />
      </div>

      <SubTitle title="Pendidikan & klub" />
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <Field label="Nama sekolah saat ini" required placeholder="Masukkan nama sekolah" />
        <Field label="Tingkat / Kelas" required placeholder="Contoh: Kelas 7 SMP" />
        <Field label="Nama Klub / PB" placeholder="Masukkan nama klub (opsional)" />
        <Field label="Nama pelatih / penanggung jawab" placeholder="Masukkan nama pelatih (opsional)" />
      </div>

      <SubTitle title="Orang tua / wali" />
      <div className="mt-3 space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Nama lengkap ayah" required placeholder="Masukkan nama ayah" />
          <Field label="Pekerjaan ayah" required placeholder="Masukkan pekerjaan ayah" />
          <Field label="Nomor telepon ayah" required placeholder="08XXXXXXXXXX" type="tel" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Nama lengkap ibu / wali" required placeholder="Masukkan nama ibu / wali" />
          <Field label="Pekerjaan ibu / wali" required placeholder="Masukkan pekerjaan ibu / wali" />
          <Field label="Nomor telepon ibu / wali" required placeholder="08XXXXXXXXXX" type="tel" />
        </div>
      </div>

      <SubTitle title="Prestasi bulutangkis (jika ada)" />
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <TextareaField label="Riwayat kejuaraan yang telah diikuti" placeholder="Tuliskan riwayat kejuaraan (jika ada)" />
        <TextareaField label="Peringkat atau pencapaian tertinggi" placeholder="Contoh: Juara 1 Kejuaraan, Semifinal, dll." />
      </div>

      <SubTitle title="Dokumen pendukung" />
      <p className="mt-2 text-[11px] text-[#6C7D8B]">Unggah dokumen dalam format JPG/PNG/PDF dengan ukuran maksimal 2MB per file.</p>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <FileDrop id={`${member.id}-akta`} title="Scan / Foto Akta Kelahiran" required fileName={member.files.akta} onChange={(e) => handleFile("akta", e)} />
        <FileDrop id={`${member.id}-kk`} title="Scan / Foto Kartu Keluarga (KK)" required fileName={member.files.kk} onChange={(e) => handleFile("kk", e)} />
        <FileDrop id={`${member.id}-foto`} title="Pasfoto / Foto seluruh badan" required fileName={member.files.foto} onChange={(e) => handleFile("foto", e)} />
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="border-l-4 border-[#E50909] pl-3 text-[17px] font-bold text-[#263D50]">{title}</h2>;
}

function SubTitle({ title, first = false }: { title: string; first?: boolean }) {
  return <h3 className={`text-[13px] font-semibold text-[#263D50] ${first ? "mt-5" : "mt-6 border-t border-[#E6EBEF] pt-4"}`}>{title}</h3>;
}

function Required() {
  return <span className="text-[#E50909]">*</span>;
}

function Field({ name, label, placeholder, type = "text", required = false, className = "" }: { name?: string; label: string; placeholder?: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="field-label">
        {label} {required && <Required />}
      </label>

      <input name={name} type={type} placeholder={placeholder} required={required} className="field-input" />
    </div>
  );
}

function SelectField({ name, label, options, required = false, className = "" }: { name?: string; label: string; options: string[]; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="field-label">
        {label} {required && <Required />}
      </label>

      <select name={name} required={required} defaultValue="" className="field-input cursor-pointer">
        <option value="" disabled>
          {options[0]}
        </option>

        {options.slice(1).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div>
      <label className="field-label">{label}</label>

      <textarea rows={3} placeholder={placeholder} className="mt-1.5 min-h-22.5 w-full resize-none rounded-md border border-[#D7DFE5] px-3 py-2.5 text-[13px] text-[#263D50] outline-none transition focus:border-[#E50909]" />
    </div>
  );
}

function FileDrop({
  id,
  title,
  required = false,
  fileName,
  accept = ".jpg,.jpeg,.png,.pdf",
  hint = "JPG, PNG atau PDF • Maks. 2MB",
  className = "",
  onChange,
}: {
  id: string;
  title: string;
  required?: boolean;
  fileName?: string;
  accept?: string;
  hint?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const selected = Boolean(fileName);

  return (
    <div className={className}>
      <p className="text-[12px] font-semibold text-[#263D50]">
        {title} {required && <Required />}
      </p>

      <label htmlFor={id} className={`mt-2 flex cursor-pointer items-center gap-3 rounded-[8px] border border-dashed p-4 transition ${selected ? "border-[#20A653] bg-[#F4FBF6]" : "border-[#CBD5DC] bg-[#FAFBFC] hover:border-[#E50909] hover:bg-[#FFF8F8]"}`}>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected ? "bg-[#EAF8EF] text-[#20A653]" : "bg-[#FFF0F0] text-[#E50909]"}`}>{selected ? <FiCheckCircle size={18} /> : <FiUpload size={18} />}</div>

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

      <input id={id} type="file" accept={accept} required={required} onChange={onChange} className="file-input" />
    </div>
  );
}