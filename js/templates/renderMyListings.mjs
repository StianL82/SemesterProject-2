import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";

let isFetchingListings = false; // Bruk en lås

// Hent oppføringer brukeren har lagt ut
async function renderMyListings() {
  if (isFetchingListings) return; // Sjekk låsen
  isFetchingListings = true; // Sett låsen

  const loggedInUser = getLoggedInUser(); // Hent innlogget bruker

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    isFetchingListings = false;
    return;
  }

  // Sjekk at brukernavnet blir korrekt
  console.log("Fetching listings for user:", loggedInUser.name);

  const listingsUrl = `${API_AUCTION_URL}/profiles/${loggedInUser.name}/listings?limit=100`;

  try {
    const response = await authFetch(listingsUrl);
    const listingsData = await response.json();

    // Sjekk API-responsen
    console.log("Listings response data:", listingsData);

    const container = document.querySelector("#my-listings-container"); // Oppdatert id
    container.innerHTML = ""; // Tøm tidligere oppføringer

    // Sjekk om brukeren har noen oppføringer
    if (listingsData.data.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "You have not added any listings yet.";
      container.appendChild(noListingsMessage);
      isFetchingListings = false; // Fjern låsen
      return;
    }

    // Hvis brukeren har oppføringer, vis dem
    listingsData.data.forEach((listing) => {
      const card = createCardTemplate(listing); // Bruker eksisterende funksjon fra listingCard.mjs
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching user's listings:", error);
  } finally {
    isFetchingListings = false; // Fjern låsen etter at prosessen er ferdig
  }
}

export { renderMyListings };
