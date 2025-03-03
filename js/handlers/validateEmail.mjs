/**
 * Validates an email input field to ensure it matches the required Noroff email format.
 *
 * @param {HTMLInputElement} emailInput - The email input field to validate.
 * @param {HTMLElement} emailError - The element where validation errors will be displayed.
 */
export function validateEmail(emailInput, emailError) {
  if (emailInput.value === "") {
    emailError.style.display = "none";
    emailInput.classList.add("mb-4");
    emailInput.classList.remove("mb-0");
  } else if (!/^[\w\-.]+@(stud\.)?noroff\.no$/.test(emailInput.value)) {
    emailError.textContent =
      "Invalid email. Must be a @noroff.no or @stud.noroff.no address.";
    emailError.style.display = "block";
    emailInput.classList.remove("mb-4");
    emailInput.classList.add("mb-0");
  } else {
    emailError.style.display = "none";
    emailInput.classList.add("mb-4");
    emailInput.classList.remove("mb-0");
  }
}
