




import type {  } from "../types/models"; // Om du vill använda dig av models på samma sätt vi fick lära oss på budgetappen, så kan du använda denna för att importera från ../types/models

export default function initHeader() {
    

    const storePageBtn: HTMLButtonElement |null = document.querySelector('#storePageBtn');
    storePageBtn?.addEventListener('click', displayStorePage);


    function displayStorePage() {
        const locationInfo: HTMLDivElement |null = document.querySelector('#storePage');
        locationInfo?.classList.toggle('store-hidden');
    };






}