/*
 * ============================================
 * DELADE TYPER — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Dessa typer används av ALLA filer i projektet.
 * Om du ändrar något här kan det påverka andras kod.
 * Prata med gruppen först!
 */

/** Data för ett rum, laddas från rooms.json */
export interface RoomData {
  id: number;
  name: string;
  description: string;
}

/** Spelarens sparade progress i localStorage */
export interface PlayerProgress {
  playerName: string;
  currentRoom: number;
  completedRooms: number[];
  roomTimes: Record<number, number>; // rum-id -> tid i sekunder
  totalTime: number;
}

/** En rad i highscore-listan */
export interface HighscoreEntry {
  name: string;
  totalTime: number;
  date: string;
}

/** Resultatet som skickas tillbaka när ett rum är klart */
export interface RoomResult {
  roomId: number;
  success: boolean;
  timeSpent: number;
}

/*
 * VIKTIGT FÖR ALLA SOM BYGGER ETT RUM:
 * Ditt rum MÅSTE följa detta interface.
 * - init() → returnera HTML som en sträng
 * - setup() → sätt upp event listeners, anropa onComplete när spelaren klarat rummet
 * - cleanup() → ta bort event listeners när man lämnar rummet
 */
export interface RoomModule {
  init: () => string;
  setup: (onComplete: (result: RoomResult) => void) => void;
  cleanup: () => void;
}
