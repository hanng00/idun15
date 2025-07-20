export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  image?: string; // Optional image URL for the question
}

export interface QuizConfig {
  title: string;
  description: string;
  questions: QuizQuestion[];
  reward: string;
}

export const quizConfig: QuizConfig = {
  title: "🎉 Idun's 15 års quiz! 🎉",
  description:
    "Testa dina kunskaper och lås upp en speciell födelsedagspresent!",
  questions: [
    {
      id: 1,
      question: "Han heter Fredrik Lindgren. Vad gör han?",
      options: [
        "Direktör för Trafikverket",
        "VD för Biltema",
        "Ansvarig utgivare på Dagens Nyheter",
        "VD på Kunskapsskolan Sverige AB",

      ],
      correctAnswer: 3,
      explanation:
        "Jodå han är VD på Kunskapsskolan",
      image: "/idun15/kunskapsskolan-vd.jpeg",
    },
    {
      id: 2,
      question: "Vart är INTE ett coolt ställe att hänga på med EPAn?",
      options: [
        "Tågan",
        "Coop-parkeringen",
        "Utanför oskyldiga människors bostäder",
        "Motorgården, avskiljt från samhället",
      ],
      correctAnswer: 3,
      explanation:
        "Såklaaaart ska de höras när epan dunkar. Vad är det för mening om ingen hör?",
    },
    {
      id: 3,
      question: "Hur fort får en EPA gå?",
      options: [
        "30 km/h",
        "35 km/h (?)",
        "Beror på vem som frågar",
        "70 km/h på landsväg",
      ],
      correctAnswer: 0,
      explanation: "I don't make the rules",
    },
    {
      id: 4,
      question: "Vilken är INTE en EPA-låt av Rasmus Gozzi?",
      options: [
        "VOI TILL MIN FUCKBOI",
        "SUPA KN*LLA BRÅKA",
        "PIPPA SOM PAOLO",
        "STRYPSEX I DITT GARAGE",
      ],
      correctAnswer: 1,
      explanation: "SUPA KN*LLA BRÅKA är gjord av Loam",
    },
    {
      id: 5,
      question:
        "Du ska svänga vänster i korsningen. Den röda bilen visar med blinkers att hon ska köra in på samma väg. Vad gäller?",
      options: [
        "Jag ska lämna företräde enligt högerregeln",
        "Den röda bilen ska lämna mig företräde enligt högerregeln",
        "Jag ska lämna företräde enligt svängningsregeln",
        "Den röda bilen ska lämna mig företräde enligt svängningsregeln",
      ],
      correctAnswer: 2,
      explanation:
        "I denna situation har du mötande trafik och enligt svängningsregeln ska du lämna företräde åt mötande trafik vid vänstersväng i korsningen. Läs mer om svängningsregeln på sida 22 i Körkortsboken Körkortsteori 2025.",
      image: "/idun15/korkortsfraga.jpeg",
    },
    {
      id: 6,
      question: "Vad är det första man förlorar när man skaffar EPA?",
      options: [
        "Hörseln",
        "Sinnet för god musik",
        "Socialt ansvar",
        "Alla vänner som inte gillar dunka dunka",
      ],
      correctAnswer: 1,
      explanation: "B (men A är på god väg också)",
    },
  ],
  reward:
    "🎁 Congratulations Idun! You've unlocked your birthday surprise! 🎁\n\nYou're officially 15 and ready to take on the world! Keep being amazing, keep dreaming big, and remember that you're loved beyond measure. Happy Birthday! 🎉✨",
};
