import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";

import { router } from "./router.mjs";

await router();

/* import { API_HOST_URL } from "./api/constants.mjs";

async function generateAndLogApiKey(name = "API Key") {
  const apiKeyURL = `${API_HOST_URL}/auth/create-api-key`;

  try {
    const response = await fetch(apiKeyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }), // Sender API-nøkkelnavnet i forespørselen
    });

    if (response.ok) {
      const data = await response.json();
      const apiKey = data.data.key;
      console.log("Your API Key:", apiKey);
      // Her kan du velge å lagre nøkkelen på et trygt sted hvis nødvendig
      return apiKey;
    } else {
      const errorMessage = await response.text();
      console.error("Failed to create API key:", errorMessage);
      throw new Error(`Failed to create API key: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error occurred while creating API key:", error);
    throw error;
  }
}

// Kall funksjonen for å generere og logge API-nøkkelen
generateAndLogApiKey("My Custom API Key").then(() => {
  console.log("API Key generation complete. You can now delete this function.");
}).catch((error) => {
  console.error("There was an issue generating the API Key:", error);
}); */
