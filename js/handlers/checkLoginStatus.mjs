import * as storage from "../storage/index.mjs";

export function checkLoginStatus() {
  const token = storage.load("token");

  if (token) {
    document.querySelectorAll(".hideIfLoggedIn").forEach((el) => {
      el.style.setProperty("display", "none", "important");
    });
    document.querySelectorAll(".showIfLoggedInBlock").forEach((el) => {
      el.style.setProperty("display", "block", "important");
    });
    document.querySelectorAll(".showIfLoggedInFlex").forEach((el) => {
      el.style.setProperty("display", "flex", "important");
    });
  } else {
    document.querySelectorAll(".hideIfLoggedIn").forEach((el) => {
      el.style.setProperty("display", "block", "important");
    });
    document.querySelectorAll(".showIfLoggedInBlock, .showIfLoggedInFlex").forEach((el) => {
      el.style.setProperty("display", "none", "important");
    });
  }
}

