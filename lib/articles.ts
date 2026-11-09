export type Article = {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: "atlet" | "turnamen" | "tips";
    image: string;
    sections: { heading: string; paragraphs: string[] } [];
};

export const articles: Article[] = [
  {
    slug: "anthony-ginting-perjalanan-dan-kiprah",
    title: "Anthony Sinisuka Ginting: Perjalanan dan Kiprah Sang Pebulu Tangkis Indonesia",
    description: "Salah satu pebulu tangkis tunggal putra Indonesia yang dikenal melalui gaya bermainnya yang cepat, agresif, dan penuh determinasi.",
    date: "July 31 2026",
    category: "atlet",
    image: "/ginting.jpg",
    sections: [
      { heading: "Gaya Bermain", paragraphs: [
        "Anthony dikenal dengan gaya bermain cepat, agresif, dan penuh determinasi, menjadikannya salah satu tunggal putra paling ditakuti di level internasional.",
      ]},
      { heading: "Perjalanan Karier", paragraphs: [
        "Sejak menembus level senior, Anthony konsisten tampil di berbagai turnamen besar BWF World Tour dan menyumbang banyak gelar bagi Indonesia.",
      ]},
    ],
  },
  {
    slug: "alwi-farhan-harapan-baru-tunggal-putra",
    title: "Alwi Farhan — Harapan Baru Tunggal Putra",
    description: "Alwi Farhan menjadi salah satu nama muda yang menarik perhatian dalam perkembangan tunggal putra Indonesia.",
    date: "July 29 2026",
    category: "atlet",
    image: "/alwi.jpg",
    sections: [
      { heading: "Awal Perjalanan", paragraphs: [
        "Alwi mulai menunjukkan potensinya melalui berbagai kompetisi junior. Perkembangannya semakin terlihat ketika ia mampu bersaing di turnamen internasional dan mulai mendapatkan kesempatan tampil di level senior.",
      ]},
      { heading: "Prestasi dan Perkembangan", paragraphs: [
        "Salah satu pencapaian penting Alwi adalah menjadi juara dunia junior pada 2023.",
        "Di level senior, Alwi terus mengembangkan permainan dan mental bertandingnya.",
      ]},
      { heading: "Harapan Indonesia", paragraphs: [
        "Dengan usia yang masih muda, Alwi Farhan memiliki peluang besar untuk berkembang menjadi salah satu andalan Indonesia di masa depan.",
      ]},
    ],
  },
  {
    slug: "jonatan-christie-konsistensi-di-level-dunia",
    title: "Jonatan Christie: Konsistensi di Level Dunia",
    description: "Jonatan Christie terus menunjukkan konsistensi permainan di berbagai turnamen level BWF World Tour.",
    date: "July 25 2026",
    category: "atlet",
    image: "/jonathan.jpg",
    sections: [
      { heading: "Konsistensi Performa", paragraphs: [
        "Jonatan dikenal sebagai pemain yang mampu tampil stabil di berbagai level turnamen, dari Super 500 hingga ajang multievent seperti Asian Games.",
      ]},
      { heading: "Peran di Tim Nasional", paragraphs: [
        "Selain di sektor tunggal, Jonatan juga kerap menjadi andalan Indonesia di ajang beregu seperti Piala Thomas.",
      ]},
    ],
  },
  {
    slug: "hendra-setiawan-legenda-di-lapangan",
    title: "Hendra Setiawan — Legenda di Lapangan",
    description: "Hendra Setiawan dikenal sebagai salah satu legenda ganda putra Indonesia. Teknik, ketenangan, dan pengalaman yang dimilikinya membuat namanya sangat dihormati.",
    date: "July 27 2026",
    category: "atlet",
    image: "/hendra.jpg",
    sections: [
      { heading: "Karier Panjang di Sektor Ganda", paragraphs: [
        "Hendra sudah menjalani karier panjang di sektor ganda putra, tampil bersama beberapa partner dan tetap kompetitif di level dunia hingga usia yang tidak lagi muda.",
      ]},
      { heading: "Warisan bagi Generasi Berikutnya", paragraphs: [
        "Pengalaman dan gaya bermain Hendra menjadi rujukan bagi banyak pemain ganda muda Indonesia yang sedang berkembang.",
      ]},
    ],
  },
  {
    slug: "gregoria-mariska-tunjung-tulang-punggung-tunggal-putri",
    title: "Gregoria Mariska Tunjung — Tulang Punggung Tunggal Putri",
    description: "Gregoria Mariska Tunjung tampil sebagai andalan utama sektor tunggal putri Indonesia dalam beberapa musim terakhir.",
    date: "July 23 2026",
    category: "atlet",
    image: "/gregoria.jpg",
    sections: [
      { heading: "Andalan Tunggal Putri", paragraphs: [
        "Gregoria menjadi satu-satunya wakil tunggal putri Indonesia yang konsisten menembus babak akhir turnamen level tinggi dalam beberapa tahun terakhir.",
      ]},
      { heading: "Tantangan ke Depan", paragraphs: [
        "Persaingan di sektor tunggal putri dunia semakin ketat, menuntut Gregoria terus meningkatkan variasi permainan dan daya tahan fisiknya.",
      ]},
    ],
  },
  {
    slug: "kejurda-pbsi-diy-2026",
    title: "Kejurda PBSI DIY 2026",
    description: "Kejuaraan Daerah PBSI DIY 2026 digelar sebagai ajang pencarian bibit-bibit baru pebulu tangkis dari DIY.",
    date: "July 31 2026",
    category: "turnamen",
    image: "/kejurda.png",
    sections: [
      { heading: "Tentang Turnamen", paragraphs: [
        "Kejurda PBSI DIY menjadi salah satu jenjang kompetisi daerah yang rutin digelar untuk menjaring atlet muda potensial dari Yogyakarta dan sekitarnya.",
      ]},
      { heading: "Jadwal dan Lokasi", paragraphs: [
        "Turnamen ini berlangsung pada 26–30 Agustus di Daerah Istimewa Yogyakarta, diikuti oleh berbagai klub bulu tangkis dari seluruh wilayah DIY.",
      ]},
    ],
  },
  {
    slug: "hydroplus-sirkuit-nasional-b-bengkulu",
    title: "Hydroplus Sirkuit Nasional B Bengkulu",
    description: "Sirkuit Nasional B yang digelar di Bengkulu ini menjadi bagian dari rangkaian kejuaraan berjenjang PBSI.",
    date: "July 28 2026",
    category: "turnamen",
    image: "/hydroplus.png",
    sections: [
      { heading: "Bagian dari Sirkuit Nasional", paragraphs: [
        "Turnamen ini menjadi salah satu etape dalam rangkaian Sirkuit Nasional B yang diselenggarakan PBSI di berbagai kota di Indonesia sepanjang tahun.",
      ]},
      { heading: "Peluang bagi Atlet Daerah", paragraphs: [
        "Ajang ini memberi kesempatan bagi atlet-atlet dari luar pulau Jawa untuk unjuk kemampuan tanpa harus menempuh perjalanan terlalu jauh.",
      ]},
    ],
  },
  {
    slug: "acibara-champion-cup-nusa-tenggara-barat",
    title: "Acibara Champion Cup Digelar di Nusa Tenggara Barat",
    description: "Acibara Champion Cup menjadi salah satu turnamen bulu tangkis yang rutin digelar untuk mendukung ekosistem olahraga di NTB.",
    date: "July 26 2026",
    category: "turnamen",
    image: "/acibara.png",
    sections: [
      { heading: "Mendukung Ekosistem Olahraga Daerah", paragraphs: [
        "Turnamen ini digagas untuk memperkuat ekosistem bulu tangkis di wilayah Nusa Tenggara Barat, mulai dari kategori usia dini hingga senior.",
      ]},
    ],
  },
  {
    slug: "indonesia-open-2026-panggung-utama-bulu-tangkis",
    title: "Indonesia Open 2026: Panggung Utama Bulu Tangkis Tanah Air",
    description: "Indonesia Open kembali digelar dan menjadi salah satu turnamen level Super 1000 paling bergengsi di kalender BWF.",
    date: "July 24 2026",
    category: "turnamen",
    image: "/open.jpeg",
    sections: [
      { heading: "Turnamen Level Tertinggi", paragraphs: [
        "Sebagai salah satu dari sedikit turnamen berlevel Super 1000, Indonesia Open selalu menarik partisipasi pemain-pemain terbaik dunia.",
      ]},
      { heading: "Antusiasme Penonton Tuan Rumah", paragraphs: [
        "Dukungan penonton di Istora Senayan menjadi salah satu ciri khas turnamen ini, memberi suntikan motivasi tersendiri bagi para pemain Indonesia.",
      ]},
    ],
  },
  {
    slug: "all-england-2026-sejarah-panjang",
    title: "All England 2026: Sejarah Panjang yang Terus Berlanjut",
    description: "All England Open Badminton Championships tetap menjadi salah satu turnamen tertua dan paling dihormati di dunia bulu tangkis.",
    date: "July 22 2026",
    category: "turnamen",
    image: "/england.webp",
    sections: [
      { heading: "Turnamen Tertua di Dunia", paragraphs: [
        "Digelar sejak awal abad ke-20, All England memiliki nilai sejarah dan prestise tersendiri yang berbeda dari turnamen modern lainnya.",
      ]},
    ],
  },
  {
    slug: "perkembangan-bulu-tangkis-nasional",
    title: "Perkembangan Bulu Tangkis Nasional Indonesia",
    description: "Bulu tangkis merupakan salah satu cabang olahraga yang memiliki tempat istimewa di Indonesia.",
    date: "July 31 2026",
    category: "tips",
    image: "/badminton.jpg",
    sections: [
      { heading: "Akar Budaya Olahraga", paragraphs: [
        "Bulu tangkis merupakan salah satu cabang olahraga yang memiliki tempat istimewa di hati masyarakat Indonesia.",
      ]},
      { heading: "Regenerasi Atlet", paragraphs: [
        "Pembinaan usia dini melalui klub-klub daerah menjadi kunci menjaga kesinambungan prestasi bulu tangkis nasional dari generasi ke generasi.",
      ]},
    ],
  },
  {
    slug: "teknik-smash-efektif-untuk-pemula",
    title: "Teknik Smash yang Efektif untuk Pemula",
    description: "Smash merupakan salah satu pukulan andalan dalam bulu tangkis. Posisi tubuh dan timing jadi kunci utamanya.",
    date: "July 29 2026",
    category: "tips",
    image: "/smash.jpeg",
    sections: [
      { heading: "Posisi Tubuh yang Benar", paragraphs: [
        "Sebelum melakukan smash, posisi kaki dan bahu yang tepat membantu menghasilkan pukulan yang lebih bertenaga dan terarah.",
      ]},
      { heading: "Timing Pukulan", paragraphs: [
        "Ketepatan waktu memukul shuttlecock saat berada di titik tertinggi sangat menentukan kecepatan dan sudut jatuhnya smash.",
      ]},
    ],
  },
  {
    slug: "cara-membaca-pola-permainan-lawan",
    title: "Cara Membaca Pola Permainan Lawan",
    description: "Kemampuan membaca pola permainan lawan menjadi salah satu kunci kemenangan di level kompetitif.",
    date: "July 27 2026",
    category: "tips",
    image: "/pola.jpg",
    sections: [
      { heading: "Mengamati Kebiasaan Lawan", paragraphs: [
        "Setiap pemain punya kecenderungan pukulan tertentu; mengenali pola ini sejak awal pertandingan bisa jadi keuntungan besar.",
      ]},
      { heading: "Menyesuaikan Strategi", paragraphs: [
        "Setelah pola lawan terbaca, pemain perlu cepat menyesuaikan strategi permainan agar tidak mudah diprediksi balik.",
      ]},
    ],
  },
  {
    slug: "latihan-footwork-meningkatkan-kecepatan",
    title: "Latihan Footwork untuk Meningkatkan Kecepatan",
    description: "Footwork yang baik memungkinkan pemain bergerak lebih efisien ke seluruh area lapangan.",
    date: "July 25 2026",
    category: "tips",
    image: "/footwork.jpg",
    sections: [
      { heading: "Pentingnya Footwork", paragraphs: [
        "Footwork yang efisien mengurangi tenaga yang terbuang saat berpindah posisi, sehingga pemain bisa bertahan lebih lama dalam reli panjang.",
      ]},
      { heading: "Latihan Dasar", paragraphs: [
        "Latihan bayangan (shadow footwork) secara rutin membantu membentuk refleks perpindahan langkah yang lebih cepat dan otomatis.",
      ]},
    ],
  },
  {
    slug: "menjaga-stamina-saat-pertandingan-lama",
    title: "Menjaga Stamina Saat Pertandingan Berlangsung Lama",
    description: "Pertandingan yang berjalan alot membutuhkan daya tahan fisik dan mental yang prima.",
    date: "July 23 2026",
    category: "tips",
    image: "/stamina.jpg",
    sections: [
      { heading: "Persiapan Fisik", paragraphs: [
        "Latihan kardio dan kekuatan otot secara rutin di luar sesi teknik menjadi fondasi penting untuk menjaga stamina di game ketiga.",
      ]},
      { heading: "Manajemen Mental", paragraphs: [
        "Selain fisik, ketenangan mental saat tertinggal poin di pertandingan panjang sering kali menjadi penentu hasil akhir.",
      ]},
    ],
  },
];