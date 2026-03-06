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

  // Håller koll på vilka zoner som redan använts denna runda
  const usedZones = new Set<string>();

  // STARTKNAPP
  startRoom1Btn?.addEventListener("click", () => {
    introductionDiv?.classList.add("hidden");
  });

  // ALLA RESETKNAPPAR
  document.querySelectorAll(".resetBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      usedZones.clear();
      resetRoom1();
      introductionDiv?.classList.remove("hidden");
    });
  });

  // -------------------------
  // MONKEY-ZONE
  // -------------------------
  const zoneMonkey = document.getElementById("zoneMonkey");
  const monkeyDialog = document.getElementById("monkeyDialog");
  const submitMonkeyArgument = document.getElementById("submitMonkeyArgument");

  zoneMonkey?.addEventListener("click", () => {
    if (usedZones.has("monkey")) return;
    usedZones.add("monkey");
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

    if (selected.value === "E") {
      document
        .querySelector("#zonePillow")
        ?.classList.replace("zone-inactive", "zone-active");

      showArrow("arrow2");
    } else {
      handleTantrum("wantmonkeyTantrum", "wantmonkeyTantrumBtn", usedZones);
    }
  });

  // -------------------------
  // PILLOW-ZONE
  // -------------------------
  const zonePillow = document.getElementById("zonePillow");
  const pillowArgument = document.getElementById("pillowArgument");
  const submitPillowArgument = document.getElementById("submitPillowArgument");

  zonePillow?.addEventListener("click", () => {
    if (usedZones.has("pillow")) return;
    usedZones.add("pillow");
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

      showArrow("arrow3");
      showArrow("arrow4");
    } else {
      handleTantrum("wantPillowTantrum", "wantPillowTantrumBtn", usedZones);
    }
  });

  // -------------------------
  // BEDSHEETS-ZONE
  // -------------------------
  const zoneBedsheets = document.getElementById("zoneBedsheets");
  const bedsheetDialog = document.getElementById("bedsheetDialog");

  zoneBedsheets?.addEventListener("click", () => {
    if (usedZones.has("bedsheets")) return;
    usedZones.add("bedsheets");
    bedsheetDialog?.classList.remove("hidden");
  });

  // -------------------------
  // CHAIR-ZONE
  // -------------------------
  const zoneChair = document.getElementById("zoneChair");
  const chairDialog = document.getElementById("chairDialog");
  const chairDialogBtn = document.getElementById("chairDialogBtn");

  zoneChair?.addEventListener("click", () => {
    if (usedZones.has("chair")) return;
    usedZones.add("chair");
    chairDialog?.classList.remove("hidden");
  });

  chairDialogBtn?.addEventListener("click", () => {
    chairDialog?.classList.add("hidden");

    document
      .querySelector(".zone-lamp")
      ?.classList.replace("zone-inactive", "zone-active");

    showArrow("arrow5");
    hideArrow("arrow3");
  });

  // -------------------------
  // LAMP-ZONE
  // -------------------------
  const zoneLamp = document.getElementById("zoneLamp");
  const lampDialog = document.getElementById("lampDialog");
  const lampDialogBtn = document.getElementById("lampDialogBtn");
  const zoneSuccess = document.getElementById("zoneSuccess");

  zoneLamp?.addEventListener("click", () => {
    if (usedZones.has("lamp")) return;
    usedZones.add("lamp");
    lampDialog?.classList.remove("hidden");
  });

  lampDialogBtn?.addEventListener("click", () => {
    lampDialog?.classList.add("hidden");
    zoneSuccess?.classList.replace("zone-inactive", "zone-active");

    saveFinishedRoomToLS(); // funktion som ligger i roomProgress.ts som sparar vilket rum man klarat i LocalStorage

    showArrow("arrow6");
    showArrow("arrow7");
  });

  // -------------------------
  // EXIT-ZONE
  // -------------------------
  zoneSuccess?.addEventListener("click", () => {
    usedZones.clear();
    showRoom(2);
    resetRoom1();
  });
}

// -------------------------
// TANTRUM-HANDLER
// -------------------------
function handleTantrum(
  dialogId: string,
  btnId: string,
  usedZones: Set<string>,
) {
  const tantrum = document.getElementById(dialogId);

  tantrum?.classList.remove("hidden");

  document.getElementById(btnId)?.addEventListener(
    "click",
    () => {
      tantrum?.classList.add("hidden");
      usedZones.clear();
      resetRoom1();
    },
    { once: true },
  );
}

// -------------------------
// RESET-FUNKTION
// -------------------------
function resetRoom1() {
  document.querySelectorAll(".zone").forEach((zone) => {
    zone.classList.replace("zone-active", "zone-inactive");
  });

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    (radio as HTMLInputElement).checked = false;
  });

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
