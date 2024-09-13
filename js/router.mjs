import * as handlers from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import * as components from "./components/index.mjs";

const path = location.pathname;

export function router() {
  switch (path) {
    // Main Page
    case "/":
    case "/index":
    case "/index.html":
      handlers.setRegisterFormListener();
      handlers.setLoginFormListener();
      handlers.setupLogoutButton();
      handlers.checkLoginStatus();
      templates.renderNavProfile();
      handlers.setupSearchListener();
      handlers.setupAddListingForm();
      handlers.setupSortListener();
      templates.setupCarousel().then(() => {
        components.loadInitialListings();
      });

      const loadMoreBtn = document.querySelector("#loadMoreBtn");
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", components.loadMoreListings);
      }

      window.addEventListener("popstate", (event) => {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/index.html"
        ) {
          components.showLoadingIndicator();
          components.loadInitialListings().finally(() => {
            components.hideLoadingIndicator();
          });
        }
      });
      break;

    // Listing Page
    case "/listing":
    case "/listing/":
    case "/listing/index":
    case "/listing/index.html":
      handlers.setRegisterFormListener();
      handlers.setLoginFormListener();
      handlers.setupLogoutButton();
      handlers.checkLoginStatus();
      templates.initListingPage();
      templates.renderNavProfile();
      break;

    // Profile Page
    case "/profile":
    case "/profile/":
    case "/profile/index":
    case "/profile/index.html":
      handlers.setupLogoutButton();
      handlers.checkLoginStatus();
      templates.renderNavProfile();
      templates.renderProfileInformation();
      templates.renderMyListings();
      templates.renderMyWins();
      handlers.setupAddListingForm();
      templates.renderMyActiveBids();
      break;

    default:
      console.log("404 - not found");
  }
}
