const API_KEY = "5b14b04732c241d8949ceb7a103e4c3c";
const resultDiv = document.querySelector(".movie-container");
const selectedGenre = localStorage.getItem("selectedGenre");

let bgColor = "#ffffff";
let containerColor = "#ffffff";
let fontColor = "#000000";
let titleColor = "#000000";


switch (selectedGenre) {
  case "35": // Comedy
    bgColor = "#fffbe6";
    containerColor = "#ffe066";
    fontColor = "#1a1a1a";
    titleColor = "#b3541e";
    break;
  case "18": // Drama
    bgColor = "#f4fbe2";
    containerColor = "#dce775";
    fontColor = "#263238";
    titleColor = "#37474f";
    break;
  case "27": // Horror
    bgColor = "#1c0000";
    containerColor = "#330000";
    fontColor = "#ffffff";
    titleColor = "#ff4d4d";
    break;
  case "28": // Action
    bgColor = "#1b0f00";
    containerColor = "#d84315";
    fontColor = "#ffffff";
    titleColor = "#ffcccb";
    break;
  case "10749": // Romance
    bgColor = "#fff0f5";
    containerColor = "#ffb6c1";
    fontColor = "#2e2e2e";
    titleColor = "#c2185b";
    break;
  case "53": // Thriller
    bgColor = "#0f0f0f";
    containerColor = "#c62828";
    fontColor = "#ffffff";
    titleColor = "#ffbaba";
    break;
  case "14": // Fantasy
    bgColor = "#f3e8ff";
    containerColor = "#b388ff";
    fontColor = "#2e2e2e";
    titleColor = "#6a1b9a";
    break;
  case "878": // Sci-Fi
    bgColor = "#e0f7fa";
    containerColor = "#4dd0e1";
    fontColor = "#003f5c";
    titleColor = "#00796b";
    break;
  case "10770": // Sports
    bgColor = "#e8f5e9";
    containerColor = "#81c784";
    fontColor = "#1b5e20";
    titleColor = "#33691e";
    break;
  case "9648": // Mystery
    bgColor = "#1c0f2e";
    containerColor = "#6a1b9a";
    fontColor = "#ffffff";
    titleColor = "#d1c4e9";
    break;
}

// 💡 Apply the styles
document.body.style.backgroundColor = bgColor;
resultDiv.style.backgroundColor = containerColor;
resultDiv.style.color = fontColor;
resultDiv.style.padding = "30px";
resultDiv.style.borderRadius = "15px";
resultDiv.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";

if (!selectedGenre) {
  resultDiv.innerHTML = `<p style="font-size:18px;">No mood selected. Please go back and choose one.</p>`;
} else {
  fetchMovie();
}

async function fetchMovie() {
  try {
    resultDiv.innerHTML = `<p style="font-size:18px;">Loading your movie...</p>`;

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&language=en-US&page=1`;

    const response = await fetch(url);

    const data = await response.json();

    const movies = data.results;

    if (!movies || movies.length === 0) {
      resultDiv.innerHTML = `<p>No movies found for this genre.</p>`;
      return;
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    displayMovie(randomMovie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    resultDiv.innerHTML = `<p>Something went wrong. Please try again.</p>`;
  }
}

function displayMovie(movie) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  resultDiv.innerHTML = `
    <h2 style="color: ${titleColor}; font-size:45px ;margin-bottom: 20px; text-">🎞️ ${movie.title}</h2>
    <img src="${poster}" alt="${movie.title}" style="max-width: 350px; border-radius: 15px; box-shadow: 0 6px 15px rgba(0,0,0,0.3);" />
    
    <p style="margin-top: 15px; font-size: 16px; color: ${fontColor};"><strong>Rating:</strong> ${movie.vote_average}</p>
    
    <p style="margin: 15px 0; font-size: 15px; line-height: 1.5; color: ${fontColor};">
      ${movie.overview || "No overview available."}
    </p>

    <div class="buttons" style="margin-top: 25px; display: flex; gap: 15px; justify-content: center;">
      <button onclick="window.location.reload()" style="padding: 10px 20px; border: none; background-color: #ffffff; color: #000; border-radius: 8px; font-weight: bold; cursor: pointer;">🎲 Spin Again</button>
      <a href="index.html">
        <button style="padding: 10px 20px; border: none; background-color: #ffffff; color: #000; border-radius: 8px; font-weight: bold; cursor: pointer;">⬅️ Go Back</button>
      </a>
    </div>
  `;
}
