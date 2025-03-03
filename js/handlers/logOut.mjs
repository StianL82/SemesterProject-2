import * as storage from "../storage/index.mjs";

/**
 * Sets up an event listener for the logout button.
 * Clears the stored authentication token and user profile, updates the UI, and redirects to the homepage.
 */
export function setupLogoutButton() {
  const logoutButton = document.querySelector(".logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      storage.remove("token");
      storage.remove("profile");

      document.querySelectorAll(".hideIfLoggedIn").forEach((el) => {
        el.style.setProperty("display", "block", "important");
      });
      document.querySelectorAll(".showIfLoggedIn").forEach((el) => {
        el.style.setProperty("display", "none", "important");
      });

      window.location.href = "/index.html";
    });
  }
}
