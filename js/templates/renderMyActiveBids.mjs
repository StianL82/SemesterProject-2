import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";

let isFetchingBids = false; // Bruk en lås

// Hent og vis brukerens aktive bud ved å hente alle listings
async function renderMyActiveBids() {
  if (isFetchingBids) return; // Sjekk låsen
  isFetchingBids = true; // Sett låsen

  const loggedInUser = getLoggedInUser(); // Hent innlogget bruker

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    isFetchingBids = false;
    return;
  }

  console.log("Fetching all listings and filtering based on user's bids.");

  const listingsUrl = `${API_AUCTION_URL}/listings?limit=100`; // Hent alle listings
  try {
    const response = await authFetch(listingsUrl);
    const listingsData = await response.json();

    // Sjekk API-responsen
    console.log("Listings response data:", listingsData);

    const container = document.querySelector("#active-listings-container");
    container.innerHTML = ""; // Tøm tidligere oppføringer

    // Filtrer listings der brukeren har byd, sjekk at bids eksisterer før filtrering
    const userBidsListings = listingsData.data.filter((listing) => {
      return (
        listing.bids &&
        listing.bids.some((bid) => bid.bidderName === loggedInUser.name)
      );
    });

    // Sjekk om det er noen slike listings
    if (userBidsListings.length === 0) {
      const noActiveBidsMessage = document.createElement("p");
      noActiveBidsMessage.textContent = "You have no active bids.";
      container.appendChild(noActiveBidsMessage);
      isFetchingBids = false; // Fjern låsen
      return;
    }

    // Hvis brukeren har aktive bud, vis dem
    userBidsListings.forEach((listing) => {
      const card = createCardTemplate(listing); // Bruker eksisterende funksjon fra listingCard.mjs
      container.appendChild(card);
    });
  } catch (error) {
    console.error(
      "Error fetching all listings or filtering user's bids:",
      error
    );
  } finally {
    isFetchingBids = false; // Fjern låsen etter at prosessen er ferdig
  }
}

export { renderMyActiveBids };
