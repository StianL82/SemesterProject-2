import * as storage from "../../storage/index.mjs";
import * as components from "../../components/index.mjs";
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
      const user = userData.data;

      storage.save("profile", user);
      sessionStorage.setItem("userEmail", user.email);

      alert("Registration successful! Please log in to continue.");

      const signupModal = bootstrap.Modal.getInstance(
        document.getElementById("signupModal")
      );
      if (signupModal) {
        signupModal.hide();
      }

      const form = document.querySelector("#signupModal form");
      if (form) {
        form.reset();
      }

      const loginModalElement = document.getElementById("loginModal");
      const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalElement);
      loginModal.show();

      components.hydrateEmailField();
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
