import { TurnamenApi } from "@/lib/tournamentsApi";

interface TournamentInfoProps {
  tournament: TurnamenApi;
}

const sektorMap: Record<string, string> = {
  MS: "Tunggal Putra",
  WS: "Tunggal Putri",
  MD: "Ganda Putra",
  WD: "Ganda Putri",
  XD: "Ganda Campuran",
};

function formatDate(date: string) {
  if (!date) return "-";

  return new Date(`${date.slice(0, 10)}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function TournamentInfo({ tournament }: TournamentInfoProps) {
  return (
    <section className="mx-auto w-full max-w-7xl rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.10)] sm:p-6 md:p-8 lg:p-9">
      <h2 className="border-b border-[#A5A5A5] pb-3 text-base font-bold text-[#914747]">
        {tournament.nama}
      </h2>

      <div className="grid grid-cols-1 gap-10 py-6 sm:py-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="text-base font-bold text-[#263D50]">
            DETAIL KEJUARAAN
          </h3>

          <div className="mt-5 space-y-3 text-xs text-[#52616D]">
            <InfoRow label="Nama Kejuaraan" value={tournament.nama} />
            <InfoRow label="Kode" value={String(tournament.id)} />
            <InfoRow
              label="Tanggal Kejuaraan"
              value={`${formatDate(tournament.tanggal_mulai)} - ${formatDate(tournament.tanggal_berakhir)}`}
            />
            <InfoRow
              label="Alamat"
              value={tournament.alamat || tournament.venue || "-"}
            />
            <InfoRow label="Negara" value="Indonesia" />
            <InfoRow label="Telp" value={tournament.tlp || "-"} />
            <InfoRow label="Email" value={tournament.email || "-"} />
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#263D50]">
            ATURAN PENDAFTARAN
          </h3>

          <div className="mt-5 space-y-3 text-xs text-[#52616D]">
            <InfoRow
              label="Mulai Pendaftaran"
              value={formatDate(tournament.start_regist)}
            />

            <InfoRow
              label="Akhir Pendaftaran"
              value={formatDate(tournament.end_regist)}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-base font-bold text-[#263D50]">
          Golongan Pertandingan
        </h3>

        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.14)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs text-[#52616D]">
              <thead>
                <tr className="border-b border-[#A5A5A5]">
                  <th className="px-5 py-3.5 text-left font-bold text-[#263D50]">
                    KODE
                  </th>
                  <th className="px-5 py-3.5 text-left font-bold text-[#263D50]">
                    GOLONGAN
                  </th>
                  <th className="px-5 py-3.5 text-left font-bold text-[#263D50]">
                    BIAYA PENDAFTARAN
                  </th>
                  <th className="px-5 py-3.5 text-center font-bold text-[#263D50]">
                    ATLET MENDAFTAR
                  </th>
                </tr>
              </thead>

              <tbody>
                {tournament.kelas_turnamen?.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#D9DDE0] last:border-b-0"
                  >
                    <td className="px-5 py-3.5">{item.sektor}</td>
                    <td className="px-5 py-3.5">
                      {sektorMap[item.sektor]} - {item.kategori_usia}
                    </td>
                    <td className="px-5 py-3.5">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(item.harga)}
                    </td>
                    <td className="px-5 py-3.5 text-center font-medium">-</td>
                  </tr>
                ))}

                {(!tournament.kelas_turnamen ||
                  tournament.kelas_turnamen.length === 0) && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-6 text-center text-[#9BA3AA]"
                    >
                      Belum ada golongan pertandingan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_20px_1fr]">
      <span>{label}</span>
      <span>:</span>
      <span className="break-words">{value}</span>
    </div>
  );
}
