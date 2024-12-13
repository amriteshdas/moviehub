const API_KEY = 'f2e9b107';
const trendingMoviesContainer = document.getElementById('trendingMovies');
const recommendationsContainer = document.getElementById('movieResults');
const darkModeToggle = document.getElementById('darkModeToggle');
const genreButtons = document.querySelectorAll('.genres button');

// Fetch Trending Movies
async function fetchTrendingMovies() {
    const res = await fetch(`https://www.omdbapi.com/?s=top&type=movie&apikey=${API_KEY}`);
    const data = await res.json();
    displayMovies(data.Search, trendingMoviesContainer);
}

// Fetch Movies by Genre
async function fetchMoviesByGenre(genre) {
    const res = await fetch(`https://www.omdbapi.com/?s=${genre}&type=movie&apikey=${API_KEY}`);
    const data = await res.json();
    displayMovies(data.Search, recommendationsContainer);
}

// Display Movies
function displayMovies(movies, container) {
    container.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `).join('');
}

// Event Listeners
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

genreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const genre = button.getAttribute('data-genre');
        fetchMoviesByGenre(genre);
    });
});

// Initial Fetch
fetchTrendingMovies();
