/**
 * Populates the email input field in the login modal with the stored email from sessionStorage.
 * If an email is found, it is set as the input value and then removed from sessionStorage.
 */
export function hydrateEmailField() {
  const emailInput = document
    .getElementById("loginModal")
    .querySelector("#email");
  const storedEmail = sessionStorage.getItem("userEmail");

  if (emailInput && storedEmail) {
    emailInput.value = storedEmail;
    sessionStorage.removeItem("userEmail");
  }
}
