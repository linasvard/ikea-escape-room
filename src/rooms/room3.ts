/*
 * ============================================
 * RUM 3: TA SJÄLV-LAGRET — LINA JOBBAR HÄR
 * ============================================
 */
import optionsRoom3 from "./furniture-options-room3.json";
import type {  } from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initRoom3() {
  // Visa div:en för rum 3

  // övrig kod för rum 3
}

const regexHylla = /^15$/;
const regexFack = /^42$/;

// const formFackHylla = document.querySelector("#guessHyllaFackSection") as HTMLFormElement;
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
    document.querySelector("#room3Part1")?.classList.add("hidden");
    document.querySelector("#room3Part2")?.classList.remove("hidden");
  }
}
// Lyssnar på funktionen
hyllaInput.addEventListener("input", checkAndSubmitHyllaFack);
fackInput.addEventListener("input", checkAndSubmitHyllaFack);


// Del två

interface IOptionsRoom3 {
  id: number;
  name: string;
  type: string;
  img: string;
}

function renderRoom3Options(items: IOptionsRoom3[]): void {
  const optionsContainerRoom3 = document.querySelector("#guessFurniture") as HTMLDivElement;
  if (!optionsContainerRoom3) return;

  optionsContainerRoom3.innerHTML = ""; // Rensa tidigare innehåll

  optionsContainerRoom3.innerHTML = items.map((item) => `
    <div class="optionContainer"><img src="${item.img}" alt="${item.name}" data-id="${item.id}" class="furniture-option">
    <p>${item.id}</p></div>
  `)
  .join("");
}

renderRoom3Options(optionsRoom3);

// 

/* function renderFurnitureOptions(options: IOptionsRoom3[]) {
  const furnitureOptionsContainer = document.querySelector("#guessFurniture") as HTMLDivElement;
  furnitureOptionsContainer.innerHTML = ""; // Rensa tidigare innehåll
  options.forEach(option => {
    const imgElement = document.createElement("img");
    imgElement.src = option.img;
    imgElement.alt = option.name;
    imgElement.dataset.id = option.id.toString();
    imgElement.addEventListener("click", () => {
      // Här kan du lägga till logik för vad som händer när en möbel klickas på
      console.log(`Vald möbel: ${option.name}`);
    });
    furnitureOptionsContainer.appendChild(imgElement);
  }
  );
}

// Anropa funktionen för att rendera möbelalternativen
renderFurnitureOptions(optionsRoom3);  */