export const applicationState = {
    letters: [],
    completions: [],
    penPals: [
      {
        id: 1,
        name: "Jon Krakaeur",
        email: "jon@krakaeur.com"
      },
      {
        id: 2,
        name: "Holly Black",
        email: "holly@black.com"      
      },
      {
        id: 3,
        name: "John Muir",
        email: "john@muir.com"
      },
      { 
        id: 4,
        name: "Pablo Neruda",
        email: "pablo@neruda.com"
      },
      {
        id: 5,
        name: "Sylvia Plath",
        email: "sylvia@plath.com"
      },
      { id: 6,
        name: "e.e. cummings",
        email: "ee@cummings.com"
      }
    ]
  }

  const API = "http://localhost:8088"
  
// THIS MUST BE DEFINED 
const mainContainer = document.querySelector("#container")

// FETCH LETTERS
// retrieves all of the letters from API and stores them in application.letters  
export const fetchLetters = () => {
    return fetch(`${API}/letters`)
        .then(response => response.json())
        .then(
            (emailLetters) => {
                // Store the external state in application state
                applicationState.letters = emailLetters
            }
        )
}

// GET LETTER
// returns a copy of the application.letter array (based on completed (submitted) status)
export const getLetters = () => {
    const letters = [...applicationState.letters];
    // Sort letters by date in ascending order
    return letters.sort((letterA, letterB) => new Date(letterA.date) - new Date(letterB.date));
  }
  
// GET PENPALS
// returns a copy of the applicationState.clowns array 
export const getPenPals = () => {
    return applicationState.penPals.map(penpal => ({...penpal}))
}

// SEND LETTER 
// sends a letter to the API with the data
export const sendLetter = (userLetter) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userLetter)
    }

    return fetch(`${API}/letters`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
} 

// DELETE LETTER
// deletes letter with ID from the API 
export const deleteLetter = (id) => {
    return fetch(`${API}/letters/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// GRAB OUR PENPALS
// retrieves our penpals from API and stores them in an array 
export const fetchPenPals = () => {
    return fetch(`${API}/penPals`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.penPals = data
            }
        )
}

// SAVE COMPLETIONS
// sends completed/accepted reservation to the API, updates completed status on related reservation 
export const saveCompletion = (completion) => {
    // Prepare options for sending data to the server
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion) // Convert the completion data to a JSON string
    }

    // Send the completion data to the server
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json()) 
        .then(() => {
            // Get the reservation that corresponds to the completion data
            return fetch(`${API}/letters/${completion.letterId}`)
                .then(response => response.json()) // Convert the response data to an object
                .then(letter => {
                    
                    // Set the 'completed' status of the reservation to true for sorting purposes
                    // This can be built upon to add various things to the requests/displayed HTML ul
                    letter.completed = true;

                    const updateOptions = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(letter) 
                    };
                    
                    return fetch(`${API}/letters/${completion.letterId}`, updateOptions)
                        .then(response => response.json()) 
                        .then(() => {
                            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
                        });
                });
        });
}; 

// FETCH COMPLETIONS
// fetches all of the completed reservation requests and stores them in an array 
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
            }
        )
}