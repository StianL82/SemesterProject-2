import * as storage from "../storage/index.mjs";

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
