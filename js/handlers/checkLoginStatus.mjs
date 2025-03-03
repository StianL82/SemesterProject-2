import * as storage from "../storage/index.mjs";

/**
 * Checks if the user is logged in by verifying the presence of a token in storage.
 * Updates the visibility of elements based on the user's login status.
 */
export function checkLoginStatus() {
  const token = storage.load("token");

  if (token) {
    document.querySelectorAll(".hideIfLoggedIn").forEach((el) => {
      el.style.setProperty("display", "none", "important");
      el.classList.remove("hidden-until-js");
    });
    document.querySelectorAll(".showIfLoggedInBlock").forEach((el) => {
      el.style.setProperty("display", "block", "important");
      el.classList.remove("hidden-until-js");
    });
    document.querySelectorAll(".showIfLoggedInFlex").forEach((el) => {
      el.style.setProperty("display", "flex", "important");
      el.classList.remove("hidden-until-js");
    });
  } else {
    document.querySelectorAll(".hideIfLoggedIn").forEach((el) => {
      el.style.setProperty("display", "block", "important");
      el.classList.remove("hidden-until-js");
    });
    document
      .querySelectorAll(".showIfLoggedInBlock, .showIfLoggedInFlex")
      .forEach((el) => {
        el.style.setProperty("display", "none", "important");
        el.classList.remove("hidden-until-js");
      });
  }
}
