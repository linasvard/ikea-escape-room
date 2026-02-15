/*
 * ============================================
 * DOM-HJÄLPFUNKTIONER — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Dessa funktioner används av flera filer i projektet.
 * Om du ändrar här kan det gå sönder för alla.
 */

/**
 * Hämtar ett HTML-element via CSS-selektor.
 * Kastar ett fel om elementet inte finns — så vi slipper kolla null överallt.
 */
export function getElement<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) {
    throw new Error(`Element hittades inte: ${selector}`);
  }
  return el;
}

/**
 * Visar en specifik skärm och döljer alla andra.
 * Fungerar genom att lägga till/ta bort klassen "active".
 * CSS:en i _layout.scss gör att .screen = dold, .screen.active = synlig.
 */
export function showScreen(screenId: string): void {
  const screens = document.querySelectorAll<HTMLElement>(".screen");
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }
}
