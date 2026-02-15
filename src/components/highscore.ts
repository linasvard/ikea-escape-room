/*
 * ============================================
 * HIGHSCORE-LISTA — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Hämtar top 3 från localStorage och visar dem som en lista.
 */

import { getHighscores } from "../utils/storage";
import { formatTime } from "../utils/timer";
import { getElement } from "../utils/dom";

/** Renderar highscore-listan i #highscore-list */
export function renderHighscores(): void {
  const list = getElement<HTMLOListElement>("#highscore-list");
  const scores = getHighscores();

  if (scores.length === 0) {
    list.innerHTML = "<li>Inga highscores ännu!</li>";
    return;
  }

  list.innerHTML = scores
    .map(
      (entry) =>
        `<li><strong>${entry.name}</strong> - ${formatTime(entry.totalTime)} (${entry.date})</li>`,
    )
    .join("");
}
