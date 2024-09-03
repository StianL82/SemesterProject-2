import { getListings } from "/js/api/listings/getListings.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";

export async function displayListings() {
  try {
    const listingsResponse = await getListings();

    // Hent ut `data`-nøkkelen som inneholder arrayen med lister
    const listings = listingsResponse.data || [];

    if (Array.isArray(listings)) {
      const container = document.getElementById("listings-container");

      listings.forEach((listing) => {
        const card = createCardTemplate(listing);
        container.appendChild(card);
      });
    } else {
      console.error("Listings is not an array:", listings);
    }
  } catch (error) {
    console.error("Failed to display listings:", error);
  }
}

displayListings();
