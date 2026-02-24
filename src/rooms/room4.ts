/*
 * ============================================
 * RUM 4: KASSAN — OSCAR JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models";

export default function initRoom4() {
  // Hämta HTML-element
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

  // Spelvariabler
  let yellowCells: number[] = []; // Vilka rutor som är gula
  let playerGuesses: number[] = []; // Spelarens gissningar
  let isGuessing = false; // Är spelaren i gissningsfasen?

  // Välj 5 slumpmässiga rutor som ska vara gula
  function selectRandomYellowCells(): number[] {
    const indices: number[] = [];

    while (indices.length < 5) {
      const randomIndex = Math.floor(Math.random() * 10);

      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    return indices;
  }

  // Starta spelet - visa gula rutor i 15 sekunder
  function startGame() {
    // Återställ spelet
    yellowCells = selectRandomYellowCells();
    playerGuesses = [];
    isGuessing = false;
    message.textContent = "";

    // Visa gula rutor
    cells.forEach((cell, index) => {
      if (yellowCells.includes(index)) {
        cell.style.backgroundColor = "#ffda1a";
      } else {
        cell.style.backgroundColor = "#0058a3";
      }
    });

    // Starta timer
    let timeLeft = 15;
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
    });

    // Aktivera gissningsfasen
    isGuessing = true;
    timerDisplay.textContent = "";
    instructions.textContent = "Klicka på de 5 gula rutorna!";
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

    // Kolla om spelaren har klickat 5 gånger
    if (playerGuesses.length === 5) {
      checkWin();
    }
  }

  // Kontrollera om spelaren vann
  function checkWin() {
    isGuessing = false;

    // Räkna rätt gissningar
    const correctGuesses = playerGuesses.filter((guess) =>
      yellowCells.includes(guess),
    ).length;

    if (correctGuesses === 5) {
      message.textContent = "Grattis! Du klarade rummet!";
      message.style.color = "#27ae60";
    } else {
      message.textContent = `Fel! Du hade ${correctGuesses} av 5. Försök igen!`;
      message.style.color = "#e74c3c";
      startBtn.disabled = false;
    }
  }

  // Event listeners
  startBtn.addEventListener("click", startGame);
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
  });
  console.log("Room 4 loaded!");
  console.log("Number of cells:", cells.length);
}
