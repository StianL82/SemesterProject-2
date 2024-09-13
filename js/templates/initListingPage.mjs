import { getListingId } from "../components/getListingID.mjs";
import { fetchListingData } from "../api/listings/fetchSingleListing.mjs";
import { updatePageWithListingData } from "./renderSingleListing.mjs";

export async function initListingPage() {
  const listingId = getListingId();
  if (listingId) {
    const listingData = await fetchListingData(listingId);
    if (listingData) {
      updatePageWithListingData(listingData);
    }
  } else {
    console.error("No listing ID found in URL.");
  }
}
