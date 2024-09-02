import * as storage from "../../storage/index.mjs";
import { API_HOST_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_HOST_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (response.ok) {
      const userData = await response.json();
      storage.save("profile", userData);

      sessionStorage.setItem("userEmail", userData.email);

      alert("Registration successful! Please log in to continue.");
      window.location.href = "../../../profile/login/";
    } else {
      const errorMessage = await response.text();
      if (response.status >= 400 && response.status < 500) {
        alert(
          `Client error occurred: ${errorMessage}. Please check your input and try again.`
        );
      } else {
        alert("Registration failed: " + errorMessage);
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
