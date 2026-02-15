/*
 * ============================================
 * RUM 3: SOVRUMMET — PERSON 3 JOBBAR HÄR
 * ============================================
 * Det här är din fil! Byt ut placeholder-koden med ditt pussel/spel.
 *
 * SÅ HÄR FUNGERAR DET:
 * - init()    → Returnera din HTML som en sträng. Den injiceras i #room-content.
 * - setup()   → Sätt upp event listeners för ditt spel.
 *               Anropa onComplete() när spelaren klarat rummet.
 * - cleanup() → Ta bort alla event listeners. Viktigt så det inte blir dubbletter.
 *
 * ÄNDRA INTE: roomId (måste vara 3) och RoomModule-strukturen.
 * ÄNDRA: All HTML i init(), all logik i setup(), och CSS i styles/rooms/_room3.scss
 */

import type { RoomModule, RoomResult } from "../types";

let onCompleteCb: ((result: RoomResult) => void) | null = null;

function handleComplete(): void {
  if (onCompleteCb) {
    onCompleteCb({ roomId: 3, success: true, timeSpent: 0 });
  }
}

const room3: RoomModule = {
  init() {
    // ÄNDRA HÄR: Byt ut HTML:en nedan mot ditt pussel
    return `
      <div class="room-game room-3">
        <h3>Sovrummet - Pussel</h3>
        <p>Här kommer ditt pussel/spel att vara.</p>
        <button id="room3-complete" type="button">
          Klara rummet (placeholder)
        </button>
      </div>
    `;
  },

  setup(onComplete) {
    onCompleteCb = onComplete;
    // ÄNDRA HÄR: Sätt upp event listeners för ditt pussel
    const btn = document.getElementById("room3-complete");
    if (btn) {
      btn.addEventListener("click", handleComplete);
    }
  },

  cleanup() {
    onCompleteCb = null;
    // ÄNDRA HÄR: Ta bort alla event listeners du lagt till i setup()
    const btn = document.getElementById("room3-complete");
    if (btn) {
      btn.removeEventListener("click", handleComplete);
    }
  },
};

export default room3;
