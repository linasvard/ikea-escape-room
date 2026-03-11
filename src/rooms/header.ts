import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

import { resetTimer } from "./timer";

export default function initHeader() {
  const storePageBtn: HTMLButtonElement | null =
    document.querySelector("#storePageBtn");
  storePageBtn?.addEventListener("click", displayStorePage);

  function displayStorePage() {
    const locationInfo: HTMLDivElement | null =
      document.querySelector("#storePage");
    locationInfo?.classList.toggle("store-hidden");
  }

  // eftersom vi har flera knappar som kan ta oss till aboutpage så använder vi klass istället för id
  const aboutBtns: HTMLButtonElement | null =
    document.querySelectorAll(".aboutBtn");
  aboutBtns.forEach((btn) => {
    btn.addEventListener("click", displayAboutPage);
  });

  let lastVisibleRoom: HTMLElement | null = null; // håller koll på vilket det senaste rummet var som visades

  function displayAboutPage() {
    const aboutPage: HTMLElement | null = document.querySelector("#aboutPage");
    if (!aboutPage) return;

    const opening = aboutPage.classList.contains("hidden");

    if (opening) {
      // hittar nuvarande rum och gömmer just det!
      const currentRoom: HTMLElement | null =
        document.querySelector(".main-rooms:not(.hidden)");
      if (currentRoom) {
        currentRoom.classList.add("hidden");
        lastVisibleRoom = currentRoom;
      }
      aboutPage.classList.remove("hidden");
    } else {
      // Sen när man stänger så visas det rummet vi tidigare gömde!
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
    resetTimer();
    localStorage.removeItem("currentRoom");
    localStorage.removeItem("playerName");
    window.location.reload();
  }
}
