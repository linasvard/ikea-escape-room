import { resetGame } from "./timer";

export default function initCancelBtnAnywhere() {
    
   const cancelBtnWrapper = document.querySelector(".cancel-game-btn");
   const allRooms = [
    document.querySelector(".room-1"),
    document.querySelector(".room-2"),
    document.querySelector(".room-3"),
    document.querySelector(".room-4")
   ];

   const cancelGameBtn: HTMLButtonElement | null = document.querySelector("#cancelGameBtn");
   cancelGameBtn?.addEventListener("click", cancelAndGoToHomepage);

   function updateCancelBtnAnywhere() {
    const anyRoomVisible = allRooms.some( // returns true om minst en av rummen inte har hidden
        (room) => !room?.classList.contains("hidden")
    );

    if (anyRoomVisible) {
        cancelBtnWrapper?.classList.remove("hidden"); // om något rum syns, hidden tas bort på knappen
    } else {
        cancelBtnWrapper?.classList.add("hidden"); // annars hidden
    }
   }

   // kolla om det finns class-ändringar
   allRooms.forEach((room) => {
    if (!room) return;
    const observeClassChangesHidden = new MutationObserver(updateCancelBtnAnywhere); // om något ändras kallar den på updateCancelBtnAnywhere
    observeClassChangesHidden.observe(room, { attributes: true, attributeFilter: ["class"] });

   });
   updateCancelBtnAnywhere();


   function cancelAndGoToHomepage() {
    resetGame();
    localStorage.removeItem("currentRoom");
    localStorage.removeItem("playerName");
    window.location.reload();
   }


}