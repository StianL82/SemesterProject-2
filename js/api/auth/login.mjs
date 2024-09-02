import { API_HOST_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_HOST_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Full response data:", responseData);

      // Ekstraher data fra responsen korrekt
      const { accessToken, ...user } = responseData.data || {};

      if (accessToken) {
        console.log("Login successful, saving token and profile.");
        storage.save("token", accessToken);
        storage.save("profile", user);
        window.location.href = "/index.html";
      } else {
        console.error("Login failed: Access token not found in response.");
        alert("Login failed: Access token not found.");
      }
    } else {
      const errorMessage = await response.text();
      console.error("Login failed:", errorMessage);
      alert(
        "Login failed. Please check that your email or password is correct."
      );
    }
  } catch (error) {
    console.error("Network error:", error);
    alert(
      "Network error. Please check your internet connection and try again."
    );
  }
}
