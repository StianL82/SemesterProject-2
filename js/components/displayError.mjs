export function displayError(message = "Unknown error") {
  const errorContainer = document.createElement("div");
  errorContainer.classList.add("error");

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;

  errorContainer.appendChild(errorMessage);

  return errorContainer;
}
