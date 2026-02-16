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
  roomTimes: Record<number, number>;
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

export interface RoomModule {
  setup: (onComplete: (result: RoomResult) => void) => void;
  cleanup: () => void;
}
