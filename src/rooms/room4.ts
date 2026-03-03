/*
 * ============================================
 * RUM 4: KASSAN — OSCAR JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models";

export default function initRoom4() {
  // Hämta HTML-element - Memory
  const startBtn = document.getElementById(
    "room4-start-btn",
  ) as HTMLButtonElement;
  const grid = document.getElementById("room4-grid") as HTMLDivElement;
  const cells = document.querySelectorAll(
    ".room4-cell",
  ) as NodeListOf<HTMLDivElement>;
  const instructions = document.getElementById(
    "room4-instructions",
  ) as HTMLParagraphElement;
  const timerDisplay = document.getElementById(
    "room4-timer",
  ) as HTMLParagraphElement;
  const message = document.getElementById(
    "room4-message",
  ) as HTMLParagraphElement;
  const memorySection = document.getElementById(
    "room4memory",
  ) as HTMLDivElement;
  const checkoutSection = document.getElementById(
    "room4checkout",
  ) as HTMLDivElement;
  const codeDisplay = document.getElementById(
    "room4CodeDisplay",
  ) as HTMLSpanElement;
  const checkoutMessage = document.getElementById(
    "room4CheckoutMessage",
  ) as HTMLParagraphElement;
  const keys = document.querySelectorAll(
    ".room4-key",
  ) as NodeListOf<HTMLButtonElement>;

  // Spelvariabler
  let yellowCells: number[] = []; // Vilka rutor som är gula
  let playerGuesses: number[] = []; // Spelarens gissningar
  let isGuessing = false; // Är spelaren i gissningsfasen?
  const correctCode = "6767";
  const codeDigits = ["6", "7", "6", "7"];
  let enteredCode = "";

  // Välj 4 slumpmässiga rutor som ska vara gula
  function selectRandomYellowCells(): number[] {
    const indices: number[] = [];

    while (indices.length < 4) {
      const randomIndex = Math.floor(Math.random() * 10);

      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    return indices;
  }

  // Starta spelet - visa gula rutor i 5 sekunder
  function startGame() {
    // Återställ spelet
    yellowCells = selectRandomYellowCells();
    playerGuesses = [];
    isGuessing = false;
    message.textContent = "";

    // Visa gula rutor
    cells.forEach((cell, index) => {
      cell.textContent = "";
      if (yellowCells.includes(index)) {
        cell.style.backgroundColor = "#ffda1a";
        cell.style.color = "#333";
        cell.style.fontSize = "1.5rem";
        cell.style.fontWeight = "bold";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        const digitIndex = yellowCells.indexOf(index);
        cell.textContent = codeDigits[digitIndex];
      } else {
        cell.style.backgroundColor = "#0058a3";
      }
    });

    // Starta timer
    let timeLeft = 5;
    timerDisplay.textContent = `Tid kvar: ${timeLeft} sekunder`;
    startBtn.disabled = true;

    const timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Tid kvar: ${timeLeft} sekunder`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        hideYellowCells();
      }
    }, 1000);
  }

  // Dölj gula rutor och börja gissningsfasen
  function hideYellowCells() {
    // Gör ala rutor blåa igen
    cells.forEach((cell) => {
      cell.style.backgroundColor = "#0058a3";
      cell.textContent = "";
    });

    // Aktivera gissningsfasen
    isGuessing = true;
    timerDisplay.textContent = "";
    instructions.textContent = "Klicka på de 4 gula rutorna!";
  }

  // Hantera klick på rutorna
  function handleCellClick(cell: HTMLDivElement, index: number) {
    // Ignorera om inte i gissningsfasen
    if (!isGuessing) return;

    // Ignorera om redan klickad
    if (playerGuesses.includes(index)) return;

    // Lägg till gissningen
    playerGuesses.push(index);

    // Visa om rätt eller fel
    if (yellowCells.includes(index)) {
      cell.style.backgroundColor = "#ffda1a"; // Gult för rätt
    } else {
      cell.style.backgroundColor = "#e74c3c"; // Röd för fel
    }

    // Kolla om spelaren har klickat 4 gånger
    if (playerGuesses.length === 4) {
      checkMemoryWin();
    }
  }

  // Kontrollera om spelaren vann
  function checkMemoryWin() {
    isGuessing = false;

    const correctGuesses = playerGuesses.filter((guess) =>
      yellowCells.includes(guess),
    ).length;

    if (correctGuesses === 4) {
      message.textContent = "Rätt! Nu ska du skriva in koden i kassan...";
      message.style.color = "#27ae60";

      setTimeout(() => {
        memorySection.hidden = true;
        checkoutSection.hidden = false;
      }, 2000);
    } else {
      message.textContent = `Fel! Du hade ${correctGuesses} av 4 rätt. Försök igen!`;
      message.style.color = "#e74c3c";
      startBtn.disabled = false;
    }
  }

  function handleKeyPress(key: string) {
    if (key === "clear") {
      enteredCode = "";
      codeDisplay.textContent = "----";
      checkoutMessage.textContent = "";
      return;
    }

    if (key === "enter") {
      if (enteredCode === correctCode) {
        checkoutMessage.textContent = "Rätt kod!";
        checkoutMessage.style.color = "#27ae60";
      } else {
        checkoutMessage.textContent = "Fel kod! Försök igen.";
        checkoutMessage.style.color = "#e74c3c";
        enteredCode = "";
        codeDisplay.textContent = "----";
      }
      return;
    }

    if (enteredCode.length < 4) {
      enteredCode += key;

      let display = "";
      for (let i = 0; i < 4; i++) {
        display += enteredCode[i] || "-";
      }
      codeDisplay.textContent = display;
    }
  }

  // Event listeners
  startBtn.addEventListener("click", startGame);
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
  });
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const keyValue = key.dataset.key;
      if (keyValue) {
        handleKeyPress(keyValue);
      }
    });
  });
}
