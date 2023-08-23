export function displayErrorMessage(htmlContainer) {
    htmlContainer.innerHTML = `<div class="error-message">
                                    <p>Oops looks like an error on our end</p>
                                    <p>Please go back and try again</p>
                                 </div>`;
  }