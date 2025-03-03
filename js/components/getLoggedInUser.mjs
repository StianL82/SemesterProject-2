/**
 * Retrieves the logged-in user's profile from localStorage.
 *
 * @returns {Object|null} The user profile object if available and valid, otherwise `null`.
 */
export function getLoggedInUser() {
  const userData = localStorage.getItem("profile");

  if (!userData) {
    return null;
  }

  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    return null;
  }
}
