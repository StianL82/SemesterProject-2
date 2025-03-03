import { login } from "../api/auth/login.mjs";

/**
 * Sets up an event listener for the login form submission.
 * Prevents default form submission, extracts form data, and calls the `login` function.
 */
export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      login(profile);
    });
  } else {
    console.error("Login form not found.");
  }
}
