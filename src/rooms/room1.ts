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
    document.getElementById("zoneMonkey")?.focus();
  });

  // ALLA RESETKNAPPAR
  document.querySelectorAll(".reset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      usedZones.clear();
      resetRoom1();
      introductionDiv?.classList.remove("hidden");
    });
  });

  // -------------------------
  // MONKEY-ZONE
  // -------------------------
  const monkeyDialog = document.getElementById("monkeyDialog");
  const submitMonkeyArgument = document.getElementById("submitMonkeyArgument");

  addZoneListeners("zoneMonkey", () => {
    if (usedZones.has("monkey")) return;
    usedZones.add("monkey");
    monkeyDialog?.classList.remove("hidden");
    document.getElementById("arrow1")?.classList.remove("animation");
    const firstRadio = document.querySelector<HTMLInputElement>(
      'input[name="monkey-choose-argument"]',
    );
    if (firstRadio) {
      firstRadio.checked = true;
      firstRadio.blur();
    }
  });

  submitMonkeyArgument?.addEventListener("click", () => {
    const selected = document.querySelector<HTMLInputElement>(
      'input[name="monkey-choose-argument"]:checked',
    );

    if (!selected) return;

    monkeyDialog?.classList.add("hidden");

    if (selected.value === "E") {
      activateZone("zonePillow", true);
      showArrow("arrow2");
    } else {
      handleTantrum("wantmonkeyTantrum", "wantmonkeyTantrumBtn", usedZones);
    }
  });

  // -------------------------
  // PILLOW-ZONE
  // -------------------------
  const pillowArgument = document.getElementById("pillowArgument");
  const submitPillowArgument = document.getElementById("submitPillowArgument");

  addZoneListeners("zonePillow", () => {
    if (usedZones.has("pillow")) return;
    usedZones.add("pillow");
    pillowArgument?.classList.remove("hidden");
    document.getElementById("arrow2")?.classList.remove("animation");
    const firstRadio = document.querySelector<HTMLInputElement>(
      'input[name="pillow-choose-argument"]',
    );
    if (firstRadio) {
      firstRadio.checked = true;
      firstRadio.blur();
    }
  });

  submitPillowArgument?.addEventListener("click", () => {
    const selected = document.querySelector<HTMLInputElement>(
      'input[name="pillow-choose-argument"]:checked',
    );

    if (!selected) return;

    pillowArgument?.classList.add("hidden");

    if (selected.value === "C") {
      showArrow("arrow3");
      showArrow("arrow4");
      activateZone("zoneChair", false);
      activateZone("zoneBedsheets", false);
      document.getElementById("zoneBedsheets")?.setAttribute("tabindex", "1");
      document.getElementById("zoneChair")?.setAttribute("tabindex", "2");
      document.getElementById("zoneBedsheets")?.focus();
    } else {
      handleTantrum("wantPillowTantrum", "wantPillowTantrumBtn", usedZones);
      activateZone("zoneBedsheets", true);
    }
  });

  // -------------------------
  // BEDSHEETS-ZONE
  // -------------------------
  const bedsheetDialog = document.getElementById("bedsheetDialog");

  addZoneListeners("zoneBedsheets", () => {
    if (usedZones.has("bedsheets")) return;
    usedZones.add("bedsheets");
    bedsheetDialog?.classList.remove("hidden");
  });

  // -------------------------
  // CHAIR-ZONE
  // -------------------------
  const chairDialog = document.getElementById("chairDialog");
  const chairDialogBtn = document.getElementById("chairDialogBtn");

  addZoneListeners("zoneChair", () => {
    if (usedZones.has("chair")) return;
    usedZones.add("chair");
    chairDialog?.classList.remove("hidden");
  });

  chairDialogBtn?.addEventListener("click", () => {
    document.getElementById("arrow4")?.classList.remove("animation");
    chairDialog?.classList.add("hidden");
    document.getElementById("zoneBedsheets")?.setAttribute("tabindex", "-1");
    document.getElementById("zoneChair")?.setAttribute("tabindex", "-1");
    activateZone("zoneLamp", true);
    showArrow("arrow5");
    hideArrow("arrow3");
    hideZone("zoneBedsheets");
  });

  // Fånga tab när chairDialog är öppen så fokus inte läcker ut till <header>
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Tab" && !chairDialog?.classList.contains("hidden")) {
      e.preventDefault();
      chairDialogBtn?.focus();
    }
  });

  // -------------------------
  // LAMP-ZONE
  // -------------------------
  const lampDialog = document.getElementById("lampDialog");
  const lampDialogBtn = document.getElementById("lampDialogBtn");

  addZoneListeners("zoneLamp", () => {
    if (usedZones.has("lamp")) return;
    usedZones.add("lamp");
    lampDialog?.classList.remove("hidden");
    document.getElementById("arrow5")?.classList.remove("animation");
  });

  lampDialogBtn?.addEventListener("click", () => {
    lampDialog?.classList.add("hidden");
    activateZone("zoneSuccess", true);
    saveFinishedRoomToLS();
    showArrow("arrow6");
    showArrow("arrow7");
  });

  // -------------------------
  // EXIT-ZONE
  // -------------------------
  addZoneListeners("zoneSuccess", () => {
    usedZones.clear();
    showRoom(2);
    resetRoom1();
  });
}

// -------------------------
// HJÄLPFUNKTION: Lyssna på click + Enter/Space
// -------------------------
function addZoneListeners(id: string, handler: () => void) {
  const zone = document.getElementById(id);
  zone?.addEventListener("click", handler);
  zone?.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  });
}

// -------------------------
// HJÄLPFUNKTION: Aktivera zon med fokus
// -------------------------
function activateZone(id: string, focus = true) {
  const zone = document.getElementById(id);
  if (!zone) return;
  zone.classList.replace("zone-inactive", "zone-active");
  zone.setAttribute("tabindex", "0");
  if (focus) zone.focus();
}

// -------------------------
// HJÄLPFUNKTION: Inaktivera zon
// -------------------------
function deactivateZone(id: string) {
  const zone = document.getElementById(id);
  if (!zone) return;
  zone.classList.replace("zone-active", "zone-inactive");
  zone.setAttribute("tabindex", "-1");
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
  // Återställ tabindex på alla zoner
  document.querySelectorAll(".zone").forEach((zone) => {
    zone.classList.replace("zone-active", "zone-inactive");
    (zone as HTMLElement).setAttribute("tabindex", "-1");
  });

  // Monkey är alltid aktiv och fokusbar
  const monkey = document.getElementById("zoneMonkey");
  monkey?.classList.replace("zone-inactive", "zone-active");
  monkey?.setAttribute("tabindex", "0");

  // Återställ zoneBedsheets om den blivit hidden
  document.getElementById("zoneBedsheets")?.classList.remove("hidden");
  document.getElementById("zoneBedsheets")?.setAttribute("tabindex", "-1");
  document.getElementById("zoneChair")?.setAttribute("tabindex", "-1");

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

  // Ta bort visible från alla pilar först
  document.querySelectorAll(".arrow").forEach((arrow) => {
    arrow.classList.remove("visible");
  });

  // Återställ arrow1 med animation och visible sist
  document.getElementById("arrow1")?.classList.add("animation");
  document.getElementById("arrow1")?.classList.add("visible");
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

function hideZone(id: string) {
  document.getElementById(id)?.classList.add("hidden");
}
