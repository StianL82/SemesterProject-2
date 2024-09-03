import * as handlers from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import { getListings } from "./api/listings/getListings.mjs";

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
      templates.displayListings();
      getListings();
      break;
    //Listing Page
    case "/listing":
    case "/listing/":
    case "/listing/index":
    case "/listing/index.html":
      handlers.setRegisterFormListener();
      handlers.setLoginFormListener();
      handlers.setupLogoutButton();
      handlers.checkLoginStatus();
      templates.initListingPage();
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
