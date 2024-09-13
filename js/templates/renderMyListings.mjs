import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";
import * as components from "/js/components/index.mjs";

let isFetchingListings = false;

async function renderMyListings() {
  if (isFetchingListings) return;
  isFetchingListings = true;

  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    isFetchingListings = false;
    return;
  }

  const listingsUrl = `${API_AUCTION_URL}/profiles/${loggedInUser.name}/listings?limit=100`;

  components.showLoadingIndicator();

  try {
    const response = await authFetch(listingsUrl);

    if (!response.ok) {
      const errorMessage = await response.text();
      if (response.status >= 400 && response.status < 500) {
        console.error("Client error while fetching listings:", errorMessage);
        throw new Error(
          "We couldn't fetch your listings. Please check your input and try again."
        );
      } else if (response.status >= 500) {
        console.error("Server error while fetching listings:", errorMessage);
        throw new Error(
          "We're currently experiencing server issues. Please try again later."
        );
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }

    const listingsData = await response.json();

    const container = document.querySelector("#my-listings-container");
    container.innerHTML = "";

    if (listingsData.data.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "You have not added any listings yet.";
      container.appendChild(noListingsMessage);
      return;
    }

    listingsData.data.forEach((listing) => {
      const card = createCardTemplate(listing);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching user's listings:", error);

    const container = document.querySelector("#my-listings-container");
    const errorMessage = components.displayError(
      error.message ||
        "We encountered an error while fetching your listings. Please try again later."
    );
    container.innerHTML = "";
    container.appendChild(errorMessage);
  } finally {
    components.hideLoadingIndicator();
    isFetchingListings = false;
  }
}

export { renderMyListings };
