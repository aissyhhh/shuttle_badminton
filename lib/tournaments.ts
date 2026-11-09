import { PlayerCategory } from "./players";

export type TournamentStatus =
  | "upcoming"
  | "ongoing"
  | "registration"
  | "completed";

export type TournamentCategory = "senior" | "junior";

export interface TournamentClass {
  code: string;
  name: string;
  fee: string;
}

export interface DrawMatch {
  player1Id?: string;
  player2Id?: string;
  score1?: number;
  score2?: number;
  winnerId?: string;
  court?: string;
}

export interface TournamentDraw {
  category: PlayerCategory;
  round32?: DrawMatch[];
  round16?: DrawMatch[];
  quarterFinal?: DrawMatch[];
  semiFinal?: DrawMatch[];
  final?: DrawMatch[];
}

export interface Tournament {
  id: string;
  name: string;
  image: string;
  location: string;
  date: string;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  category: TournamentCategory;

  playerIds?: string[];

  draw?: TournamentDraw[];

  code?: string;
  level?: string;
  address?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;

  organizer?: {
    name: string;
    phone: string;
    email: string;
  };

  registration?: {
    region: string;
    province: string;
    start: string;
    end: string;
    paymentDeadline: string;
    accountNumber: string;
    bank: string;
  };

  classes?: TournamentClass[];
}

export const tournaments: Tournament[] = [
  {
    id: "kejurda-pbsi-diy-2026",
    name: "Kejurda PBSI DIY 2026",
    image: "/t-kejurda.png",
    location: "Daerah Istimewa Yogyakarta, Indonesia",
    date: "30 Aug - 02 Sep 2026",
    startDate: "2026-08-30",
    endDate: "2026-09-02",
    status: "ongoing",
    category: "senior",

    playerIds: [
      "anthony-ginting",
      "jonatan-christie",
      "alwi-farhan",
      "chico-aura-dwi-wardoyo",
      "shesar-hiren-rustavito",
      "taufik-hidayat",
      "budi-santoso",
      "dimas-pratama",
      "reza-maulana",
      "arya-nugraha",
      "rizky-fauzan",
      "galih-permana",
      "ilham-akbar",
      "farhan-aziz",
      "yoga-pratama",
      "raka-wijaya",
      "andika-putra",
      "rafi-maulana",
      "aditya-prakoso",
      "rangga-perdana",
      "bagas-wicaksono",
      "fauzan-ramadhan",
      "dava-pratama",
      "rendy-kurniawan",
      "galang-firmansyah",
      "naufal-akmal",
      "rizal-firmansyah",
      "fajar-nugroho",
      "ilham-prakoso",
      "doni-setiawan",
      "andika-pratama",
      "surya-wijaya",
    ],
    code: "KJI 083/PBSI/2026",
    level: "BWF World Tour Super 100",
    address: "Indonesia",
    country: "Indonesia",
    phone: "628575875875875",
    email: "sekjen@shuttler.com",
    website: "shuttlerbadminton.id",

    organizer: {
      name: "Bambang Roedyanto",
      phone: "623463736353",
      email: "sekjen@shuttler.com",
    },

    registration: {
      region: "Semua Kabupaten/Kota",
      province: "Semua Provinsi",
      start: "02/Feb/2026 00:00",
      end: "23/Jul/2026 23:59",
      paymentDeadline: "21/Jul/2026 00:00",
      accountNumber: "Indonesia",
      bank: "Indonesia",
    },

    classes: [
      {
        code: "TDA",
        name: "Tunggal Dewasa Putra",
        fee: "Gratis",
      },
      {
        code: "TDI",
        name: "Tunggal Dewasa Putri",
        fee: "Gratis",
      },
      {
        code: "GDA",
        name: "Ganda Dewasa Putra",
        fee: "Gratis",
      },
      {
        code: "GDI",
        name: "Ganda Dewasa Putri",
        fee: "Gratis",
      },
      {
        code: "GDC",
        name: "Ganda Campuran Dewasa",
        fee: "Gratis",
      },
    ],
    draw: [
      {
        category: "tunggal-putra",

        round32: [
          {
            player1Id: "anthony-ginting",
            player2Id: "rafi-maulana",
            score1: 21,
            score2: 15,
            winnerId: "anthony-ginting",
            court: "Court 1"
          },
          {
            player1Id: "jonatan-christie",
            player2Id: "aditya-prakoso",
            score1: 21,
            score2: 17,
            winnerId: "jonatan-christie",
            court: "Court 2"
          },
          {
            player1Id: "alwi-farhan",
            player2Id: "rangga-perdana",
            score1: 21,
            score2: 13,
            winnerId: "alwi-farhan",
            court: "Court 3"
          },
          {
            player1Id: "chico-aura-dwi-wardoyo",
            player2Id: "bagas-wicaksono",
            score1: 21,
            score2: 18,
            winnerId: "chico-aura-dwi-wardoyo",
            court: "Court 1"
          },
          {
            player1Id: "shesar-hiren-rustavito",
            player2Id: "fauzan-ramadhan",
            score1: 21,
            score2: 16,
            winnerId: "shesar-hiren-rustavito",
            court: "Court 1"
          },
          {
            player1Id: "taufik-hidayat",
            player2Id: "dava-pratama",
            score1: 18,
            score2: 21,
            winnerId: "dava-pratama",
            court: "Court 1"
          },
          {
            player1Id: "budi-santoso",
            player2Id: "rendy-kurniawan",
            score1: 21,
            score2: 12,
            winnerId: "budi-santoso",
            court: "Court 2"
          },
          {
            player1Id: "dimas-pratama",
            player2Id: "galang-firmansyah",
            score1: 21,
            score2: 19,
            winnerId: "dimas-pratama",
            court: "Court 3"
          },
          {
            player1Id: "reza-maulana",
            player2Id: "naufal-akmal",
            score1: 21,
            score2: 14,
            winnerId: "reza-maulana",
            court: "Court 1"
          },
          {
            player1Id: "arya-nugraha",
            player2Id: "rizal-firmansyah",
            score1: 21,
            score2: 17,
            winnerId: "arya-nugraha",
            court: "Court 2"
          },
          {
            player1Id: "rizky-fauzan",
            player2Id: "fajar-nugroho",
            score1: 19,
            score2: 21,
            winnerId: "fajar-nugroho",
            court: "Court 3"
          },
          {
            player1Id: "galih-permana",
            player2Id: "ilham-prakoso",
            score1: 21,
            score2: 16,
            winnerId: "galih-permana",
            court: "Court 1"
          },
          {
            player1Id: "ilham-akbar",
            player2Id: "doni-setiawan",
            score1: 21,
            score2: 11,
            winnerId: "ilham-akbar",
            court: "Court 2"
          },
          {
            player1Id: "farhan-aziz",
            player2Id: "andika-pratama",
            score1: 21,
            score2: 18,
            winnerId: "farhan-aziz",
            court: "Court 3"
          },
          {
            player1Id: "yoga-pratama",
            player2Id: "surya-wijaya",
            score1: 21,
            score2: 15,
            winnerId: "yoga-pratama",
            court: "Court 1"
          },
          {
            player1Id: "raka-wijaya",
            player2Id: "andika-putra",
            score1: 21,
            score2: 19,
            winnerId: "raka-wijaya",
            court: "Court 2"
          },
        ],

        round16: [
          {
            player1Id: "anthony-ginting",
            player2Id: "jonatan-christie",
            score1: 21,
            score2: 18,
            winnerId: "anthony-ginting",
            court: "Court 3"
          },
          {
            player1Id: "alwi-farhan",
            player2Id: "chico-aura-dwi-wardoyo",
            score1: 19,
            score2: 21,
            winnerId: "chico-aura-dwi-wardoyo",
            court: "Court 1"
          },
          {
            player1Id: "shesar-hiren-rustavito",
            player2Id: "dava-pratama",
            score1: 21,
            score2: 17,
            winnerId: "shesar-hiren-rustavito",
            court: "Court 2"
          },
          {
            player1Id: "budi-santoso",
            player2Id: "dimas-pratama",
            score1: 21,
            score2: 15,
            winnerId: "budi-santoso",
            court: "Court 3"
          },
          {
            player1Id: "reza-maulana",
            player2Id: "arya-nugraha",
            score1: 21,
            score2: 16,
            winnerId: "reza-maulana",
            court: "Court 1"
          },
          {
            player1Id: "fajar-nugroho",
            player2Id: "galih-permana",
            score1: 18,
            score2: 21,
            winnerId: "galih-permana",
            court: "Court 2"
          },
          {
            player1Id: "ilham-akbar",
            player2Id: "farhan-aziz",
            score1: 21,
            score2: 14,
            winnerId: "ilham-akbar",
            court: "Court 3"
          },
          {
            player1Id: "yoga-pratama",
            player2Id: "raka-wijaya",
            score1: 17,
            score2: 21,
            winnerId: "raka-wijaya",
            court: "Court 1"
          },
        ],

        quarterFinal: [
          {
            player1Id: "anthony-ginting",
            player2Id: "chico-aura-dwi-wardoyo",
            score1: 21,
            score2: 16,
            winnerId: "anthony-ginting",
            court: "Court 2"
          },
          {
            player1Id: "shesar-hiren-rustavito",
            player2Id: "budi-santoso",
            score1: 18,
            score2: 21,
            winnerId: "budi-santoso",
            court: "Court 3"
          },
          {
            player1Id: "reza-maulana",
            player2Id: "galih-permana",
            score1: 21,
            score2: 19,
            winnerId: "reza-maulana",
            court: "Court 1"
          },
          {
            player1Id: "ilham-akbar",
            player2Id: "raka-wijaya",
            score1: 17,
            score2: 21,
            winnerId: "raka-wijaya",
            court: "Court 2"
          },
        ],

        semiFinal: [
          {
            player1Id: "anthony-ginting",
            player2Id: "budi-santoso",
            score1: 21,
            score2: 18,
            winnerId: "anthony-ginting",
            court: "Court 3"
          },
          {
            player1Id: "reza-maulana",
            player2Id: "raka-wijaya",
            score1: 19,
            score2: 21,
            winnerId: "raka-wijaya",
            court: "Court 1"
          }
        ],

        final: [
          {
            player1Id: "anthony-ginting",
            player2Id: "raka-wijaya",
            score1: 21,
            score2: 17,
            winnerId: "anthony-ginting",
            court: "Court 2"
          },
        ],
      },
    ],
  },

  {
    id: "hydroplus-um-open-2026",
    name: "Hydroplus UM Open 2026",
    image: "/t-hydroplus.png",
    location: "Malang, Indonesia",
    date: "22 Sep - 26 Sep 2026",
    startDate: "2026-09-22",
    endDate: "2026-09-26",
    status: "ongoing",
    category: "senior",

    playerIds: [
      "anthony-ginting",
      "jonatan-christie",
      "alwi-farhan",
      "chico-aura-dwi-wardoyo",
      "shesar-hiren-rustavito",
      "taufik-hidayat",
      "budi-santoso",
      "dimas-pratama",
      "reza-maulana",
      "arya-nugraha",
      "rizky-fauzan",
      "galih-permana",
      "ilham-akbar",
      "farhan-aziz",
      "yoga-pratama",
      "raka-wijaya",
      "andika-putra",
      "rafi-maulana",
      "aditya-prakoso",
      "rangga-perdana",
      "bagas-wicaksono",
      "fauzan-ramadhan",
      "dava-pratama",
      "rendy-kurniawan",
      "galang-firmansyah",
      "naufal-akmal",
      "rizal-firmansyah",
      "fajar-nugroho",
      "ilham-prakoso",
      "doni-setiawan",
      "andika-pratama",
      "surya-wijaya",
    ],

    code: "HUMO/2026",
    level: "National",
    address: "Malang, Indonesia",
    country: "Indonesia",
    phone: "628123456789",
    email: "info@shuttler.com",
    website: "shuttlerbadminton.id",

    organizer: {
      name: "Shuttler Badminton",
      phone: "628123456789",
      email: "info@shuttler.com",
    },

    registration: {
      region: "Semua Kabupaten/Kota",
      province: "Jawa Timur",
      start: "01/Sep/2026 00:00",
      end: "18/Sep/2026 23:59",
      paymentDeadline: "19/Sep/2026 00:00",
      accountNumber: "Indonesia",
      bank: "Indonesia",
    },

    classes: [
      {
        code: "TDA",
        name: "Tunggal Dewasa Putra",
        fee: "Rp150.000",
      },
      {
        code: "TDI",
        name: "Tunggal Dewasa Putri",
        fee: "Rp150.000",
      },
      {
        code: "GDA",
        name: "Ganda Dewasa Putra",
        fee: "Rp200.000",
      },
      {
        code: "GDI",
        name: "Ganda Dewasa Putri",
        fee: "Rp200.000",
      },
      {
        code: "GDC",
        name: "Ganda Campuran Dewasa",
        fee: "Rp200.000",
      },
    ],
    draw: [
      {
        category: "tunggal-putra",

        round32: [
          {
            player1Id: "anthony-ginting",
            player2Id: "rafi-maulana",
            score1: 21,
            score2: 15,
            winnerId: "anthony-ginting",
          },
          {
            player1Id: "jonatan-christie",
            player2Id: "aditya-prakoso",
            score1: 21,
            score2: 17,
            winnerId: "jonatan-christie",
          },
          {
            player1Id: "alwi-farhan",
            player2Id: "rangga-perdana",
            score1: 21,
            score2: 13,
            winnerId: "alwi-farhan",
          },
          {
            player1Id: "chico-aura-dwi-wardoyo",
            player2Id: "bagas-wicaksono",
            score1: 21,
            score2: 18,
            winnerId: "chico-aura-dwi-wardoyo",
          },
          {
            player1Id: "shesar-hiren-rustavito",
            player2Id: "fauzan-ramadhan",
            score1: 21,
            score2: 16,
            winnerId: "shesar-hiren-rustavito",
          },
          {
            player1Id: "taufik-hidayat",
            player2Id: "dava-pratama",
            score1: 18,
            score2: 21,
            winnerId: "dava-pratama",
          },
          {
            player1Id: "budi-santoso",
            player2Id: "rendy-kurniawan",
            score1: 21,
            score2: 12,
            winnerId: "budi-santoso",
          },
          {
            player1Id: "dimas-pratama",
            player2Id: "galang-firmansyah",
            score1: 21,
            score2: 19,
            winnerId: "dimas-pratama",
          },
          {
            player1Id: "reza-maulana",
            player2Id: "naufal-akmal",
            score1: 21,
            score2: 14,
            winnerId: "reza-maulana",
          },
          {
            player1Id: "arya-nugraha",
            player2Id: "rizal-firmansyah",
            score1: 21,
            score2: 17,
            winnerId: "arya-nugraha",
          },
          {
            player1Id: "rizky-fauzan",
            player2Id: "fajar-nugroho",
            score1: 19,
            score2: 21,
            winnerId: "fajar-nugroho",
          },
          {
            player1Id: "galih-permana",
            player2Id: "ilham-prakoso",
            score1: 21,
            score2: 16,
            winnerId: "galih-permana",
          },
          {
            player1Id: "ilham-akbar",
            player2Id: "doni-setiawan",
            score1: 21,
            score2: 11,
            winnerId: "ilham-akbar",
          },
          {
            player1Id: "farhan-aziz",
            player2Id: "andika-pratama",
            score1: 21,
            score2: 18,
            winnerId: "farhan-aziz",
          },
          {
            player1Id: "yoga-pratama",
            player2Id: "surya-wijaya",
            score1: 21,
            score2: 15,
            winnerId: "yoga-pratama",
          },
          {
            player1Id: "raka-wijaya",
            player2Id: "andika-putra",
            score1: 21,
            score2: 19,
            winnerId: "raka-wijaya",
          },
        ],

        round16: [
          {
            player1Id: "anthony-ginting",
            player2Id: "jonatan-christie",
            score1: 21,
            score2: 18,
            winnerId: "anthony-ginting",
          },
          {
            player1Id: "alwi-farhan",
            player2Id: "chico-aura-dwi-wardoyo",
            score1: 19,
            score2: 21,
            winnerId: "chico-aura-dwi-wardoyo",
          },
          {
            player1Id: "shesar-hiren-rustavito",
            player2Id: "dava-pratama",
            score1: 21,
            score2: 17,
            winnerId: "shesar-hiren-rustavito",
          },
          {
            player1Id: "budi-santoso",
            player2Id: "dimas-pratama",
            score1: 21,
            score2: 15,
            winnerId: "budi-santoso",
          },
          {
            player1Id: "reza-maulana",
            player2Id: "arya-nugraha",
            score1: 21,
            score2: 16,
            winnerId: "reza-maulana",
          },
          {
            player1Id: "fajar-nugroho",
            player2Id: "galih-permana",
            score1: 18,
            score2: 21,
            winnerId: "galih-permana",
          },
          {
            player1Id: "ilham-akbar",
            player2Id: "farhan-aziz",
            score1: 21,
            score2: 14,
            winnerId: "ilham-akbar",
          },
          {
            player1Id: "yoga-pratama",
            player2Id: "raka-wijaya",
            score1: 17,
            score2: 21,
            winnerId: "raka-wijaya",
          },
        ],

        quarterFinal: [
          {
            player1Id: "anthony-ginting",
            player2Id: "chico-aura-dwi-wardoyo",
            score1: 21,
            score2: 16,
            winnerId: "anthony-ginting",
          },
          {
            player1Id: "shesar-hiren-rustavito",
            player2Id: "budi-santoso",
            score1: 18,
            score2: 21,
            winnerId: "budi-santoso",
          },
          {
            player1Id: "reza-maulana",
            player2Id: "galih-permana",
            score1: 21,
            score2: 19,
            winnerId: "reza-maulana",
          },
          {
            player1Id: "ilham-akbar",
            player2Id: "raka-wijaya",
            score1: 17,
            score2: 21,
            winnerId: "raka-wijaya",
          },
        ],

        semiFinal: [
          {
            player1Id: "anthony-ginting",
            player2Id: "budi-santoso",
            score1: 21,
            score2: 18,
            winnerId: "anthony-ginting",
          },
          {
            player1Id: "reza-maulana",
            player2Id: "raka-wijaya",
            score1: 19,
            score2: 21,
            winnerId: "raka-wijaya",
          },
        ],

        final: [
          {
            player1Id: "anthony-ginting",
            player2Id: "raka-wijaya",
            score1: 21,
            score2: 17,
            winnerId: "anthony-ginting",
          },
        ],
      },
    ],
  },

  {
    id: "kejurkot-pbsi-sukabumi-2026",
    name: "Kejurkot PBSI Sukabumi 2026",
    image: "/t-kejurkot.png",
    location: "Kota Sukabumi, Indonesia",
    date: "21 Sep - 27 Sep 2026",
    startDate: "2026-09-21",
    endDate: "2026-09-27",
    status: "registration",
    category: "senior",

    playerIds: [
      "anthony-ginting",
      "jonatan-christie",
      "alwi-farhan",
      "chico-aura-dwi-wardoyo",
      "shesar-hiren-rustavito",
      "taufik-hidayat",
      "budi-santoso",
      "dimas-pratama",
      "reza-maulana",
      "arya-nugraha",
      "rizky-fauzan",
      "galih-permana",
      "ilham-akbar",
      "farhan-aziz",
      "yoga-pratama",
      "raka-wijaya",
      "andika-putra",
      "rafi-maulana",
      "aditya-prakoso",
      "rangga-perdana",
      "bagas-wicaksono",
      "fauzan-ramadhan",
      "dava-pratama",
      "rendy-kurniawan",
      "galang-firmansyah",
      "naufal-akmal",
      "rizal-firmansyah",
      "fajar-nugroho",
      "ilham-prakoso",
      "doni-setiawan",
      "andika-pratama",
      "surya-wijaya",
    ],

    code: "KJS/2026",
    level: "National",
    address: "Kota Sukabumi, Indonesia",
    country: "Indonesia",
    phone: "628123456789",
    email: "info@shuttler.com",
    website: "shuttlerbadminton.id",

    organizer: {
      name: "PBSI Kota Sukabumi",
      phone: "628123456789",
      email: "info@shuttler.com",
    },

    registration: {
      region: "Kota Sukabumi",
      province: "Jawa Barat",
      start: "01/Sep/2026 00:00",
      end: "18/Sep/2026 23:59",
      paymentDeadline: "19/Sep/2026 00:00",
      accountNumber: "Indonesia",
      bank: "Indonesia",
    },

    classes: [
      {
        code: "TDA",
        name: "Tunggal Dewasa Putra",
        fee: "Rp100.000",
      },
      {
        code: "TDI",
        name: "Tunggal Dewasa Putri",
        fee: "Rp100.000",
      },
      {
        code: "GDA",
        name: "Ganda Dewasa Putra",
        fee: "Rp150.000",
      },
      {
        code: "GDI",
        name: "Ganda Dewasa Putri",
        fee: "Rp150.000",
      },
      {
        code: "GDC",
        name: "Ganda Campuran Dewasa",
        fee: "Rp250.000",
      },
    ],
  },

  {
    id: "abu-dhabi-masters-2026",
    name: "Abu Dhabi Masters 2026",
    image: "/t-abudhabi.png",
    location: "Abu Dhabi, United Arab Emirates",
    date: "29 Sep - 04 Oct 2026",
    startDate: "2026-09-29",
    endDate: "2026-10-04",
    status: "upcoming",
    category: "senior",

    playerIds: [],
  },

  {
    id: "yonex-dutch-open-2026",
    name: "Yonex Dutch Open 2026",
    image: "/t-yonex.png",
    location: "Netherlands",
    date: "30 Sep - 04 Oct 2026",
    startDate: "2026-09-30",
    endDate: "2026-10-04",
    status: "upcoming",
    category: "senior",

    playerIds: [],
  },
];
