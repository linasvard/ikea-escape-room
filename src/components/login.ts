/*
 * ============================================
 * LOGIN-HANTERING — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Hanterar formuläret där spelaren skriver sitt namn.
 * Används av main.ts vid uppstart.
 */

import { getElement } from "../utils/dom";

/**
 * Sätter upp login-formuläret.
 * onLogin-callbacken anropas med spelarens namn när de trycker "Starta".
 */
export function setupLogin(onLogin: (name: string) => void): void {
  const form = getElement<HTMLFormElement>("#login-form");
  const input = getElement<HTMLInputElement>("#player-name");

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault(); // Stoppar sidan från att ladda om
    const name = input.value.trim(); // Tar bort mellanslag i början/slutet
    if (name) {
      onLogin(name);
    }
  });
}
