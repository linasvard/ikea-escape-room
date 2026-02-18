/*
 * ============================================
 * RUM 1: BARNAVDELNINGEN — ELENA JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initRoom1() {
  const introductionDiv = document.getElementById("introductionDiv");
  const startRoom1Btn = document.getElementById("startRoom1Btn");

  startRoom1Btn?.addEventListener("click", () => {
    introductionDiv?.classList.add("hidden");
    // Här kan du lägga till mer kod som ska köras när man klickar på startknappen, t.ex. visa kartan eller liknande
  });
}
