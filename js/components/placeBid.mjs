import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";

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
        `Insufficient credits. You have ${currentCredits} credits available.`
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
      const errorResponse = await response.json();
      throw new Error("Failed to place bid. Make sure your bid is valid.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}
