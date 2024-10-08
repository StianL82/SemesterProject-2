import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";
import * as components from "/js/components/index.mjs";

let isFetchingWins = false;

async function renderMyWins() {
  if (isFetchingWins) return;
  isFetchingWins = true;

  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    isFetchingWins = false;
    return;
  }

  const winsUrl = `${API_AUCTION_URL}/profiles/${loggedInUser.name}/wins?limit=100`;

  components.showLoadingIndicator();

  try {
    const response = await authFetch(winsUrl);

    if (!response.ok) {
      const errorMessage = await response.text();
      if (response.status >= 400 && response.status < 500) {
        console.error("Client error while fetching wins:", errorMessage);
        throw new Error(
          "We couldn't fetch your wins. Please check your input and try again."
        );
      } else if (response.status >= 500) {
        console.error("Server error while fetching wins:", errorMessage);
        throw new Error(
          "We're currently experiencing server issues. Please try again later."
        );
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }

    const winsData = await response.json();

    const winsContainer = document.querySelector("#wins-listings-container");
    winsContainer.innerHTML = "";

    if (winsData.data.length === 0) {
      const noWinsMessage = document.createElement("p");
      noWinsMessage.textContent = "You have not won any bids yet.";
      winsContainer.appendChild(noWinsMessage);
      return;
    }

    winsData.data.forEach((win) => {
      const card = createCardTemplate(win);
      winsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching user's wins:", error);

    const winsContainer = document.querySelector("#wins-listings-container");
    const errorMessage = components.displayError(
      error.message ||
        "We encountered an error while fetching your wins. Please try again later."
    );
    winsContainer.innerHTML = "";
    winsContainer.appendChild(errorMessage);
  } finally {
    components.hideLoadingIndicator();
    isFetchingWins = false;
  }
}

export { renderMyWins };


