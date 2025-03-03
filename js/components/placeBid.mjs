import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";

/**
 * Places a bid on a listing after verifying the user's available credits.
 *
 * @param {string} listingId - The ID of the listing to place a bid on.
 * @param {number} bidAmount - The amount of credits to bid.
 * @returns {Promise<Object>} A promise that resolves to the bid response object if successful.
 *
 * @throws {Error} Throws an error if the user is not logged in, has insufficient credits, or if the bid request fails.
 */
export async function placeBid(listingId, bidAmount) {
  const bidUrl = `${API_AUCTION_URL}/listings/${listingId}/bids?timestamp=${new Date().getTime()}`;

  try {
    const user = getLoggedInUser();
    if (!user) {
      throw new Error("No logged-in user found.");
    }

    const profileUrl = `${API_AUCTION_URL}/profiles/${user.name}`;
    const profileResponse = await authFetch(profileUrl);

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch user profile to check credits.");
    }

    const profileData = await profileResponse.json();
    const currentCredits = profileData.data.credits;

    if (bidAmount > currentCredits) {
      throw new Error(
        `Insufficient credits. You have ${currentCredits} credits available.`,
      );
    }

    const response = await authFetch(bidUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      throw new Error("Failed to place bid. Make sure your bid is valid.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}
