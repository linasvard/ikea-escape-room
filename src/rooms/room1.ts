/*
 * ============================================
 * RUM 1: KÖKSAVDELNINGEN — PERSON 1 JOBBAR HÄR
 * ============================================
 * Det här är din fil! Byt ut placeholder-koden med ditt pussel/spel.
 *
 * SÅ HÄR FUNGERAR DET:
 * - init()    → Returnera din HTML som en sträng. Den injiceras i #room-content.
 * - setup()   → Sätt upp event listeners för ditt spel.
 *               Anropa onComplete() när spelaren klarat rummet.
 * - cleanup() → Ta bort alla event listeners. Viktigt så det inte blir dubbletter.
 *
 * ÄNDRA INTE: roomId (måste vara 1) och RoomModule-strukturen.
 * ÄNDRA: All HTML i init(), all logik i setup(), och CSS i styles/rooms/_room1.scss
 */

import type { RoomModule, RoomResult } from "../types";

let onCompleteCb: ((result: RoomResult) => void) | null = null;

function handleComplete(): void {
  if (onCompleteCb) {
    onCompleteCb({ roomId: 1, success: true, timeSpent: 0 });
  }
}

const room1: RoomModule = {
  init() {
    // ÄNDRA HÄR: Byt ut HTML:en nedan mot ditt pussel
    return `
      <div class="room-game room-1">
        <h3>Köksavdelningen - Pussel</h3>
        <p>Här kommer ditt pussel/spel att vara.</p>
        <button id="room1-complete" type="button">
          Klara rummet (placeholder)
        </button>
      </div>
    `;
  },

  setup(onComplete) {
    onCompleteCb = onComplete;
    // ÄNDRA HÄR: Sätt upp event listeners för ditt pussel
    const btn = document.getElementById("room1-complete");
    if (btn) {
      btn.addEventListener("click", handleComplete);
    }
  },

  cleanup() {
    onCompleteCb = null;
    // ÄNDRA HÄR: Ta bort alla event listeners du lagt till i setup()
    const btn = document.getElementById("room1-complete");
    if (btn) {
      btn.removeEventListener("click", handleComplete);
    }
  },
};

export default room1;
