/*
 * ============================================
 * RUM 2: MATTORNA — ERIK JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initRoom2() {
  const colorChangeBtn: HTMLButtonElement | null =
    document.querySelector("#room2Btn");
  colorChangeBtn?.addEventListener("click", toggleColorBtn);

  function toggleColorBtn() {
    const room2Paragraph: HTMLElement | null = document.querySelector("#room2");
    room2Paragraph?.classList.toggle("red");
  }

  // övrig kod för rum 2
}
