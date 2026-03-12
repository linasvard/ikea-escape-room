
import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

import { resetGame } from "./timer";


export default function initHeader() {
  const storePageBtn: HTMLButtonElement | null =
    document.querySelector("#storePageBtn");
  storePageBtn?.addEventListener("click", displayStorePage);

  function displayStorePage() {
    const locationInfo: HTMLDivElement | null =
      document.querySelector("#storePage");
    locationInfo?.classList.toggle("store-hidden");
  }

  // there are multiple about buttons so we get a NodeList
  const aboutBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".aboutBtn");
  aboutBtns.forEach((btn) => {
    btn.addEventListener("click", displayAboutPage);
  });

  // keep track of which room we hid when the about page opened
  let lastVisibleRoom: HTMLElement | null = null;

  function displayAboutPage() {
    const aboutPage: HTMLElement | null = document.querySelector("#aboutPage");
    if (!aboutPage) return;

    const opening = aboutPage.classList.contains("hidden");

    if (opening) {
      // find currently visible room and hide it
      const currentRoom: HTMLElement | null =
        document.querySelector<HTMLElement>(".main-rooms:not(.hidden)");
      if (currentRoom) {
        currentRoom.classList.add("hidden");
        lastVisibleRoom = currentRoom;
      }
      aboutPage.classList.remove("hidden");
    } else {
      // closing the about page: restore the room we hid earlier
      aboutPage.classList.add("hidden");
      if (lastVisibleRoom) {
        lastVisibleRoom.classList.remove("hidden");
        lastVisibleRoom = null;
      }
    }
  }

  const homeBtn: HTMLButtonElement | null = document.querySelector("#homeBtn");
  const homeFromHSBtn: HTMLButtonElement | null = document.querySelector("#homeFromHSBtn");
  homeBtn?.addEventListener("click", goToHomePage);
  homeFromHSBtn?.addEventListener("click", goToHomePage);

  function goToHomePage() {
    resetGame();
    localStorage.removeItem("currentRoom");
    localStorage.removeItem("playerName");
    window.location.reload();
  }
}

