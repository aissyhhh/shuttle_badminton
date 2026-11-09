import Image from "next/image";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { BsCoin } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Tournament } from "@/lib/tournaments";

interface RegistrationSidebarProps {tournament: Tournament}

export function RegistrationSidebar({ tournament }: RegistrationSidebarProps) {
  const eventInfo = [
    {
      icon: <MdOutlineCalendarMonth size={18} />,
      text: tournament.date,
    },
    {
      icon: <SlLocationPin size={18} />,
      text: tournament.location,
    },
    {
      icon: <GoPeople size={18} />,
      text: tournament.registration?.region
        ? `Peserta dari ${tournament.registration.region}`
        : "Peserta sesuai kategori turnamen",
    },
    {
      icon: <BsCoin size={18} />,
      text: tournament.classes?.length
        ? "Biaya pendaftaran tersedia pada kategori pertandingan"
        : "Biaya pendaftaran mengikuti ketentuan turnamen",
    },
  ];

  const documents = [
    "Identitas diri peserta",
    "Pas foto terbaru",
    "Dokumen pendukung sesuai ketentuan",
  ];

  const terms = [
    "Peserta merupakan atlet sesuai kategori yang telah ditentukan.",
    "Pendaftaran dilakukan secara online melalui website resmi.",
    "Setiap peserta wajib melengkapi seluruh data dan dokumen yang diminta.",
    "Biaya pendaftaran mengikuti ketentuan turnamen.",
    "Keputusan panitia bersifat mutlak dan tidak dapat diganggu gugat.",
  ];

  return (
    <aside className="space-y-4">
      <div className="rounded-[12px] border border-[#D5DCE2] bg-white p-4 shadow-sm">
        <div className="flex h-[125px] items-center justify-center overflow-hidden rounded-[8px] border border-[#DDE3E8]">
          <Image src={tournament.image} alt={tournament.name} width={280} height={125} className="h-full w-full object-contain" />
        </div>

        <h2 className="mt-4 text-[17px] font-bold text-[#53697D]">
          Informasi Event
        </h2>

        <div className="mt-4 space-y-3">
          {eventInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-[#66798A]">
              <span className="shrink-0 text-[#E50909]">
                {item.icon}
              </span>

              <p className="text-[11px] leading-[1.4]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[8px] bg-[#FFF0F0] p-3">
          <div className="flex items-start gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E50909] text-[11px] font-bold text-white">
              i
            </span>

            <p className="text-[11px] leading-[1.45] text-[#E50909]">
              Pendaftaran hanya dapat dilakukan melalui form ini. Pastikan data yang diisi sudah benar dan lengkap.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[12px] border border-[#D5DCE2] bg-white p-4 shadow-sm">
        <h2 className="text-[17px] font-bold text-[#53697D]">
          Dokumen yang diperlukan
        </h2>

        <div className="mt-5 space-y-3">
          {documents.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <IoMdCheckmarkCircleOutline size={17} className="shrink-0 text-[#E50909]" />

              <p className="text-[10px] leading-[1.4] text-[#66798A]">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[8px] bg-[#FFF0F0] p-3">
          <div className="flex items-start gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E50909] text-[11px] font-bold text-white">
              i
            </span>

            <p className="text-[11px] leading-[1.45] text-[#E50909]">
              Pastikan file yang diunggah dalam format JPG/PNG/PDF dengan ukuran maksimal 2MB per file.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[12px] border border-[#D5DCE2] bg-white p-4 shadow-sm">
        <h2 className="text-[17px] font-bold text-[#53697D]">
          Syarat & Ketentuan
        </h2>

        <div className="mt-5 space-y-3">
          {terms.map((item, index) => (
            <div key={item} className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0] text-[9px] font-bold text-[#E50909]">
                {index + 1}
              </span>

              <p className="text-[10px] leading-[1.4] text-[#66798A]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}