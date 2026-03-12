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

// Sparar ett nytt highscore och behåller bara top 10 (unikt per namn, bara bästa tid)
export function saveHighscore(): void {
  const name = localStorage.getItem("playerName") || "Anonym";
  const time = getElapsedTime();
  const date = new Date().toLocaleDateString("sv-SE");

  const scores = getHighscores();
  const nameLower = name.toLowerCase();
  const existing = scores.findIndex((s) => s.name.toLowerCase() === nameLower);

  if (existing !== -1) {
    if (time < scores[existing].time) {
      scores[existing] = { name, time, date };
    }
  } else {
    scores.push({ name, time, date });
  }

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
  const overlay = document.querySelector(
    "#highscoreOverlay",
  ) as HTMLElement | null;
  const closeBtn = document.querySelector("#highscoreCloseBtn");
  const list = document.querySelector("#highscoreList");

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      overlay?.classList.add("hidden");
    }
  });

  overlay?.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      (closeBtn as HTMLElement)?.focus();
    }
  });

  btn?.addEventListener("click", () => {
    const scores = getHighscores();
    if (list) {
      if (scores.length === 0) {
        list.innerHTML = "<li>Inga resultat ännu!</li>";
      } else {
        list.innerHTML = scores
          .map(
            (entry, index) =>
              `<li aria-label="Plats ${index + 1}: ${entry.name}, tid ${formatTime(entry.time)}, datum ${entry.date}">` +
              `<span>#${index + 1} ${entry.name}</span>` +
              `<span>${formatTime(entry.time)}</span>` +
              `<span>${entry.date}</span></li>`,
          )
          .join("");
      }
    }
    overlay?.classList.remove("hidden");
    overlay?.focus();
  });

  closeBtn?.addEventListener("click", () => {
    overlay?.classList.add("hidden");
  });
}

export function finishedGameHSEl() {
  // display the current run time (not from an undefined `entry` variable)
  const timeEl: HTMLSpanElement | null = document.querySelector('#room5GameTime');
  if (timeEl) {
    timeEl.textContent = formatTime(getElapsedTime());
  }

  const listEl: HTMLDivElement | null =
    document.querySelector("#finishedGameHSEl");

  const scores = getHighscores();
  if (listEl) {
    if (scores.length === 0) {
      listEl.innerHTML = `<li>Inga resultat ännu</li>`;
    } else {
      listEl.innerHTML = scores
        .map(
          (entry, index) =>
            `<li><span>#${index + 1} ${entry.name}</span><span>${formatTime(entry.time)}</span><span>${entry.date}</span></li>`,
        )
        .join("");
    }
  }
}
