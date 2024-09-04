// getLoggedInUser.mjs
export function getLoggedInUser() {
  const userData = localStorage.getItem("profile");

  if (!userData) {
    return null; // Ingen bruker er logget inn
  }

  try {
    return JSON.parse(userData); // Returner brukerens data som et objekt
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    return null;
  }
}
