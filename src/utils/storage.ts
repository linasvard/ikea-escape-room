/*
 * ============================================
 * LOCALSTORAGE-HANTERING — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Hanterar sparning av progress och highscore i webbläsarens localStorage.
 * Dessa funktioner gör att spelaren kan stänga browsern och fortsätta sen.
 */

import type { PlayerProgress, HighscoreEntry } from "../types";

// Nycklarna som används i localStorage
const PROGRESS_KEY = "ikea-escape-progress";
const HIGHSCORE_KEY = "ikea-escape-highscore";

/** Sparar spelarens progress (aktuellt rum, tider osv.) */
export function saveProgress(progress: PlayerProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

/** Hämtar sparad progress, eller null om inget finns */
export function loadProgress(): PlayerProgress | null {
  const data = localStorage.getItem(PROGRESS_KEY);
  if (!data) return null;
  return JSON.parse(data) as PlayerProgress;
}

/** Rensar sparad progress — används vid "Spela igen" */
export function clearProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
}

/** Hämtar highscore-listan (top 3) */
export function getHighscores(): HighscoreEntry[] {
  const data = localStorage.getItem(HIGHSCORE_KEY);
  if (!data) return [];
  return JSON.parse(data) as HighscoreEntry[];
}

/** Lägger till ny highscore, sorterar snabbast först, behåller bara top 3 */
export function addHighscore(entry: HighscoreEntry): void {
  const scores = getHighscores();
  scores.push(entry);
  scores.sort((a, b) => a.totalTime - b.totalTime);
  const top3 = scores.slice(0, 3);
  localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(top3));
}
