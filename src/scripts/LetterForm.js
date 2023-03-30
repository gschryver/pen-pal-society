import { sendLetter } from "./dataAccess.js"
import { getPenPals } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

getPenPals()

mainContainer.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "submitRequest") {
      // Get what the user typed into the form fields
      const authorId = document.querySelector("select[name='author']").value
      const recipientId = document.querySelector("select[name='recipient']").value
      const authorName = document.querySelector("select[name='author'] option:checked").getAttribute('data-name');
      const authorEmail = document.querySelector("select[name='author'] option:checked").getAttribute('data-email');
      const recipientName = document.querySelector("select[name='recipient'] option:checked").getAttribute('data-name');
      const recipientEmail = document.querySelector("select[name='recipient'] option:checked").getAttribute('data-email');
      const letterContents = document.querySelector("textarea[name='letterContents']").value
      const topics = document.querySelectorAll("input[name='topics']:checked")


      // Create an array of topic values
      const topicValues = []
      topics.forEach(topic => topicValues.push(topic.value))

      // Make an object out of the user input
      const dataToSendToAPI = {
          authorId: authorId,
          recipientId: recipientId,
          authorName: authorName,
          authorEmail: authorEmail,
          recipientName: recipientName,
          recipientEmail: recipientEmail,
          dateSent: new Date(),
          letterContents: letterContents,
          topics: topicValues,
          completed: false
      }

      // Send the data to the API (letters) for permanent storage
      sendLetter(dataToSendToAPI)
      console.log('letter sent')
  }
})

export const LetterForm = (penPals) => {
  let html = `
  <div class="field">
    <label class="label" for="author">Author</label>
    <div class="select">
      <select name="author">
        ${penPals.map(penpal => `<option value="${penpal.id}" data-name="${penpal.name}" data-email="${penpal.email}">${penpal.name}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="field">
    <label class="label" for="recipient">Recipient</label>
    <div class="select">
      <select name="recipient">
        ${penPals.map(penpal => `<option value="${penpal.id}" data-name="${penpal.name}" data-email="${penpal.email}">${penpal.name}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="field">
    <label class="label" for="letterContents">Letter Contents</label>
    <div class="control">
      <textarea class="textarea" name="letterContents" placeholder="Write your letter here"></textarea>
    </div>
  </div>
  <div class="field">
    <label class="label">Topics</label>
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" name="topics" value="Business">
        Business
      </label>
      <label class="checkbox">
        <input type="checkbox" name="topics" value="Friendly">
        Friendly
      </label>
      <label class="checkbox">
        <input type="checkbox" name="topics" value="Family">
        Family
      </label>
      <label class="checkbox">
        <input type="checkbox" name="topics" value="Congratulations">
        Congratulations
      </label>
      <label class="checkbox">
        <input type="checkbox" name="topics" value="Condolences">
        Condolences
      </label>
    </div>
  </div>
  <button class="button" id="submitRequest">Submit Request</button>
  `;

  return html;
}