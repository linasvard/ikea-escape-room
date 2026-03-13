
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
  const aboutBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".aboutBtn");
  aboutBtns.forEach((btn) => {
    btn.addEventListener("click", displayAboutPage);
  });

  let lastVisibleRoom: HTMLElement | null = null;

  function displayAboutPage() {
    const aboutPage: HTMLElement | null = document.querySelector("#aboutPage");
    if (!aboutPage) return;

    const opening = aboutPage.classList.contains("hidden");

    if (opening) {
      const currentRoom: HTMLElement | null =
        document.querySelector<HTMLElement>(".main-rooms:not(.hidden)");
      if (currentRoom) {
        currentRoom.classList.add("hidden");
        lastVisibleRoom = currentRoom;
      }
      aboutPage.classList.remove("hidden");
    } else {
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

  const pageAudio: HTMLAudioElement | null = document.querySelector("#storeAudio");
  document.querySelector('#storeAudio').volume = 0.05;
  const audioBtn: HTMLButtonElement | null = document.querySelector("#audioBtn");

  const iconOn = document.getElementById("audioIconOn");
  const iconOff = document.getElementById("audioIconOff");

  audioBtn.addEventListener("click", () => {
  if (pageAudio.paused) {
    pageAudio.play();
    iconOn.classList.remove('hidden');
    iconOff.classList.add('hidden');
    } else {
    pageAudio.pause();
    iconOff.classList.remove('hidden');
    iconOn.classList.add('hidden');
    }
  });

}
