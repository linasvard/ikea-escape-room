//@ts-nocheck
/*
 * ============================================
 * MAIN.TS — SPELETS HJÄRNA — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Den här filen kopplar ihop ALLT: login, rum, timers, progress, highscore.
 *
 * Det enda ni kan behöva ändra här är om ni lägger till fler rum
 * eller vill ändra spellogiken — men prata med gruppen först!
 */

/* ============================================
 * Imports — hämtar alla moduler vi byggt
 * ============================================ */
// import roomsData from "./data/rooms.json"; // Låter denna ligga kvar om vi vill använda en .json för att spara info om våra rum.

import "./styles/main.scss"; // importerar scss till .ts som sedan körs i html via script-taggen

import type {} from "./types/models";

import initRoom1 from "./rooms/room1"; // importerar funktionen initRoom1 från filen room1.ts i mappen rooms
import initRoom2 from "./rooms/room2"; // importerar funktionen initRoom2 från filen room2.ts i mappen rooms
import initRoom3 from "./rooms/room3"; // importerar funktionen initRoom3 från filen room3.ts i mappen rooms
import initRoom4 from "./rooms/room4"; // importerar funktionen initRoom4 från filen room4.ts i mappen rooms

initRoom1(); // kör funktionen initRoom1 som vi importerat från filen room1.ts i mappen rooms
initRoom2(); // kör funktionen initRoom2 som vi importerat från filen room2.ts i mappen rooms
initRoom3(); // kör funktionen initRoom3 som vi importerat från filen room3.ts i mappen rooms
initRoom4(); // kör funktionen initRoom4 som vi importerat från filen room4.ts i mappen rooms
