/**
 * Hides the loading indicator if it exists in the DOM.
 */
export function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector(".loading-indicator");
  if (loadingIndicator) loadingIndicator.style.display = "none";
}
