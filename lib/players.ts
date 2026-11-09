export type PlayerCategory =
  | "tunggal-putra"
  | "tunggal-putri"
  | "ganda-putra"
  | "ganda-putri"
  | "ganda-campuran";

export interface Player {
  id: string;
  name: string;
  image: string;
  country: string;
  category: PlayerCategory;

  worldRank?: number;
  tournaments?: number;
  points?: string;

  nextMatch?: {
    opponent: string;
    tournament: string;
    date: string;
  };

  previousMatch?: {
    opponent: string;
    tournament: string;
    date: string;
    result: string;
  };

  tournamentHistory?: {
    tournament: string;
    date: string;
    result: string;
    position: string;
    year: number;
  }[];
}

export const players: Player[] = [

  // =====================================================
  // TUNGGAL PUTRA - BADMINTON
  // =====================================================

  {
    id: "anthony-ginting",
    name: "Anthony Sinisuka Ginting",
    image: "/p-ginting.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 2,
    tournaments: 18,
    points: "82,450",

    nextMatch: {
      opponent: "Alwi Farhan",
      tournament: "Kejurda PBSI DIY 2026",
      date: "29 Agustus 2026",
    },

    previousMatch: {
      opponent: "Alwi Farhan",
      tournament: "Kejurda PBSI DIY 2026",
      date: "29 Agustus 2026",
      result: "Menang",
    },

    tournamentHistory: [
      {
        tournament: "Indonesia Open 2026",
        date: "31 Juli 2026",
        result: "Kalah",
        position: "Semi Final",
        year: 2026,
      },
      {
        tournament: "Indonesia Masters 2026",
        date: "18 Juni 2026",
        result: "Menang",
        position: "Juara",
        year: 2026,
      },
      {
        tournament: "Malaysia Open 2026",
        date: "10 Januari 2026",
        result: "Kalah",
        position: "Quarter Final",
        year: 2026,
      },
    ],
  },

  {
    id: "jonatan-christie",
    name: "Jonatan Christie",
    image: "/p-jonathan.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
    

    worldRank: 1,
    tournaments: 18,
    points: "87,631",
  },

  {
    id: "alwi-farhan",
    name: "Alwi Farhan",
    image: "/p-alwi.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 5,
    tournaments: 15,
    points: "42,320",
  },

  {
    id: "chico-aura-dwi-wardoyo",
    name: "Chico Aura Dwi Wardoyo",
    image: "/p-chico.png",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 8,
    tournaments: 16,
    points: "39,850",
  },

  {
    id: "shesar-hiren-rustavito",
    name: "Shesar Hiren Rustavito",
    image: "/p-shesar.png",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 12,
    tournaments: 14,
    points: "34,720",
  },

  {
    id: "taufik-hidayat",
    name: "Taufik Hidayat",
    image: "/p-taufik.png",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 15,
    tournaments: 12,
    points: "31,450",
  },

  {
    id: "budi-santoso",
    name: "Budi Santoso",
    image: "/p-budi.png",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 18,
    tournaments: 11,
    points: "29,830",
  },

  {
    id: "dimas-pratama",
    name: "Dimas Pratama",
    image: "/p-dimas.png",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 21,
    tournaments: 10,
    points: "27,640",
  },

  {
    id: "reza-maulana",
    name: "Reza Maulana",
    image: "/reza.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 24,
    tournaments: 10,
    points: "25,920",
  },

  {
    id: "arya-nugraha",
    name: "Arya Nugraha",
    image: "/arya.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 27,
    tournaments: 9,
    points: "24,510",
  },

  {
    id: "rizky-fauzan",
    name: "Rizky Fauzan",
    image: "/rizky.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 30,
    tournaments: 9,
    points: "22,870",
  },

  {
    id: "galih-permana",
    name: "Galih Permana",
    image: "/galih.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 33,
    tournaments: 8,
    points: "21,430",
  },

  {
    id: "ilham-akbar",
    name: "Ilham Akbar",
    image: "/ilham.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 36,
    tournaments: 8,
    points: "20,180",
  },

  {
    id: "farhan-aziz",
    name: "Farhan Aziz",
    image: "/farhan.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 39,
    tournaments: 7,
    points: "18,950",
  },

  {
    id: "yoga-pratama",
    name: "Yoga Pratama",
    image: "/yoga.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 42,
    tournaments: 7,
    points: "17,820",
  },

  {
    id: "raka-wijaya",
    name: "Raka Wijaya",
    image: "/raka.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 45,
    tournaments: 6,
    points: "16,740",
  },

  {
    id: "andika-putra",
    name: "Andika Putra",
    image: "/andika.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 48,
    tournaments: 6,
    points: "15,630",
  },

  {
  id: "rafi-maulana",
  name: "Rafi Maulana",
  image: "/rafi.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 51,
  tournaments: 6,
  points: "15,120",
},

{
  id: "aditya-prakoso",
  name: "Aditya Prakoso",
  image: "/aditya.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 54,
  tournaments: 6,
  points: "14,680",
},

{
  id: "rangga-perdana",
  name: "Rangga Perdana",
  image: "/rangga.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 57,
  tournaments: 5,
  points: "13,950",
},

{
  id: "bagas-wicaksono",
  name: "Bagas Wicaksono",
  image: "/bagas.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 60,
  tournaments: 5,
  points: "13,420",
},

{
  id: "fauzan-ramadhan",
  name: "Fauzan Ramadhan",
  image: "/fauzan.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 63,
  tournaments: 5,
  points: "12,870",
},

{
  id: "dava-pratama",
  name: "Dava Pratama",
  image: "/dava.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 66,
  tournaments: 5,
  points: "12,350",
},

{
  id: "rendy-kurniawan",
  name: "Rendy Kurniawan",
  image: "/rendy.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 69,
  tournaments: 4,
  points: "11,920",
},

{
  id: "galang-firmansyah",
  name: "Galang Firmansyah",
  image: "/galang.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 72,
  tournaments: 4,
  points: "11,480",
},

{
  id: "naufal-akmal",
  name: "Naufal Akmal",
  image: "/naufal.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 75,
  tournaments: 4,
  points: "10,950",
},

{
  id: "rizal-firmansyah",
  name: "Rizal Firmansyah",
  image: "/rizal.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 78,
  tournaments: 4,
  points: "10,620",
},

{
  id: "fajar-nugroho",
  name: "Fajar Nugroho",
  image: "/fajar-nugroho.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 81,
  tournaments: 3,
  points: "10,180",
},

{
  id: "ilham-prakoso",
  name: "Ilham Prakoso",
  image: "/ilham-prakoso.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 84,
  tournaments: 3,
  points: "9,740",
},

{
  id: "doni-setiawan",
  name: "Doni Setiawan",
  image: "/doni.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 87,
  tournaments: 3,
  points: "9,320",
},

{
  id: "andika-pratama",
  name: "Andika Pratama",
  image: "/andika-pratama.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 90,
  tournaments: 3,
  points: "8,950",
},

{
  id: "surya-wijaya",
  name: "Surya Wijaya",
  image: "/surya.jpg",
  country: "Indonesia",
  category: "tunggal-putra",
   

  worldRank: 94,
  tournaments: 2,
  points: "8,540",
},


  // =====================================================
  // TUNGGAL PUTRI
  // =====================================================

  {
    id: "gregoria-mariska-tunjung",
    name: "Gregoria Mariska Tunjung",
    image: "/gregoria.jpg",
    country: "Indonesia",
    category: "tunggal-putri",
     

    worldRank: 1,
    tournaments: 17,
    points: "76,420",
  },

  {
    id: "putri-kusuma-wardani",
    name: "Putri Kusuma Wardani",
    image: "/putri.jpg",
    country: "Indonesia",
    category: "tunggal-putri",
     

    worldRank: 7,
    tournaments: 15,
    points: "52,730",
  },

  {
    id: "ester-nurumi-wardoyo",
    name: "Ester Nurumi Wardoyo",
    image: "/ester.jpg",
    country: "Indonesia",
    category: "tunggal-putri",
     

    worldRank: 11,
    tournaments: 14,
    points: "45,620",
  },

  {
    id: "komang-ayu-cahya-dewi",
    name: "Komang Ayu Cahya Dewi",
    image: "/komang.jpg",
    country: "Indonesia",
    category: "tunggal-putri",
     

    worldRank: 14,
    tournaments: 13,
    points: "41,350",
  },


  // =====================================================
  // GANDA PUTRA
  // =====================================================

  {
    id: "fajar-rian",
    name: "Fajar Alfian / Muhammad Rian Ardianto",
    image: "/fajar.jpg",
    country: "Indonesia",
    category: "ganda-putra",
     

    worldRank: 1,
    tournaments: 18,
    points: "88,210",
  },

  {
    id: "fikri-daniel",
    name: "Muhammad Shohibul Fikri / Daniel Marthin",
    image: "/fikri.jpg",
    country: "Indonesia",
    category: "ganda-putra",
     

    worldRank: 2,
    tournaments: 17,
    points: "72,340",
  },

  {
    id: "hendra-setiawan",
    name: "Hendra Setiawan / Partner",
    image: "/hendra.jpg",
    country: "Indonesia",
    category: "ganda-putra",
     

    worldRank: 3,
    tournaments: 16,
    points: "61,850",
  },

  {
    id: "leo-daniel",
    name: "Leo Rolly Carnando / Daniel Marthin",
    image: "/leo.jpg",
    country: "Indonesia",
    category: "ganda-putra",
     

    worldRank: 6,
    tournaments: 15,
    points: "57,430",
  },

  {
    id: "sabar-reza",
    name: "Sabar Karyaman Gutama / Muhammad Reza Pahlevi",
    image: "/sabar.jpg",
    country: "Indonesia",
    category: "ganda-putra",
     

    worldRank: 9,
    tournaments: 14,
    points: "51,820",
  },


  // =====================================================
  // GANDA PUTRI
  // =====================================================

  {
    id: "apri-fadia",
    name: "Apriyani Rahayu / Siti Fadia Silva Ramadhanti",
    image: "/apriyani.jpg",
    country: "Indonesia",
    category: "ganda-putri",
     

    worldRank: 1,
    tournaments: 17,
    points: "70,530",
  },

  {
    id: "rima-partner",
    name: "Rima Ferdiyanti / Partner",
    image: "/fitriani.jpg",
    country: "Indonesia",
    category: "ganda-putri",
     

    worldRank: 3,
    tournaments: 13,
    points: "50,840",
  },

  {
    id: "febriana-amelia",
    name: "Febriana Dwipuji Kusuma / Amalia Cahaya Pratiwi",
    image: "/febriana.jpg",
    country: "Indonesia",
    category: "ganda-putri",
     

    worldRank: 5,
    tournaments: 15,
    points: "56,240",
  },

  {
    id: "meilysa-rachel",
    name: "Meilysa Trias Puspitasari / Rachel Allessya Rose",
    image: "/meilysa.jpg",
    country: "Indonesia",
    category: "ganda-putri",
     

    worldRank: 8,
    tournaments: 13,
    points: "48,630",
  },


  // =====================================================
  // GANDA CAMPURAN
  // =====================================================

  {
    id: "gloria-partner",
    name: "Gloria Emanuelle Widjaja / Partner",
    image: "/gloria.jpg",
    country: "Indonesia",
    category: "ganda-campuran",
     

    worldRank: 1,
    tournaments: 15,
    points: "58,640",
  },

  {
    id: "dejan-gloria",
    name: "Dejan Ferdinansyah / Gloria Emanuelle Widjaja",
    image: "/dejan.jpg",
    country: "Indonesia",
    category: "ganda-campuran",
     

    worldRank: 4,
    tournaments: 14,
    points: "53,420",
  },

  {
    id: "rehan-lisa",
    name: "Rehan Naufal Kusharjanto / Lisa Ayu Kusumawati",
    image: "/rehan.jpg",
    country: "Indonesia",
    category: "ganda-campuran",
     

    worldRank: 7,
    tournaments: 13,
    points: "49,280",
  },


  // =====================================================
  // PARA-BADMINTON
  // =====================================================

  {
    id: "hikmat-ramdani",
    name: "Hikmat Ramdani",
    image: "/hikmat.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 3,
    tournaments: 14,
    points: "55,420",
  },

  {
    id: "leani-ratri-oktila",
    name: "Leani Ratri Oktila",
    image: "/leani.jpg",
    country: "Indonesia",
    category: "ganda-putri",
     

    worldRank: 2,
    tournaments: 13,
    points: "58,730",
  },

  {
    id: "suryo-nugroho",
    name: "Suryo Nugroho",
    image: "/suryo.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 4,
    tournaments: 14,
    points: "52,610",
  },

  {
    id: "ukhrowi",
    name: "Ukhrowi",
    image: "/ukhrowi.jpg",
    country: "Indonesia",
    category: "tunggal-putri",
     

    worldRank: 2,
    tournaments: 12,
    points: "48,250",
  },

  {
    id: "supriadi-para",
    name: "Supriadi",
    image: "/supriadi.jpg",
    country: "Indonesia",
    category: "tunggal-putra",
     

    worldRank: 6,
    tournaments: 11,
    points: "44,320",
  },

  {
    id: "ratu-riska-para",
    name: "Ratu Riska",
    image: "/ratu.jpg",
    country: "Indonesia",
    category: "tunggal-putri",
     

    worldRank: 5,
    tournaments: 10,
    points: "41,870",
  },
];