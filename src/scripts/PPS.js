import { LetterForm } from "./LetterForm.js"
import { getPenPals } from "./dataAccess.js"

const penPals = getPenPals();
const formContainer = document.createElement('div');
formContainer.innerHTML = LetterForm(penPals);

export const PPS = () => { // this will be imported into main.js 
    return `
        <div class="page-logo">
            <div class="logo"></div>
            <h1 class="pageName">Pen Pal Society</h1>
        </div>
        <section id="letterForm">
            <h2 class="request">Write a Letter</h2>
                ${formContainer.innerHTML}
        </section>
        <section class="reservations">
            <h2>Letter Archive</h2>

        </section>
    `
}
