
/* eslint-disable no-console */

/*
 * ============================================
 * RUM 2: MATTORNA — ERIK JOBBAR HÄR
 * ============================================
 */

import { type ILamp } from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

import lampOff from "/room_2_lamp_off.png";
import lampOn from "/room_2_lamp_on.png";

import { saveFinishedRoomToLS, showRoom } from "./roomProgress"; // Importerar funktion from roomProgress som sparar

export default function initRoom2() {
  const lamps: ILamp[] = [
    // array för lamporna där lamporna får ett eget id samt en boolean true / false hurvida lampan är "på" eller ej
    {
      id: 1,
      on: false,
    },
    {
      id: 2,
      on: false,
    },
    {
      id: 3,
      on: false,
    },
    {
      id: 4,
      on: false,
    },
  ];

  let room2Finished = false;

  const lampChangeBtn1: HTMLButtonElement | null =
    document.querySelector("#room2Btn1");
  lampChangeBtn1?.addEventListener("click", () => buttonClick(0)); // hanterar click på knapp som kopplas till ett specifikt id för att kunna "mappa" knapparna (se längre ner i buttonMapping)

  const lampChangeBtn2: HTMLButtonElement | null =
    document.querySelector("#room2Btn2");
  lampChangeBtn2?.addEventListener("click", () => buttonClick(1));

  const lampChangeBtn3: HTMLButtonElement | null =
    document.querySelector("#room2Btn3");
  lampChangeBtn3?.addEventListener("click", () => buttonClick(2));

  const lampChangeBtn4: HTMLButtonElement | null =
    document.querySelector("#room2Btn4");
  lampChangeBtn4?.addEventListener("click", () => buttonClick(3));

  const buttonMapping: number[][] = [
    //mappning för knapparna. se const lampChangeBtn ovan för vilken knapp som blir mappad hur. här kan man också ändra mappningen för knapparna!
    [0, 1, 2],
    [1, 2],
    [0, 2, 3],
    [0, 1],
  ];

  // function setAllLampsOn() {
  //   // funktion för att kunna redigera i winScreen utan att spela spelet. ställer alla lampor till on = true istället för on = false
  //   lamps.forEach((lamp) => {
  //     lamp.on = true;
  //   });
  //   renderLamps();
  // }

  renderLamps();
  // setAllLampsOn(); ///kör ovan funktion för att kunna starta sidan med winScreen i redigeringssyfte!
  checkWinCondition();

  function toggleLampState(index: number) {
    // liten funktion för att säga till att om lampan är on = true så ska lampan ändras till on = false (och vise-versa) när man klickar på lampknappen
    lamps[index].on = !lamps[index].on;
  }

  let numberOfClicks = 0; // start för räknare av hur många klick man gjort
  const maxNumberOfClicks = 10; // max antal klick man har på sig

  function buttonClick(buttonIndex: number) {
    const loseScreen: HTMLDivElement | null =
      document.querySelector("#room2LoseScreen");

    numberOfClicks += 1;
    printNumberOfClicks();

    buttonMapping[buttonIndex].forEach((lampIndex) => {
      toggleLampState(lampIndex);
    });

    renderLamps();

    checkWinCondition();

    if (room2Finished) {
      return;
    }

    if (numberOfClicks >= maxNumberOfClicks) {
      localStorage.removeItem('currentRoom');
      lampChangeBtn1?.setAttribute("disabled", "");
      lampChangeBtn2?.setAttribute("disabled", "");
      lampChangeBtn3?.setAttribute("disabled", "");
      lampChangeBtn4?.setAttribute("disabled", "");
      console.log("Inga fler klick kvar!");
      setTimeout(() => room2PlayLosingSound(), 300);
      setTimeout(() => loseScreen?.classList.add("room-2-is-visible"), 1200);
      return;
    }

    console.log(
      `Du har klickat ${numberOfClicks} / ${maxNumberOfClicks} gånger`,
    );
  }

  function printNumberOfClicks() {
    const numberOfClicksEl: HTMLDivElement |null = document.querySelector("#room2ClickCounter");

    const html = `

    <span>${numberOfClicks}</span>
    <span>/</span>
    <span>${maxNumberOfClicks}</span>
    
    `;

    if (numberOfClicksEl) {
      numberOfClicksEl.innerHTML = html;
    }
  }

  function getLampImage(lamp: ILamp): string {
    return lamp.on ? lampOn : lampOff;
  }

  function renderLamps() {
    lamps.forEach((lamp) => {
      const lampImg: HTMLImageElement | null = document.querySelector(
        `#lamp${lamp.id}`,
      );
      if (lampImg) {
        lampImg.src = getLampImage(lamp);
      }
    });
  }

  function checkWinCondition() {
    const allLampsOn = lamps.every((lamp) => lamp.on);

    if (allLampsOn) {
      room2Finished = true;

      saveFinishedRoomToLS();

      lampChangeBtn1?.setAttribute("disabled", "");
      lampChangeBtn2?.setAttribute("disabled", "");
      lampChangeBtn3?.setAttribute("disabled", "");
      lampChangeBtn4?.setAttribute("disabled", "");

      setTimeout(() => room2PlaySuccessSound(), 250);

      const winScreen: HTMLDivElement | null =
        document.querySelector("#room2WinScreen");
      setTimeout(() => winScreen?.classList.add("room-2-is-visible"), 1400);

      const goToRoom3Btn: HTMLButtonElement |null = document.querySelector('#goToRoom3Btn');
      goToRoom3Btn?.addEventListener('click', () => {
        showRoom(3);
      });

      // setTimeout(() => textTypingEffect1(room2WinScreenDiv1, room2WinScreenText1), 0);

      // setTimeout(() => textTypingEffect2(room2WinScreenDiv2, room2WinScreenText2), 0);
    };
  }
  

  function room2PlaySuccessSound() {
    const audio = new Audio("/room_2_success_sound.wav");
    audio.volume = 0.2;
    audio.play();
  }
  function room2PlayLosingSound() {
    const audio1 = new Audio("/room_2_game_over_sound.wav");
    const audio2 = new Audio("/room_2_game_over_mario_sound.wav");
    audio1.volume = 0.2;
    audio2.volume = 0.2;
    audio1.play();
    setTimeout(() => audio2.play(), 1300);
  }

  const room2GoToGameBtn: HTMLButtonElement | null =
    document.querySelector("#room2GoToGameBtn");
  room2GoToGameBtn?.addEventListener("click", room2GoToGame);

  function room2GoToGame() {
    const room2InstructionContainer: HTMLDivElement | null =
      document.querySelector("#room2InstructionContainer");
    room2InstructionContainer?.classList.remove("room-2-is-visible");
  }

  printNumberOfClicks();

  /*
  
  ===OBS===============================================================OBS===
  ===========Kod för att skriva ut meddelande en bokstav i taget=============
  ===OBS===============================================================OBS===
  
  const TIME_BETWEEN_LETTERS = 0;




   const room2WinScreenDiv1: HTMLDivElement |null = document.querySelector('#room2WinScreenDiv1');
   const room2WinScreenDiv2: HTMLDivElement |null = document.querySelector('#room2WinScreenDiv2');
   const room2WinScreenText1 = "Yes! Vi lyckades tända alla lampor och vi kan nu se vart ta-själv-lagret är någonstans!";
   const room2WinScreenText2 = "Vad säger du, ska vi gå till ta-själv-lagret?";


   function textTypingEffect1(element, text, i = 0) {
     element.textContent += room2WinScreenText1[i];

     if (i === room2WinScreenText1.length - 1) {
       return;
     }

     setTimeout(() => textTypingEffect1(element, text, i + 1), TIME_BETWEEN_LETTERS);

   }


   function textTypingEffect2(element, text, i = 0) {
     element.textContent += room2WinScreenText2[i];

     if (i === room2WinScreenText2.length - 1) {
       const br: HTMLBRElement |null = document.createElement('br');
       element.appendChild(br);
       const button: HTMLButtonElement |null = document.createElement('button');
       button.id = 'goToRoom3Btn';
       button.textContent = '>';
       element.appendChild(button);
      
      
        button.removeAttribute('disabled');
      

       return;
     }

    

     setTimeout(() => textTypingEffect2(element, text, i + 1), TIME_BETWEEN_LETTERS);

   }*/
}
