import { register } from "../api/auth/register.mjs";

export function setRegisterFormListener() {
  const form = document.querySelector("#signupModal form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // Håndter avatar-feltet som et objekt
      profile.avatar = {
        url: profile.avatar_url || null, // Sett til null hvis URL ikke er satt
        alt: profile.avatar_alt || "",   // Sett til tom streng hvis alt tekst ikke er satt
      };
      delete profile.avatar_url;
      delete profile.avatar_alt;

      // Fjern avatar-feltet hvis det ikke er satt noe i det
      if (!profile.avatar.url) {
        delete profile.avatar;
      }

      try {
        await register(profile);

        // Skjul registreringsmodalen
        const signupModal = bootstrap.Modal.getInstance(
          document.getElementById("signupModal")
        );
        if (signupModal) {
          signupModal.hide();
        }

        // Vis innloggingsmodalen med getOrCreateInstance
        const loginModalElement = document.getElementById("loginModal");
        const loginModal =
          bootstrap.Modal.getOrCreateInstance(loginModalElement);
        loginModal.show();
      } catch (error) {
        console.error("Registration failed:", error);
      }
    });
  }
}

