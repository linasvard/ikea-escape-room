/*
 * ============================================
 * TIMER-LOGIK — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Används för både rum-timern och total-timern.
 */

/** Gör om sekunder till "MM:SS" — t.ex. 125 → "02:05" */
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Skapar en timer som räknar upp varje sekund.
 * onTick anropas varje sekund med antal sekunder som gått.
 *
 * Användning:
 *   const timer = createTimer((s) => console.log(s));
 *   timer.start();  // Börja räkna
 *   timer.stop();   // Pausa
 *   timer.reset();  // Nollställ
 *   timer.getTime(); // Hämta nuvarande tid
 */
export function createTimer(onTick: (seconds: number) => void) {
  let seconds = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  return {
    start() {
      if (intervalId) return;
      intervalId = setInterval(() => {
        seconds++;
        onTick(seconds);
      }, 1000);
    },
    stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    reset() {
      this.stop();
      seconds = 0;
      onTick(seconds);
    },
    getTime() {
      return seconds;
    },
    setTime(s: number) {
      seconds = s;
    },
  };
}
