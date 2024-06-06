const watchlistContainer = document.getElementById("watchlist");
const placeholder = document.getElementById("placeholder");
const removeBtn = document.getElementById("remove-btn");

function renderWatchlist() {
  watchlistContainer.innerHTML = "";

  if (!localStorage.getItem("watchlist")) {
    placeholder.style.display = "flex";
  } else {
    placeholder.style.display = "none";
    JSON.parse(localStorage.getItem("watchlist")).forEach((movie) => {
      watchlistContainer.innerHTML += `
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
                                  <button class="remove-btn">Remove from Watchlist</button>
                              </div>     
                              <p>${movie.Plot}</p>
                          </div>
                      </div>
                      <hr/>
                  `;
    });
  }
}

renderWatchlist();

watchlistContainer.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target.classList.contains("remove-btn")) {
    const movieTitle = event.target.closest(".movie-item").id;
    console.log(movieTitle);
    removeFromWatchlist(movieTitle);
  }
});

function removeFromWatchlist(movieTitle) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist = watchlist.filter((movie) => movie.Title !== movieTitle);
  if (watchlist.length > 0) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  } else {
    localStorage.removeItem("watchlist");
  }
  renderWatchlist();
}
