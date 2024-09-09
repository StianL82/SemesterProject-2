import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";

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

  try {
    const response = await authFetch(listingsUrl);
    const listingsData = await response.json();

    const container = document.querySelector("#my-listings-container");
    container.innerHTML = "";

    if (listingsData.data.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "You have not added any listings yet.";
      container.appendChild(noListingsMessage);
      isFetchingListings = false;
      return;
    }

    listingsData.data.forEach((listing) => {
      const card = createCardTemplate(listing);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching user's listings:", error);
  } finally {
    isFetchingListings = false;
  }
}

export { renderMyListings };
