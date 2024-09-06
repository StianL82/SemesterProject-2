import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs"; // Importer funksjonen for å hente innlogget bruker
import { createCardTemplate } from "/js/templates/listingCard.mjs"; // Bruker kortfunksjonen

// Hent oppføringer brukeren har vunnet
async function renderMyWins() {
  const loggedInUser = getLoggedInUser(); // Hent innlogget bruker

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    return;
  }

  const winsUrl = `${API_AUCTION_URL}/profiles/${loggedInUser.name}/wins?limit=100`; // Hent brukers vinner-oppføringer
  try {
    const response = await authFetch(winsUrl);
    const winsData = await response.json();

    const winsContainer = document.querySelector("#wins-listings-container");
    winsContainer.innerHTML = ""; // Tøm tidligere oppføringer

    // Sjekk om brukeren har vunnet noen oppføringer
    if (winsData.data.length === 0) {
      const noWinsMessage = document.createElement("p");
      noWinsMessage.textContent = "You have not won any bids yet.";
      winsContainer.appendChild(noWinsMessage);
      return;
    }

    // Hvis brukeren har vunnet oppføringer, vis dem
    winsData.data.forEach((win) => {
      const card = createCardTemplate(win); // Bruker eksisterende funksjon fra listingCard.mjs
      winsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching user's wins:", error);
  }
}

export { renderMyWins };
