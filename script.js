const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchbar");
const movieList = document.getElementById("movie-list");
const placeholder = document.getElementById("placeholder");
let watchlist = [];

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  placeholder.style.display = "none";
  movieList.innerHTML = "";
  getMovieList(searchInput.value);
}

function getMovieList(movie) {
  fetch(`http://www.omdbapi.com/?apikey=32be5929&s=${movie}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        const movies = data.Search;
        movies.map((movie) => {
          fetch(
            `http://www.omdbapi.com/?apikey=32be5929&t=${movie.Title}&type=movie`
          )
            .then((response) => response.json())
            .then((movie) => {
              if (movie.Response === "True") {
                movieList.innerHTML += `
                <div class="movie-item" id="${movie.Title}">
                    <img src="${movie.Poster}" class="movie-poster"/>
                    <div class="movie-data">
                        <div class="title">
                            <h3>${movie.Title}</h3>
                            <img src="./assets/star-icon.png" heigth="15px"/>
                            <p>${movie.imdbRating}</p>
                        </div>
                        <div class="stats">
                            <p>${movie.Runtime}</p>
                            <p>${movie.Genre}</p>
                            <button class="watchlist-btn">Add to Watchlist</button>
                        </div>     
                        <p>${movie.Plot}</p>
                    </div>
                </div>
                <hr/>
            `;
              }
            });
        });
      } else {
        placeholder.style.display = "block";
        placeholder.innerHTML = "No movies found. Please try again.";
      }
    });
}

//Add Movie to Watchlist

movieList.addEventListener("click", (event) => {
  if (event.target.classList.contains("watchlist-btn")) {
    const movieTitle = event.target.closest(".movie-item").id;
    addToWatchlist(movieTitle);
    event.target.textContent = "Added to Watchlist!";
    event.target.disabled = true;
    event.target.style.textDecoration = "none";
  }
});

function addToWatchlist(movieTitle) {
  fetch(`http://www.omdbapi.com/?apikey=32be5929&t=${movieTitle}&type=movie`)
    .then((response) => response.json())
    .then((movie) => {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    });
}
