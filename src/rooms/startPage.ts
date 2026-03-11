import type {} from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

import { showRoom, saveFinishedRoomToLS } from "./roomProgress";

export default function initStartPage(): void {

    const PLAYER_NAME_KEY = 'playerName';

    const startGameBtn: HTMLButtonElement | null = document.querySelector('#startGameBtn');
    startGameBtn?.addEventListener('click', () => {
        savePlayerNameToLS();
        playerNameToHeader();
        startGame();

    });
    

    function startGame() {
        saveFinishedRoomToLS();
        showRoom(1);
        console.log('försöker byta rum');
    }


    function playerNameToHeader(): void {
        const headerLocation: HTMLSpanElement | null = document.querySelector('#headerPlayerName');
        // const nameInput: HTMLInputElement | null = document.querySelector('#playerLoginName');
        const savedName = localStorage.getItem(PLAYER_NAME_KEY);
        if (!headerLocation || !savedName) {
            return;
        }

        headerLocation.textContent = savedName;

    }

    function savePlayerNameToLS(): void {
    const playerNameInput: HTMLInputElement | null = document.querySelector('#playerLoginName');
    if (!playerNameInput) return;

    const name = playerNameInput.value.trim();
    if (name === '') return;

    localStorage.setItem(PLAYER_NAME_KEY, name);
    }

    playerNameToHeader();
}