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
    console.error("Failed to fetch listings:", error);
    return [];
  }
}
