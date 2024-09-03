import { register } from "../api/auth/register.mjs";

export function setRegisterFormListener() {
  const form = document.querySelector("#signupModal form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.avatar = {
        url: profile.avatar_url || null,
        alt: profile.avatar_alt || "",
      };
      delete profile.avatar_url;
      delete profile.avatar_alt;

      if (!profile.avatar.url) {
        delete profile.avatar;
      }

      try {
        await register(profile);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    });
  }
}
