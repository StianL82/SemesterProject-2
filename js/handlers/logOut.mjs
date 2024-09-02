import * as storage from "../storage/index.mjs";

export function setupLogoutButton() {
  const logoutButton = document.querySelector(".logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Fjern token og profil fra lagringen
      storage.remove("token");
      storage.remove("profile");

      // Oppdater visning for å reflektere at brukeren har logget ut
      document.querySelectorAll(".hideIfLoggedIn").forEach((el) => {
        el.style.setProperty("display", "block", "important");
      });
      document.querySelectorAll(".showIfLoggedIn").forEach((el) => {
        el.style.setProperty("display", "none", "important");
      });

      // Omdiriger brukeren til en annen side, f.eks. forsiden eller login-siden
      window.location.href = "/index.html";
    });
  }
}
