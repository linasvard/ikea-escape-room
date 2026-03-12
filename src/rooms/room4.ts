/*
 * ============================================
 * RUM 4: KASSAN — OSCAR JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models";
import { saveHighscore, finishedGameHSEl } from "./highscore";
import { saveFinishedRoomToLS, showRoom } from "./roomProgress";
import { stopTimer } from "./timer";
import { resetGame } from "./timer";

export default function initRoom4() {
  // Hämta HTML-element - Memory
  const startBtn = document.getElementById(
    "room4-start-btn",
  ) as HTMLButtonElement;
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
  let yellowCells: number[] = [];
  let playerGuesses: number[] = [];
  let isGuessing = false;
  const correctCode = "6767";
  const codeDigits = ["6", "7", "6", "7"];
  let enteredCode = "";
  let wrongMemoryAttempts = 0;
  let wrongCodeAttempts = 0;
  const room4Start = document.getElementById("room4Start") as HTMLDivElement;
  const room4StartBtn = document.getElementById(
    "room4StartBtn",
  ) as HTMLButtonElement;

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

  // Förlust — stänger av spelet och visar meddelande
  function handleLose(reason: string): void {
    stopTimer();
    localStorage.setItem("gameState", "lost");
    message.textContent = reason;
    message.style.color = "#e74c3c";
    checkoutMessage.textContent = reason;
    checkoutMessage.style.color = "#e74c3c";
    startBtn.disabled = true;
    keys.forEach((key) => (key.disabled = true));
  }

  // Starta spelet - visa gula rutor i 5 sekunder
  function startGame() {
    yellowCells = selectRandomYellowCells();
    playerGuesses = [];
    isGuessing = false;
    message.textContent = "";

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

    let timeLeft = 3;
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
    cells.forEach((cell) => {
      cell.style.backgroundColor = "#0058a3";
      cell.textContent = "";
    });
    isGuessing = true;
    timerDisplay.textContent = "";
    instructions.textContent = "Klicka på de 4 gula rutorna!";
  }

  // Hantera klick på rutorna
  function handleCellClick(cell: HTMLDivElement, index: number) {
    if (!isGuessing) return;
    if (playerGuesses.includes(index)) return;

    playerGuesses.push(index);

    if (yellowCells.includes(index)) {
      cell.style.backgroundColor = "#ffda1a";
      cell.textContent = "✓";
      cell.setAttribute("aria-label", "Rätt cell");
    } else {
      cell.style.backgroundColor = "#e74c3c";
      cell.textContent = "✗";
      cell.setAttribute("aria-label", "Fel cell");
    }

    if (playerGuesses.length === 4) {
      checkMemoryWin();
    }
  }

  // Kontrollera om spelaren vann memoryt
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
      wrongMemoryAttempts++;
      if (wrongMemoryAttempts >= 3) {
        handleLose("Game over! Du misslyckades 3 gånger.");
        localStorage.removeItem("currentRoom"); // kör denna kod för att ta bort minnet av hur måga rum som är klarade!
        resetGame(); // resettar timern när man misslyckas med rummet
        document.querySelector("#room4memory")?.classList.add("hidden"); // tar bort memory div
        document.querySelector("#room4GameOver")?.classList.remove("hidden"); // lägger till game over sidan
        (document.querySelector("#room4GameOver") as HTMLElement)?.focus();
        document.querySelector("#headerRoom4Wrapper")?.classList.add("hidden"); // tar bort header för att skapa enhetlighet
      } else {
        message.textContent = `Fel! Du hade ${correctGuesses} av 4 rätt. ${3 - wrongMemoryAttempts} försök kvar.`;
        message.style.color = "#e74c3c";
        startBtn.disabled = false;
      }
    }
  }

  // Hantera knapptryck i kassan
  function handleKeyPress(key: string) {
    if (key === "clear") {
      enteredCode = "";
      codeDisplay.textContent = "----";
      checkoutMessage.textContent = "";
      return;
    }

    if (key === "enter") {
      if (enteredCode === correctCode) {
        saveFinishedRoomToLS();
        checkoutMessage.textContent = "Rätt kod!";
        checkoutMessage.style.color = "#27ae60";
        checkoutMessage.style.backgroundColor = "#ffffff";
        checkoutMessage.style.boxShadow = "0px 4px 8px 0px rgba(0, 0, 0, 0.3)";
        stopTimer();
        saveHighscore();
        finishedGameHSEl();
        showRoom(5);
        resetGame();
      } else {
        wrongCodeAttempts++;
        if (wrongCodeAttempts >= 3) {
          handleLose("Game over! Du angav fel kod 3 gånger. Larmet gick!");
          localStorage.removeItem("currentRoom"); // kör denna kod för att ta bort minnet av hur måga rum som är klarade!
          resetGame(); // resettar timern när man misslyckas med rummet
          document.querySelector("#room4checkout")?.classList.add("hidden"); // tar bort div
          document.querySelector("#room4GameOver")?.classList.remove("hidden"); // lägger till game over sida
          (document.querySelector("#room4GameOver") as HTMLElement)?.focus();
          document
            .querySelector("#headerRoom4Wrapper")
            ?.classList.add("hidden"); // Tar bort header för att göra det mer enhetligt med övriga rum
        } else {
          checkoutMessage.textContent = `Fel kod! ${3 - wrongCodeAttempts} försök kvar.`;
          checkoutMessage.style.color = "#e74c3c";
          checkoutMessage.style.boxShadow =
            "0px 4px 8px 0px rgba(0, 0, 0, 0.3)";
          enteredCode = "";
          codeDisplay.textContent = "----";
        }
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
    cell.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCellClick(cell, index);
      }
    });
  });
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const keyValue = key.dataset.key;
      if (keyValue) {
        handleKeyPress(keyValue);
      }
    });
  });

  room4StartBtn.addEventListener("click", () => {
    room4Start.hidden = true;
    memorySection.hidden = false;
  });
}
