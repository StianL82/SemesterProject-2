import { getListingId } from "../components/getListingID.mjs";
import { fetchListingData } from "../api/listings/fetchSingleListing.mjs";
import { renderSingleListing } from "./renderSingleListing.mjs";

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
