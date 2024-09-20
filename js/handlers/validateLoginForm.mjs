import { validateEmail } from "./validateEmail.mjs";
import { validatePassword } from "./validatePassword.mjs";

export function validateLoginForm() {
  document.addEventListener("DOMContentLoaded", function () {
    resetErrors();

    emailInput.addEventListener("blur", () =>
      validateEmail(emailInput, emailError),
    );
    passwordInput.addEventListener("blur", () =>
      validatePassword(passwordInput, passwordError),
    );
  });

  const emailInput = document.querySelector("#loginEmail");
  const emailError = document.querySelector("#loginEmailError");
  const passwordInput = document.querySelector("#loginPassword");
  const passwordError = document.querySelector("#loginPasswordError");

  function resetErrors() {
    emailError.style.display = "none";
    passwordError.style.display = "none";
    emailInput.classList.add("mb-4");
    emailInput.classList.remove("mb-0");
    passwordInput.classList.add("mb-4");
    passwordInput.classList.remove("mb-0");
  }
}
