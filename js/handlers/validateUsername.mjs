export function validateUsername(nameInput, nameError) {
  if (nameInput.value === "") {
    nameError.style.display = "none";
    nameInput.classList.add("mb-4");
    nameInput.classList.remove("mb-0");
  } else if (!/^[\w]+$/.test(nameInput.value)) {
    nameError.textContent =
      "Invalid username. Use only letters, numbers, and underscores.";
    nameError.style.display = "block";
    nameInput.classList.remove("mb-4");
    nameInput.classList.add("mb-0");
  } else {
    nameError.style.display = "none";
    nameInput.classList.add("mb-4");
    nameInput.classList.remove("mb-0");
  }
}