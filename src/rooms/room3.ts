/*
 * ============================================
 * RUM 3: TA SJÄLV-LAGRET — LINA JOBBAR HÄR
 * ============================================
 */

import type {  } from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initRoom3() {
  // Visa div:en för rum 3

  // övrig kod för rum 3
}

const regexHylla = /^15$/;
const regexFack = /^42$/;

const formFackHylla = document.querySelector("#guessHyllaFackSection") as HTMLFormElement;
const fackInput = document.querySelector("#fackInput") as HTMLInputElement;
const hyllaInput = document.querySelector("#hyllaInput") as HTMLInputElement;

function validateHyllaInput(value: string): boolean {
  return regexHylla.test(value);
}

function validateFackInput(value: string): boolean {
  return regexFack.test(value);
}

function checkAndSubmitHyllaFack() {
  const hyllaValid = validateHyllaInput(hyllaInput.value);
  const fackValid = validateFackInput(fackInput.value);

  // visa grön eller röd - för testning
  hyllaInput.style.background = hyllaValid ? "green" : "black";
  fackInput.style.background = fackValid ? "green" : "black";

  if (hyllaValid && fackValid) {
    formFackHylla.submit();
  }
}

// Lyssnar på funktionen
hyllaInput.addEventListener("input", checkAndSubmitHyllaFack);
fackInput.addEventListener("input", checkAndSubmitHyllaFack);

