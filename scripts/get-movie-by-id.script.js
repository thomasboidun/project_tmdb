const DEBUG = true;

const KEY_API = "07c46040480c9241ae39ac3f3631f160";
const LANG = "fr-FR";

let location_search = document.location.search;
if (DEBUG) console.log(location_search);

const MOVIE_ID = location_search.split('?id=')[1];
if (DEBUG) console.log(MOVIE_ID);

// get movie by id
fetch("https://api.themoviedb.org/3/movie/" + MOVIE_ID + "?api_key=" + KEY_API + "&language=" + LANG)
  .then(data => data.json())
  .then(response => {
    if (DEBUG) console.log(response);
    getMovieInfo(response);
  })
  .catch(err => console.error(err));

function getMovieInfo(movie) {
  if (DEBUG) console.log("poster_path:", movie.poster_path);
  if (DEBUG) console.log("title:", movie.title);
  if (DEBUG) console.log("release_date:", movie.release_date);
  if (DEBUG) console.log("adult", movie.adult);
  if (DEBUG) console.log("genres:", movie.genres);
  if (DEBUG) console.log("runtime:", movie.runtime);
  if (DEBUG) console.log("vote_average:", movie.vote_average);
  if (DEBUG) console.log("overview:", movie.overview);

  let movie_section = document.querySelector('._movie-section');
  movie_section.style.backgroundImage = `linear-gradient(to right, rgba(var(--tmdbDarkBlue), 0.8) 0%, rgba(var(--tmdbDarkBlue), 0) 100%), url("https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/${movie.backdrop_path}")`;
  movie_section.style.backgroundSize = "cover";

  let movie_poster = document.querySelector('._movie-section img[alt=poster]');
  movie_poster.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path);

  let movie_title = document.querySelector('._movie-title');
  movie_title.innerHTML = `${movie.title} <span class="_movie-release font-weight-light">(${new Date(movie.release_date).getFullYear()})</span>`;

  let movie_genres = document.querySelector('._movie-genres');
  movie_genres.innerHTML = "";

  for (let i = 0; i <= movie.genres.length - 1; i++) {
    movie_genres.innerHTML += movie.genres[i].name;
    if(i !== movie.genres.length - 1) movie_genres.innerHTML += ", ";
  }

  let movie_runtime = document.querySelector('._movie-runtime');
  movie_runtime.innerHTML = movie.runtime +"min";

  let movie_average = document.querySelector('._movie-average');
  movie_average.innerHTML = `${movie.vote_average * 10}%`;

  let movie_overview = document.querySelector('._movie-overview');
  movie_overview.innerHTML = movie.overview;
}