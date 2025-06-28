
const moodButtons = document.querySelectorAll(".mood-btn");
const spinBtn = document.getElementById("spinBtn");
let selectedGenre = null;

// Highlight selected mood
moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    const genre = button.getAttribute("data-genre");

    // If the clicked button is already selected, deselect it
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
      selectedGenre = null;
      localStorage.removeItem("selectedGenre");
    } else {
      // Deselect all others
      moodButtons.forEach(btn => btn.classList.remove("selected"));

      // Select this one
      button.classList.add("selected");
      selectedGenre = genre;
      localStorage.setItem("selectedGenre", selectedGenre);
    }
  });
});


