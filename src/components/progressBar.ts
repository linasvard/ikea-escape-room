/*
 * ============================================
 * PROGRESS BAR — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Visar hur många rum spelaren har klarat.
 * Bredden på baren ändras procentuellt.
 */

import { getElement } from "../utils/dom";

/**
 * Uppdaterar progress-baren.
 * Exempel: updateProgressBar(2, 4) → baren blir 50% bred, texten visar "2 / 4 rum klarade"
 */
export function updateProgressBar(
  completedRooms: number,
  totalRooms: number,
): void {
  const bar = getElement<HTMLDivElement>("#progress-bar");
  const text = getElement<HTMLSpanElement>("#progress-text");

  const percentage = totalRooms > 0 ? (completedRooms / totalRooms) * 100 : 0;
  bar.style.width = `${percentage}%`;
  text.textContent = `${completedRooms} / ${totalRooms} rum klarade`;
}
