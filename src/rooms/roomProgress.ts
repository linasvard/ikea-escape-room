import type {} from "../types/models";

const ROOM_KEY = "currentRoom";

function getCurrentRoom(): number {
  const savedRoom = localStorage.getItem(ROOM_KEY);
  if (savedRoom === null) {
    // om den inte har någonting sparat i localStorage under ROOM_KEY, så lägger den automatiskt till en 1 för första rummet. Kanske ska bytas till 0 om vi kallar skärmen för att skriva in namnet room0
    return 0;
  }

  // Om det finns sparad progress så lägger vi till
  const roomNumber = parseInt(savedRoom);
  return roomNumber;
}

function setCurrentRoom(roomNumber: number): void {
  localStorage.setItem(ROOM_KEY, roomNumber.toString());
}

export function showRoom(roomNumber: number): void {
  document
    .querySelectorAll(".main-rooms")
    .forEach((room) => room.classList.add("hidden"));

  document.querySelector(`#room${roomNumber}`)?.classList.remove("hidden");
}

export function saveFinishedRoomToLS(): void {
  const currentRoom = getCurrentRoom();
  const nextRoom = currentRoom + 1;
  console.log(`Nu har du klarat rum ${currentRoom}`);
  setCurrentRoom(nextRoom);
  // showRoom(nextRoom);

  const completedRooms = nextRoom - 1;
  const progressFill = document.querySelector(
    "#progressBarFill",
  ) as HTMLDivElement;
  const progressText = document.querySelector(
    "#progressText",
  ) as HTMLSpanElement;
  if (progressFill) progressFill.style.width = `${(completedRooms / 4) * 100}%`;
  if (progressText)
    progressText.textContent = `${completedRooms} / 4 rum klarade`;
}

export function initRoomProgress(): void {
  // denna funktion körs när man laddar eller refreshar sidan!
  const currentRoom = getCurrentRoom(); //hämtar vilket rum man befinner sig i via funktionen getCurrentRoom() som finns längre upp
  showRoom(currentRoom); // kör funktionen showRoom(). den anpassar sig beroende på vilket rum man har sparat i currentRoom från local storage.
  setCurrentRoom(currentRoom); // denna funktion kör vi för att den alltid ska bestämma vilket rum vi är i när man kör sidan. har vi inget i LS så blir det currentRoom = 1. Det gör att rummet med id="room1" visas. Hade vi haft currentRoom = 2 så visas istället rummet med id="room2"

  const completedRooms = currentRoom - 1;
  const progressFill = document.querySelector(
    "#progressBarFill",
  ) as HTMLDivElement;
  const progressText = document.querySelector(
    "#progressText",
  ) as HTMLSpanElement;
  if (currentRoom === 0) {
    if (progressFill) {
      progressFill.style.width = `0 / 4 rum klarade`;
    }
  } else {
    if (progressFill) {
      progressFill.style.width = `${(completedRooms / 4) * 100}%`;
    }
    if (progressText) {
      progressText.textContent = `${completedRooms} / 4 rum klarade`;
    }
  }
}
