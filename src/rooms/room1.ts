/*
 * ============================================
 * RUM 1: BARNAVDELNINGEN — ELENA JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models";


import { saveFinishedRoomToLS, showRoom } from "./roomProgress";

export default function initRoom1() {
  const introductionDiv = document.getElementById("introductionDiv");
  const startRoom1Btn = document.getElementById("startRoom1Btn");

  // STARTKNAPP
  startRoom1Btn?.addEventListener("click", () => {
    introductionDiv?.classList.add("hidden");
  });

  // ALLA RESETKNAPPAR
  document.querySelectorAll(".resetBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      resetRoom1();
      introductionDiv?.classList.remove("hidden");
    });
  });

  // -------------------------
  // MONKEY-ZONE
  // -------------------------
  // let monkeyUsed = false;
  const zoneMonkey = document.getElementById("zoneMonkey");
  const monkeyDialog = document.getElementById("monkeyDialog");
  const submitMonkeyArgument = document.getElementById("submitMonkeyArgument");

  zoneMonkey?.addEventListener("click", () => {
    monkeyDialog?.classList.remove("hidden");
  });

  submitMonkeyArgument?.addEventListener("click", () => {
    const selected = document.querySelector<HTMLInputElement>(
      'input[name="monkey-choose-argument"]:checked',
    );

    if (!selected) {
      alert("Välj ett argument först!");
      return;
    }

    monkeyDialog?.classList.add("hidden");
    // monkeyUsed = true;

    if (selected.value === "E") {
      document
        .querySelector("#zonePillow")
        ?.classList.replace("zone-inactive", "zone-active");
      
      showArrow("arrow2");
      showArrow("arrow3");
      hideArrow("arrow1");
    } else {
      handleTantrum("wantmonkeyTantrum", "wantmonkeyTantrumBtn");
    }
  });

  // -------------------------
  // PILLOW-ZONE
  // -------------------------
  const zonePillow = document.getElementById("zonePillow");
  const pillowArgument = document.getElementById("pillowArgument");
  const submitPillowArgument = document.getElementById("submitPillowArgument");

  zonePillow?.addEventListener("click", () => {
    pillowArgument?.classList.remove("hidden");
  });

  submitPillowArgument?.addEventListener("click", () => {
    const selected = document.querySelector<HTMLInputElement>(
      'input[name="pillow-choose-argument"]:checked',
    );

    pillowArgument?.classList.add("hidden");

    if (!selected) {
      alert("Välj ett argument först!");
      return;
    }

    if (selected.value === "C") {
      document
        .querySelector("#zoneChair")
        ?.classList.replace("zone-inactive", "zone-active");
      document
        .querySelector("#zoneBedsheets")
        ?.classList.replace("zone-inactive", "zone-active");

      showArrow("arrow4");
      showArrow("arrow5");
      hideArrow("arrow2");
      hideArrow("arrow3");
    } else {
      handleTantrum("wantPillowTantrum", "wantPillowTantrumBtn");
    }
  });

  // -------------------------
  // BEDSHEETS-ZONE
  // -------------------------
  const zoneBedsheets = document.getElementById("zoneBedsheets");
  const bedsheetDialog = document.getElementById("bedsheetDialog");

  zoneBedsheets?.addEventListener("click", () => {
    bedsheetDialog?.classList.remove("hidden");
  });

  // -------------------------
  // CHAIR-ZONE
  // -------------------------
  const zoneChair = document.getElementById("zoneChair");
  const chairDialog = document.getElementById("chairDialog");
  const chairDialogBtn = document.getElementById("chairDialogBtn");

  zoneChair?.addEventListener("click", () => {
    chairDialog?.classList.remove("hidden");
  });

  chairDialogBtn?.addEventListener("click", () => {
    chairDialog?.classList.add("hidden");

    document
      .querySelector(".zone-lamp")
      ?.classList.replace("zone-inactive", "zone-active");

    showArrow("arrow6");
    showArrow("arrow7");
    showArrow("arrow9");
    hideArrow("arrow4");
    hideArrow("arrow5");
  });

  // -------------------------
  // LAMP-ZONE
  // -------------------------
  const zoneLamp = document.getElementById("zoneLamp");
  const lampDialog = document.getElementById("lampDialog");
  const lampDialogBtn = document.getElementById("lampDialogBtn");
  const zoneSuccess = document.getElementById("zoneSuccess");

  zoneLamp?.addEventListener("click", () => {
    lampDialog?.classList.remove("hidden");
  });

  lampDialogBtn?.addEventListener("click", () => {
    lampDialog?.classList.add("hidden");
    zoneSuccess?.classList.replace("zone-inactive", "zone-active");

    saveFinishedRoomToLS(); // funktion som ligger i roomProgress.ts som sparar vilket rum man klarat i LocalStorage

    showArrow("arrow8");
    hideArrow("arrow6");
    hideArrow("arrow7");
    hideArrow("arrow9");
  });

  // -------------------------
  // EXIT-ZONE
  // -------------------------
  zoneSuccess?.addEventListener("click", () => {
    showRoom(2);
    resetRoom1();
    
  });
}

// -------------------------
// TANTRUM-HANDLER
// -------------------------
function handleTantrum(dialogId: string, btnId: string) {
  const tantrum = document.getElementById(dialogId);

  tantrum?.classList.remove("hidden");

  document.getElementById(btnId)?.addEventListener(
    "click",
    () => {
      tantrum?.classList.add("hidden");
      resetRoom1();
    },
    { once: true },
  );
}

// -------------------------
// RESET-FUNKTION
// -------------------------
function resetRoom1() {
  // Nollställ zoner
  document.querySelectorAll(".zone").forEach((zone) => {
    zone.classList.replace("zone-active", "zone-inactive");
  });

  // Nollställ radioknappar
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    (radio as HTMLInputElement).checked = false;
  });

  // Dölj alla dialoger
  const allDialogs = [
    "wantmonkeyTantrum",
    "wantPillowTantrum",
    "chairDialog",
    "lampDialog",
    "bedsheetDialog",
    "monkeyDialog",
    "pillowArgument",
  ];

  allDialogs.forEach((id) => {
    document.getElementById(id)?.classList.add("hidden");
  });

  // Dölj alla arrows
  document.querySelectorAll(".arrow").forEach((arrow) => {
    arrow.classList.remove("visible");
  });
}

// -------------------------
// HJÄLPFUNKTIONER
// -------------------------
function showArrow(id: string) {
  document.getElementById(id)?.classList.add("visible");
}

function hideArrow(id: string) {
  document.getElementById(id)?.classList.remove("visible");
}
