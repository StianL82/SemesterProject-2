/**
 * Creates and returns an error message element.
 *
 * @param {string} [message="Unknown error"] - The error message to display.
 * @returns {HTMLElement} A `div` element containing the error message.
 */
export function displayError(message = "Unknown error") {
  const errorContainer = document.createElement("div");
  errorContainer.classList.add("error");

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;

  errorContainer.appendChild(errorMessage);

  return errorContainer;
}
