// Cambia esta URL por la de tu API en Azure o local:
const API_URL = "https://testtechno-bzd9fzh2bjbahxe3.brazilsouth-01.azurewebsites.net/movies"; 

const moviesList = document.getElementById("movies-list");
const errorMessage = document.getElementById("error-message");

async function loadMovies() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const movies = await response.json();
    renderMovies(movies);
  } catch (error) {
    console.error(error);
    showError("No se pudo cargar el catálogo de películas. Revisa si la API está levantada.");
  }
}

function renderMovies(movies) {
  moviesList.innerHTML = "";

  if (!movies || movies.length === 0) {
    moviesList.innerHTML = "<p>No hay películas disponibles.</p>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const title = document.createElement("h3");
    title.className = "movie-title";
    title.textContent = movie.title ?? "Sin título";

    const rating = document.createElement("p");
    rating.className = "movie-rating";
    rating.textContent = `⭐ Rating: ${movie.rating ?? "N/A"}`;

    const date = document.createElement("p");
    date.className = "movie-date";
    const releaseDate = movie.releaseDate ? new Date(movie.releaseDate) : null;
    date.textContent = releaseDate
      ? `📅 Estreno: ${releaseDate.toLocaleDateString()}`
      : "📅 Estreno: desconocido";

    card.appendChild(title);
    card.appendChild(rating);
    card.appendChild(date);

    moviesList.appendChild(card);
  });
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove("hidden");
}

loadMovies();
