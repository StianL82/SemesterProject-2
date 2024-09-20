export function validatePassword(passwordInput, passwordError) {
  if (passwordInput.value === "") {
    passwordError.style.display = "none";
    passwordInput.classList.add("mb-4");
    passwordInput.classList.remove("mb-0");
  } else if (passwordInput.value.length < 8) {
    passwordError.textContent =
      "Password must be at least 8 characters long.";
    passwordError.style.display = "block";
    passwordInput.classList.remove("mb-4");
    passwordInput.classList.add("mb-0");
  } else {
    passwordError.style.display = "none";
    passwordInput.classList.add("mb-4");
    passwordInput.classList.remove("mb-0");
  }
}
