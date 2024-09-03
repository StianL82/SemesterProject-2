import * as handlers from "./handlers/index.mjs";

const path = location.pathname;

export function router() {
  switch (path) {
    //Main Page
    case "/":
    case "/index":
    case "/index.html":
      handlers.setRegisterFormListener();
      handlers.setLoginFormListener();
      handlers.setupLogoutButton();
      handlers.checkLoginStatus();
      break;
    //Listing Page
    case "/Listing":
    case "/Listing/":
    case "/Listing/index":
    case "/Listing/index.html":
      handlers.setRegisterFormListener();
      handlers.setLoginFormListener();
      handlers.setupLogoutButton();
      handlers.checkLoginStatus();
      break;
    //Profile Page
    case "/profile":
    case "/profile/":
    case "/profile/index":
    case "/profile/index.html":
      handlers.setupLogoutButton();
      handlers.checkLoginStatus();
      break;

    default:
      console.log("404 - not found");
  }
}
