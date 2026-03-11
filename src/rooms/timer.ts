const TIMER_STORAGE_KEY = "gameTimerState";

let elapsedTime = 0;
let intervalId: number | null = null;
let isRunning = false;

function saveTimer() {
  const timerState = {
    elapsedTime,
    isRunning,
  };
  localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerState));
}

function loadTimer() {
  const saved = localStorage.getItem(TIMER_STORAGE_KEY);
  if (!saved) {
    return;
  }

  const parsedState = JSON.parse(saved);

  elapsedTime = parsedState.elapsedTime ?? 0;
  isRunning = parsedState.isRunning ?? false;
}

function startTimer() {
  if (intervalId !== null) return;

  isRunning = true;

  intervalId = setInterval(() => {
    elapsedTime += 1000;
    updateDisplay();
    saveTimer();
  }, 1000);
}

export function stopTimer() {
  if (intervalId === null) return;

  clearInterval(intervalId);
  intervalId = null; // när vi stoppar timern så ändrar vi ID till null
  isRunning = false; // samt att vi ändrar värdet på isRunning till false, eftersom den inte tickar längre! :)
  saveTimer(); // sen sparar vi i vår saveTimer()
}

function updateDisplay() {
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  const displayMinutes = String(minutes).padStart(2, "0"); // funktion som säger att strängen 'minutes' alltid ska vara längden två, och om det bara finns en sträng i minutes, så läggs det till en 0:a framför.
  const displaySeconds = String(seconds).padStart(2, "0"); // funktion som säger att strängen 'seconds' alltid ska vara längden två, och om det bara finns en sträng i seconds, så läggs det till en 0:a framför.

  const timerDisplay = document.querySelector("#timerDisplay");
  if (!timerDisplay) {
    return;
  }
  timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`; // byter ut innehållet i spanen timerDisplay från 00:00 till den tiden som gått i spelet
}

export function initTimer() {
  loadTimer();

  const timerEl = document.querySelector("#mainTimer");
  if (!timerEl) return;

  timerEl.innerHTML = `<span>Speltid: </span><span id="timerDisplay">00:00</span>`;

  updateDisplay();

  if (isRunning === true) {
    startTimer();
  }

  const startBtn = document.querySelector("#startGameBtn");
  startBtn?.addEventListener("click", startTimer);
}

export function getElapsedTime() {
  return elapsedTime;
}

export function resetTimer() { // denna kör vi 
  stopTimer();

  elapsedTime = 0;

  updateDisplay();

  localStorage.removeItem("gameTimerState");
  localStorage.removeItem("playerName");
}
