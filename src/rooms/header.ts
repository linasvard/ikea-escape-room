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

  const aboutBtn: HTMLButtonElement | null =
    document.querySelector("#aboutBtn");
  aboutBtn?.addEventListener("click", displayAboutPage);

  function displayAboutPage() {
    const aboutPage: HTMLElement | null = document.querySelector("#aboutPage");
    aboutPage?.classList.toggle("hidden");
  }

  const homeBtn: HTMLButtonElement | null = document.querySelector("#homeBtn");
  const homeFromHSBtn: HTMLButtonElement | null = document.querySelector("#homeFromHSBtn");
  homeBtn?.addEventListener("click", goToHomePage);
  homeFromHSBtn?.addEventListener("click", goToHomePage);

  function goToHomePage() {
    resetTimer();
    localStorage.removeItem("currentRoom");
    window.location.reload();
  }
}
