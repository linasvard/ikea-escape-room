/*
 * ============================================
 * RUM 3: TA SJÄLV-LAGRET — LINA JOBBAR HÄR
 * ============================================
 */


import optionsRoom3 from "./furniture-options-room3.json";
import type {  } from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

import { saveFinishedRoomToLS, showRoom } from "./roomProgress"; // funktioner som ligger i filen roomProgress.ts. I den filen finns info om vad varje funktion gör!
import { resetGame } from "./timer";

export default function initRoom3() {
  // Visa div:en för rum 3
  // övrig kod för rum 3

interface IOptionsRoom3 {
  id: number;
  name: string;
  type: string;
  img: string;
  correct: boolean;
}

// ==================
// Starta rum 3
// ==================

const room3StartBtn = document.querySelector("#room3StartBtn") as HTMLButtonElement;
room3StartBtn.addEventListener("click", () => {
  document.querySelector("#room3Start")?.classList.add("hidden");
  document.querySelector("#room3Part1")?.classList.remove("hidden");
});

// Del ett

const regexHylla = /^5$/;
const regexFack = /^38$/;


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

  // visa grön eller svart
  hyllaInput.style.background = hyllaValid ? "green" : "black";
  fackInput.style.background = fackValid ? "green" : "black";

  if (hyllaValid && fackValid) {
    document.querySelector("#room3Part1")?.classList.add("hidden");
    document.querySelector("#room3Part2")?.classList.remove("hidden");
  }
}
// Lyssnar på funktionen
hyllaInput.addEventListener("input", checkAndSubmitHyllaFack);
fackInput.addEventListener("input", checkAndSubmitHyllaFack);


// Del två



let wrongClicksRoom3 = 0;

function renderRoom3Options(items: IOptionsRoom3[]): void {
  const optionsContainerRoom3 = document.querySelector("#guessFurniture") as HTMLDivElement;
  if (!optionsContainerRoom3) return;

  

  const shuffledOptionsRoom3 = [...items].sort(() => Math.random() - 0.5);

  optionsContainerRoom3.innerHTML = shuffledOptionsRoom3.map((item) => `
    <div class="option-container">
      <img 
        src="${item.img}" 
        alt="Illustration av möbeln ${item.name}" 
        data-id="${item.id}" 
        class="furniture-option"
        tabindex="0"
        role="button"
        aria-label="Välj ${item.name}">
      <!---<p>${item.id}</p>--->
    </div>
  `).join("");

  const furnitureOptions = optionsContainerRoom3.querySelectorAll(".furniture-option");
  
  furnitureOptions.forEach(item => {
    // Hantera klick med mus
    item.addEventListener("click", () => handleSelection(item));
    
    // Hantera klick med tangentbord (Enter eller Space)
    item.addEventListener("keydown", (e) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === "Enter" || keyEvent.key === " ") {
        e.preventDefault();
        handleSelection(item);
      }
    });
  });

  function handleSelection(item: Element): void {
    const selectedId = item.getAttribute("data-id");

    if (selectedId === "1") {
      saveFinishedRoomToLS();
      document.querySelector("#room3Part2")?.classList.add("hidden");
      document.querySelector("#room3End")?.classList.remove("hidden");

      const goToRoom4Btn = document.querySelector('#room3ToRoom4Btn') as HTMLButtonElement;
      goToRoom4Btn.addEventListener('click', () => {
        showRoom(4);
      });

    } else {
      wrongClicksRoom3++;
      
      if (wrongClicksRoom3 >= 2) {
        resetGame(); // resettar timern när man misslyckas med rummet
        document.querySelector("#room3Part2")?.classList.add("hidden");
        document.querySelector("#room3GameOver")?.classList.remove("hidden");
        document.querySelector("#room2Start")?.classList.add("hidden");
        
      } else {
        document.querySelector("#warnOverlayRoom3")?.classList.add("show");
      }
    }
  }
}
// stänga popup
document.querySelector("#closeWarnPopupRoom3Btn")?.addEventListener("click", () => {
  document.querySelector("#warnOverlayRoom3")?.classList.remove("show");
});
renderRoom3Options(optionsRoom3);

}
