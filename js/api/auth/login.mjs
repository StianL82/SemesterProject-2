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
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse response JSON:", jsonError);
        alert("Login failed. Invalid response from the server.");
        return;
      }

      const { accessToken, ...user } = responseData.data || {};

      if (accessToken) {
        storage.save("token", accessToken);
        storage.save("profile", user);
        window.location.href = "/index.html";
      } else {
        console.error("Login failed: Access token not found in response.");
        alert("Login failed: Access token not found.");
      }
    } else {
      const errorMessage = await response.text();
      
      if (response.status >= 400 && response.status < 500) {
        console.error("Client error:", errorMessage);
        alert("Login failed. Please check your email and password.");
      } else if (response.status >= 500) {
        console.error("Server error:", errorMessage);
        alert("Login failed due to a server error. Please try again later.");
      } else {
        console.error("Unexpected error:", errorMessage);
        alert("Login failed. Please try again.");
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error. Please check your internet connection and try again.");
  }
}

