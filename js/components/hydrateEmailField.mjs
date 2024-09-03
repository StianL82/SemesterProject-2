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
