import { validateEmail } from "./validateEmail.mjs";
import { validatePassword } from "./validatePassword.mjs";
import { validateUsername } from "./validateUsername.mjs";

export function validateRegisterForm() {
  document.addEventListener("DOMContentLoaded", function () {
    resetErrors();

    nameInput.addEventListener("blur", () =>
      validateUsername(nameInput, nameError),
    );
    emailInput.addEventListener("blur", () =>
      validateEmail(emailInput, emailError),
    );
    passwordInput.addEventListener("blur", () =>
      validatePassword(passwordInput, passwordError),
    );
  });

  const nameInput = document.querySelector("#name");
  const nameError = document.querySelector("#usernameError");
  const emailInput = document.querySelector("#email");
  const emailError = document.querySelector("#emailError");
  const passwordInput = document.querySelector("#password");
  const passwordError = document.querySelector("#passwordError");

  function resetErrors() {
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    nameInput.classList.add("mb-4");
    nameInput.classList.remove("mb-0");
    emailInput.classList.add("mb-4");
    emailInput.classList.remove("mb-0");
    passwordInput.classList.add("mb-4");
    passwordInput.classList.remove("mb-0");
  }
}
