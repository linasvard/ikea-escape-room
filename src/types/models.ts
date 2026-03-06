/*
 * ============================================
 * ==============DELADE TYPER==================
 * ============================================
 */

export interface ILamp {
  id: number;
  on: boolean;
}

export interface ITimerState {
  isRunning: boolean;
  elapsedTime: number;
  intervalId: number |null;
}