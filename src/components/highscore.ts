/*
 * ============================================
 * HIGHSCORE-LISTA — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Hämtar top 3 från localStorage och visar dem som en lista.
 */

import { getHighscores } from "../utils/storage";
import { formatTime } from "../utils/timer";
import { getElement } from "../utils/dom";

/** Renderar highscore-listan i #highscoreList */
