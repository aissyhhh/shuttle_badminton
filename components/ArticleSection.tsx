"use client";

import { useState } from "react";
import { ArticleFilter } from "./ArticleFilter";
import { ArticleList } from "./ArticleList";
import { Pagination } from "./Pagination";

const articles = [
  { image: "/ginting.jpg", title: "Anthony Sinisuka Ginting: Perjalanan dan Kiprah Sang Pebulu Tangkis Indonesia", description: "Anthony Sinisuka Ginting merupakan salah satu pebulu tangkis tunggal putra Indonesia yang dikenal melalui gaya bermainnya yang cepat, agresif, dan penuh determinasi.", date: "July 31 2026", category: "atlet" },
  { image: "/alwi.jpg", title: "Alwi Farhan — Harapan Baru Tunggal Putra", description: "Alwi Farhan menjadi salah satu nama muda yang menarik perhatian dalam perkembangan tunggal putra Indonesia.", date: "July 29 2026", category: "atlet" },
  { image: "/hendra.jpg", title: "Hendra Setiawan — Legenda di Lapangan", description: "Hendra Setiawan dikenal sebagai salah satu legenda ganda putra Indonesia. Teknik, ketenangan, dan pengalaman yang dimilikinya membuat namanya sangat dihormati.", date: "July 27 2026", category: "atlet" },
  { image: "/jonathan.jpg", title: "Jonatan Christie: Konsistensi di Level Dunia", description: "Jonatan Christie terus menunjukkan konsistensi permainan di berbagai turnamen level BWF World Tour.", date: "July 25 2026", category: "atlet" },
  { image: "/gregoria.jpg", title: "Gregoria Mariska Tunjung — Tulang Punggung Tunggal Putri", description: "Gregoria Mariska Tunjung tampil sebagai andalan utama sektor tunggal putri Indonesia dalam beberapa musim terakhir.", date: "July 23 2026", category: "atlet" },

  { image: "/kejurda.png", title: "Kejurda PBSI DIY 2026", description: "Kejuaraan Daerah PBSI DIY 2026 digelar sebagai ajang pencarian bibit-bibit baru pebulu tangkis dari DIY.", date: "July 31 2026", category: "turnamen" },
  { image: "/hydroplus.png", title: "Hydroplus Sirkuit Nasional B Bengkulu", description: "Sirkuit Nasional B yang digelar di Bengkulu ini menjadi bagian dari rangkaian kejuaraan berjenjang PBSI.", date: "July 28 2026", category: "turnamen" },
  { image: "/acibara.png", title: "Acibara Champion Cup Digelar di Nusa Tenggara Barat", description: "Acibara Champion Cup menjadi salah satu turnamen bulu tangkis yang rutin digelar untuk mendukung ekosistem olahraga di NTB.", date: "July 26 2026", category: "turnamen" },
  { image: "/open.jpeg", title: "Indonesia Open 2026: Panggung Utama Bulu Tangkis Tanah Air", description: "Indonesia Open kembali digelar dan menjadi salah satu turnamen level Super 1000 paling bergengsi di kalender BWF.", date: "July 24 2026", category: "turnamen" },
  { image: "/england.webp", title: "All England 2026: Sejarah Panjang yang Terus Berlanjut", description: "All England Open Badminton Championships tetap menjadi salah satu turnamen tertua dan paling dihormati di dunia bulu tangkis.", date: "July 22 2026", category: "turnamen" },

  { image: "/badminton.jpg", title: "Perkembangan Bulu Tangkis Nasional Indonesia", description: "Bulu tangkis merupakan salah satu cabang olahraga yang memiliki tempat istimewa di Indonesia.", date: "July 31 2026", category: "tips" },
  { image: "/smash.jpeg", title: "Teknik Smash yang Efektif untuk Pemula", description: "Smash merupakan salah satu pukulan andalan dalam bulu tangkis. Posisi tubuh dan timing jadi kunci utamanya.", date: "July 29 2026", category: "tips" },
  { image: "/pola.jpg", title: "Cara Membaca Pola Permainan Lawan", description: "Kemampuan membaca pola permainan lawan menjadi salah satu kunci kemenangan di level kompetitif.", date: "July 27 2026", category: "tips" },
  { image: "/footwork.jpg", title: "Latihan Footwork untuk Meningkatkan Kecepatan", description: "Footwork yang baik memungkinkan pemain bergerak lebih efisien ke seluruh area lapangan.", date: "July 25 2026", category: "tips" },
  { image: "/stamina.jpg", title: "Menjaga Stamina Saat Pertandingan Berlangsung Lama", description: "Pertandingan yang berjalan alot membutuhkan daya tahan fisik dan mental yang prima.", date: "July 23 2026", category: "tips" },
];

const PAGE_SIZE = 9;

export function ArticleSection() {
  const [category, setCategory] = useState("semua");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = articles.filter((item) => {
    const matchCategory = category === "semua" || item.category === category;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedItems = filtered.slice(start, start + PAGE_SIZE);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-[1376px] px-8 py-13">
      <ArticleFilter 
        category={category}
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={handleSearchChange}
      />
      <ArticleList items={paginatedItems} />
      <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}