import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";

export async function placeBid(listingId, bidAmount) {
  const bidUrl = `${API_AUCTION_URL}/listings/${listingId}/bids?timestamp=${new Date().getTime()}`;

  try {
    const response = await authFetch(bidUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error("Failed to place bid. Make sure your bid is valid.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}
