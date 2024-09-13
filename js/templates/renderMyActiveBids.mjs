import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";
import * as components from "/js/components/index.mjs";

let isFetchingBids = false;

async function renderMyActiveBids() {
  if (isFetchingBids) return;
  isFetchingBids = true;

  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    isFetchingBids = false;
    return;
  }

  console.log("Fetching active bids for the logged-in user.");

  const bidsUrl = `${API_AUCTION_URL}/profiles/${loggedInUser.name}/bids?_listings=true`;

  components.showLoadingIndicator();

  try {
    const response = await authFetch(bidsUrl);
    const bidsData = await response.json();

    console.log("Bids response data:", bidsData);

    const container = document.querySelector("#active-bids-container");
    container.innerHTML = "";

    if (bidsData.data.length === 0) {
      const noActiveBidsMessage = document.createElement("p");
      noActiveBidsMessage.textContent = "You have no active bids.";
      container.appendChild(noActiveBidsMessage);
      return;
    }

    const displayedListings = new Set();

    bidsData.data.forEach((bid) => {
      const listing = bid.listing;

      if (displayedListings.has(listing.id)) {
        return;
      }

      const now = new Date();
      const endsAt = new Date(listing.endsAt);
      if (endsAt < now) {
        return;
      }

      const card = createCardTemplate(listing);
      container.appendChild(card);

      displayedListings.add(listing.id);
    });
  } catch (error) {
    console.error("Error fetching user's bids:", error);

    const container = document.querySelector("#active-bids-container");
    const errorMessage = components.displayError(
      "We encountered an error while fetching your active bids. Please try again later."
    );
    container.innerHTML = "";
    container.appendChild(errorMessage);
  } finally {
    components.hideLoadingIndicator();
    isFetchingBids = false;
  }
}

export { renderMyActiveBids };
