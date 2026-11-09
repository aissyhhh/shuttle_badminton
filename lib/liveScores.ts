import { PlayerCategory } from "./players";

export interface LiveScoreMatch {
  id: number;

  player1Id: string;
  player2Id: string;

  category: PlayerCategory;

  round: string;
  court: string;

  score1: string[];
  score2: string[];

  currentGame: number;
  currentScore1: number;
  currentScore2: number;

  status: "live" | "finished" | "upcoming";
}

export interface LiveScore {
  tournamentId: string;
  date: string;
  matches: LiveScoreMatch[];
}

export const liveScores: LiveScore[] = [
  {
    tournamentId: "kejurda-pbsi-diy-2026",

    date: "Tuesday, September 9, 2026",

    matches: [
      {
        id: 1,

        player1Id: "jonatan-christie",
        player2Id: "anthony-ginting",

        category: "tunggal-putra",

        round: "Quarter Final",
        court: "Court 1",

        score1: ["21", "21", "-"],
        score2: ["18", "18", "-"],

        currentGame: 2,
        currentScore1: 11,
        currentScore2: 8,

        status: "live",
      },

      {
        id: 2,

        player1Id: "anthony-ginting",
        player2Id: "chico-aura-dwi-wardoyo",

        category: "tunggal-putra",

        round: "Quarter Final",
        court: "Court 2",

        score1: ["21", "21", "21"],
        score2: ["16", "18", "17"],

        currentGame: 3,
        currentScore1: 21,
        currentScore2: 17,

        status: "finished",
      },

      {
        id: 3,

        player1Id: "shesar-hiren-rustavito",
        player2Id: "budi-santoso",

        category: "tunggal-putra",

        round: "Quarter Final",
        court: "Court 3",

        score1: ["18", "21", "21"],
        score2: ["21", "17", "15"],

        currentGame: 3,
        currentScore1: 21,
        currentScore2: 15,

        status: "finished",
      },

      {
        id: 4,

        player1Id: "reza-maulana",
        player2Id: "galih-permana",

        category: "tunggal-putra",

        round: "Quarter Final",
        court: "Court 1",

        score1: ["21", "21", "21"],
        score2: ["16", "19", "18"],

        currentGame: 3,
        currentScore1: 21,
        currentScore2: 18,

        status: "finished",
      },
    ],
  },
];