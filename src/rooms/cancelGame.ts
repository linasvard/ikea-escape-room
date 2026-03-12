
export default function initCancelBtnAnywhere() {
    
   const cancelBtnWrapper = document.querySelector(".cancel-game-btn");
   const allRooms = [
    document.querySelector(".room-1"),
    document.querySelector(".room-2"),
    document.querySelector(".room-3"),
    document.querySelector(".room-4")
   ];

   function updateCancelBtnAnywhere() {
    const anyRoomVisible = allRooms.some(
        (room) => !room?.classList.contains("hidden")
    );

    if (anyRoomVisible) {
        cancelBtnWrapper?.classList.remove("hidden");
    } else {
        cancelBtnWrapper?.classList.add("hidden");
    }
   }

   // kolla om det finns class-ändringar
   allRooms.forEach((room) => {
    if (!room) return;
    const observeClassChangesHidden = new MutationObserver(updateCancelBtnAnywhere);
    observeClassChangesHidden.observe(room, { attributes: true, attributeFilter: ["class"] });

   });
   updateCancelBtnAnywhere();

}
    
