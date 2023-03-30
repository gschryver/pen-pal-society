import { fetchLetters } from "./dataAccess.js"
import { fetchPenPals } from "./dataAccess.js"
import { fetchCompletions } from "./dataAccess.js"
import { PPS } from "./PPS.js"

const mainContainer = document.querySelector("#container")

// what is this doing? 
// .then() tells javascript what to do after information has been received
const render = () => { 
  fetchLetters() // this fetches letters from the server
      .then(() => fetchPenPals()) // fetches penpals from server
      .then(() => fetchCompletions()) // fetches completions/submits from server
      .then( // render the main pen pals page component inside of the main container 
          () => {
              mainContainer.innerHTML = PPS()
          }
      )
}

render()

mainContainer.addEventListener("stateChanged", () => {
  render()
})