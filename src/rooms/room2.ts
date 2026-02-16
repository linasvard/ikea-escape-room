/*
 * ============================================
 * RUM 2: MATTORNA — ERIK JOBBAR HÄR
 * ============================================
 */

import type { RoomModule, RoomResult } from "../types";

let onCompleteCb: ((result: RoomResult) => void) | null = null;

function handleComplete(): void {
  if (onCompleteCb) {
    onCompleteCb({ roomId: 2, success: true, timeSpent: 0 });
  }
}

const room2: RoomModule = {
  setup(onComplete) {
    onCompleteCb = onComplete;
    const btn = document.getElementById("room2-complete");
    if (btn) {
      btn.addEventListener("click", handleComplete);
    }
  },

  cleanup() {
    onCompleteCb = null;
    const btn = document.getElementById("room2-complete");
    if (btn) {
      btn.removeEventListener("click", handleComplete);
    }
  },
};

export default room2;
