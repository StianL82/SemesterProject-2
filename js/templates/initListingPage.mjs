import { getListingId } from "../components/getListingID.mjs";
import { fetchListingData } from "../api/listings/fetchSingleListing.mjs";
import { renderSingleListing } from "./renderSingleListing.mjs";

/**
 * Initializes the listing page by retrieving the listing ID from the URL,
 * fetching the corresponding listing data, and rendering it on the page.
 *
 * @returns {Promise<void>} A promise that resolves once the listing data is fetched and rendered.
 *
 * @throws {Error} Logs an error if no listing ID is found in the URL.
 */
export async function initListingPage() {
  const listingId = getListingId();
  if (listingId) {
    const listingData = await fetchListingData(listingId);
    if (listingData) {
      renderSingleListing(listingData);
    }
  } else {
    console.error("No listing ID found in URL.");
  }
}
