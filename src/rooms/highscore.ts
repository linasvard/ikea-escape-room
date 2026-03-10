import { getElapsedTime } from "./timer";

const HIGHSCORE_KEY = "ikea-escape-highscore";

// Hur ett highscore-objekt ser ut
interface HighscoreEntry {
  name: string;
  time: number;
  date: string;
}

// Hämtar alla sparade highscores från localStorage
function getHighscores(): HighscoreEntry[] {
  const data = localStorage.getItem(HIGHSCORE_KEY);
  if (!data) return [];
  return JSON.parse(data) as HighscoreEntry[];
}

// Sparar ett nytt highscore och behåller bara top 10
export function saveHighscore(): void {
  const name = localStorage.getItem("playerName") || "Anonym"; // Hämtar spelarens namn från localStorage, eller sätter det till "Anonym" om inget namn finns sparat
  const time = getElapsedTime();
  const date = new Date().toLocaleDateString("sv-SE");

  const scores = getHighscores();
  scores.push({ name, time, date });
  scores.sort((a, b) => a.time - b.time);
  const top10 = scores.slice(0, 10);
  localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(top10));
}

// Omvandlar millisekunder till MM:SS
function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Visar/döljer highscore-overlayan och renderar listan
export function initHighscore(): void {
  const btn = document.querySelector("#highscoreBtn");
  const overlay = document.querySelector("#highscoreOverlay");
  const closeBtn = document.querySelector("#highscoreCloseBtn");
  const list = document.querySelector("#highscoreList");

  btn?.addEventListener("click", () => {
    // Rendera listan varje gång man öppnar
    const scores = getHighscores();
    if (list) {
      if (scores.length === 0) {
        list.innerHTML = "<li>Inga resultat ännu!</li>";
      } else {
        list.innerHTML = scores
          .map(
            (entry, index) =>
              `<li><span>#${index + 1} ${entry.name}</span><span>${formatTime(entry.time)}</span><span>${entry.date}</span></li>`,
          )
          .join("");
      }
    }
    overlay?.classList.remove("hidden");
  });

  closeBtn?.addEventListener("click", () => {
    overlay?.classList.add("hidden");
  });
}
