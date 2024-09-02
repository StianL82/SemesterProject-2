import { login } from "../api/auth/login.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    console.log("Login form found, setting up listener.");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation(); // Stopp eventet fra å boble opp

      console.log("Login form submitted."); // Bekreft at eventet blir trigget

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      console.log("Calling login function with profile:", profile);

      login(profile);
    });
  } else {
    console.error("Login form not found.");
  }
}
