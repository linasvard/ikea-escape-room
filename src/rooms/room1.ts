/*
 * ============================================
 * RUM 1: BARNAVDELNINGEN — ELENA JOBBAR HÄR
 * ============================================
 */

import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initRoom1() {
  const introductionDiv = document.getElementById("introductionDiv");
  const startRoom1Btn = document.getElementById("startRoom1Btn");

  startRoom1Btn?.addEventListener("click", () => {
    introductionDiv?.classList.add("hidden");
  });

  // Pillow-zone
  const zonePillow = document.getElementById("zonePillow");
  const pillowDialog = document.getElementById(
    "pillowArgument",
  ) as HTMLDialogElement;

  zonePillow?.addEventListener("click", () => {
    pillowDialog.showModal();
  });

  document
    .getElementById("submitPillowArgument")
    ?.addEventListener("click", () => {
      const selected = document.querySelector<HTMLInputElement>(
        'input[name="pillow-choose-argument"]:checked',
      );

      if (!selected) {
        alert("Välj ett argument först!");
        return;
      }

      if (selected.value === "C") {
        // Correct answer — unlock carpet and bedsheets
        document
          .querySelector(".zone-carpet")
          ?.classList.replace("zone-inactive", "zone-active");
        document
          .querySelector(".zone-bedsheets")
          ?.classList.replace("zone-inactive", "zone-active");
        pillowDialog.close();
      } else {
        // Wrong answer — tantrum, send back to entrance
        pillowDialog.close();
        handleTantrum();
      }
    });

  // Teddybear-zone
  const zoneTeddybear = document.getElementById("zoneTeddybear");
  const teddybearArgument = document.getElementById(
    "teddybearArgument",
  ) as HTMLDialogElement;

  zoneTeddybear?.addEventListener("click", () => {
    teddybearArgument.showModal();
  });

  document
    .getElementById("submitTeddybearArgument")
    ?.addEventListener("click", () => {
      const selected = document.querySelector<HTMLInputElement>(
        'input[name="teddybear-choose-argument"]:checked',
      );

      if (!selected) {
        alert("Välj ett argument först!");
        return;
      }

      if (selected.value === "B") {
        // Correct answer — unlock carpet and bedsheets
        document
          .querySelector(".zone-carpet")
          ?.classList.replace("zone-inactive", "zone-active");
        document
          .querySelector(".zone-bedsheets")
          ?.classList.replace("zone-inactive", "zone-active");
        teddybearArgument.close();
      } else {
        // Wrong answer — tantrum, send back to entrance
        teddybearArgument.close();
        handleTantrum();
      }
    });

  // Bedsheets-zone
  const zoneBedsheets = document.getElementById("zoneBedsheets");
  const bedsheetsDialog = document.getElementById("bedsheetsDialog");
  const bedsheetsDialogBtn = document.getElementById("bedsheetsDialogBtn");

  zoneBedsheets?.addEventListener("click", () => {
    bedsheetsDialog.showModal();
  });

  bedsheetsDialogBtn?.addEventListener("click", () => {
    bedsheetsDialog.close();
    const introductionDiv = document.getElementById("introductionDiv");
    introductionDiv?.classList.remove("hidden");
  });

  if (!bedsheetsDialogBtn) {
    return;
  }

  // Carpet-zonen
  const zoneCarpet = document.getElementById("zoneCarpet");
  const carpetDialog = document.getElementById(
    "carpetDialog",
  ) as HTMLDialogElement;
  const carpetDialogBtn = document.getElementById("carpetDialogBtn");

  zoneCarpet?.addEventListener("click", () => {
    carpetDialog.showModal();
  });

  carpetDialogBtn?.addEventListener("click", () => {
    carpetDialog.close();
    document
      .querySelector(".zone-lamp")
      ?.classList.replace("zone-inactive", "zone-active");
  });

  // Lamp-zone
  const zoneLamp = document.getElementById("zoneLamp");
  const lampDialog = document.getElementById("lampDialog");
  const lampDialogBtn = document.getElementById("lampDialogBtn");

  zoneLamp?.addEventListener("click", () => {
    lampDialog.showModal();
  });

  lampDialogBtn?.addEventListener("click", () => {
    lampDialog.close();
    document.getElementById("room2").classList.remove("hidden");
  });
}

// Function to handle tantrum — show tantrum dialog
function handleTantrum() {
  const wantTantrum = document.getElementById(
    "wantTantrum",
  ) as HTMLDialogElement;
  wantTantrum.showModal();
  document.getElementById("wantTantrumBtn")?.addEventListener(
    "click",
    () => {
      wantTantrum.close();
      const introductionDiv = document.getElementById("introductionDiv");
      introductionDiv?.classList.remove("hidden");
    },
    { once: true },
  );
}
