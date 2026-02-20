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

  // Teddybear-zone

  const zoneTeddybear = document.getElementById("zoneTeddybear");
  const teddybearDialog = document.getElementById(
    "teddybearDialog",
  ) as HTMLDialogElement;
  const resetBtnTeddy = document.getElementById("resetBtnTeddy");

  zoneTeddybear?.addEventListener("click", () => {
    teddybearDialog.showModal();
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

      if (selected.value === "E") {
        // Correct answer — unlock pillow
        document
          .querySelector("#zonePillow")
          ?.classList.replace("zone-inactive", "zone-active");
        teddybearDialog.close();
      } else {
        // Wrong answer — tantrum
        teddybearDialog.close();
        handleTantrum("wantTeddyTantrum", "wantTeddyTantrumBtn");
      }
    });

  ["resetBtnPillow", "resetBtnTeddy", "resetBtnBedsheets"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => {
      resetRoom1();
      document.getElementById("introductionDiv")?.classList.remove("hidden");
    });
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
          .querySelector("#zoneCarpet")
          ?.classList.replace("zone-inactive", "zone-active");
        document
          .querySelector("#zoneBedsheets")
          ?.classList.replace("zone-inactive", "zone-active");
        pillowDialog.close();
      } else {
        // Wrong answer — tantrum
        pillowDialog.close();
        handleTantrum("wantPillowTantrum", "wantPillowTantrumBtn");
      }
    });

  // Bedsheets-zone
  const zoneBedsheets = document.getElementById("zoneBedsheets");
  const bedsheetsDialog = document.getElementById(
    "bedsheetsDialog",
  ) as HTMLDialogElement;
  const bedsheetsDialogBtn = document.getElementById("bedsheetsDialogBtn");

  zoneBedsheets?.addEventListener("click", () => {
    bedsheetsDialog.showModal();
  });

  bedsheetsDialogBtn?.addEventListener(
    "click",
    () => {
      bedsheetsDialog.close();
      introductionDiv?.classList.remove("hidden");
    },
    { once: true },
  );

  // Carpet-zone
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
  const lampDialog = document.getElementById("lampDialog") as HTMLDialogElement;
  const lampDialogBtn = document.getElementById("lampDialogBtn");
  const zoneSuccess = document.getElementById("zoneSuccess");

  zoneLamp?.addEventListener("click", () => {
    lampDialog.showModal();
  });

  lampDialogBtn?.addEventListener("click", () => {
    lampDialog.close();
    zoneSuccess?.classList.replace("zone-inactive", "zone-active");
  });
}

// Function to handle tantrum — show tantrum dialog
function handleTantrum(dialogId: string, btnId: string) {
  const tantrum = document.getElementById(dialogId) as HTMLDialogElement;
  tantrum.showModal();
  document.getElementById(btnId)?.addEventListener(
    "click",
    () => {
      tantrum.close();
      resetRoom1();
      document.getElementById("introductionDiv")?.classList.remove("hidden");
    },
    { once: true },
  );
}

function resetRoom1() {
  document.querySelectorAll(".zone").forEach((zone) => {
    zone.classList.replace("zone-active", "zone-inactive");
  });

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    (radio as HTMLInputElement).checked = false;
  });

  // Stäng endast om dialogen faktiskt är öppen
  const wantTeddyTantrum = document.getElementById(
    "wantTeddyTantrum",
  ) as HTMLDialogElement;
  const wantPillowTantrum = document.getElementById(
    "wantPillowTantrum",
  ) as HTMLDialogElement;
  const carpetDialog = document.getElementById(
    "carpetDialog",
  ) as HTMLDialogElement;
  const lampDialog = document.getElementById("lampDialog") as HTMLDialogElement;
  const bedsheetsDialog = document.getElementById(
    "bedsheetsDialog",
  ) as HTMLDialogElement;

  [
    wantTeddyTantrum,
    wantPillowTantrum,
    carpetDialog,
    lampDialog,
    bedsheetsDialog,
  ].forEach((dialog) => {
    if (dialog.open) dialog.close();
  });

  // Gör samtliga zoner inaktiva igen
  document.querySelectorAll(".zone-restart").forEach((zone) => {
    zone.classList.replace("zone-active", "zone-inactive");
  });
}
