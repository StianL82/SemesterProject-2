import { getAllListings } from "./getAllListings.mjs";

export async function getListingsWithShortestDeadline() {
  try {
    let listings = await getAllListings();
    const now = new Date();

    listings = listings.filter((listing) => new Date(listing.endsAt) > now);

    listings = listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

    const topListings = listings.slice(0, 12);

    return topListings;
  } catch (error) {
    if (error.response) {
      const errorMessage = await error.response.text();

      if (error.response.status >= 400 && error.response.status < 500) {
        console.error(
          "Client error in getListingsWithShortestDeadline:",
          errorMessage
        );
        alert(
          "Failed to fetch listings. Please check your input and try again."
        );
      } else if (error.response.status >= 500) {
        console.error(
          "Server error in getListingsWithShortestDeadline:",
          errorMessage
        );
        alert(
          "Failed to fetch listings due to server error. Please try again later."
        );
      } else {
        console.error(
          "Unexpected error in getListingsWithShortestDeadline:",
          errorMessage
        );
        alert(
          "Something went wrong while fetching listings. Please try again."
        );
      }
    } else {
      console.error(
        "Network or unexpected error in getListingsWithShortestDeadline:",
        error
      );
      alert(
        "Network error. Please check your internet connection and try again."
      );
    }
  }
}
