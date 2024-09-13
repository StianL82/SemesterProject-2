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
