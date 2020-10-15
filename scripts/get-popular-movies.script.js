const DEBUG = true;

const KEY_API = "07c46040480c9241ae39ac3f3631f160";
const LANG = "fr-FR";

// get trending movie
fetch("https://api.themoviedb.org/3/discover/movie?api_key="+KEY_API+"&language="+LANG+"&sort_by=popularity.desc&include_adult=false&include_video=false&page=1;")
  .then(data => data.json())
  .then(response => {
    if(DEBUG) console.log(response);
    return getTrendingMovie(response.results);
  })
  .catch(err => console.error(err));

  // get trending movie in html
function getTrendingMovie(data) {
  if(DEBUG) console.log(data);
  let row = document.querySelector("main > ._popular-section > ._popular-movies");
  let html = "";
  data.forEach(movie => {
    html += `
      <div class="card mx-1 _popular-movie">
        <a href="movie.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" width="150" height="225" alt="poster"/>
        </a>
        <button type="button" class="btn btn-light _btn-more-horiz">
        <span class="material-icons"> more_horiz </span>
        </button>
        <button type="button" class="btn btn-dark _btn-average" data-toggle="popover" title="Nombre de vote :" data-content="${movie.vote_count}">
          <span class="font-weight-bold">${movie.vote_average * 10}%</span>
        </button>
        <div class="card-body mt-3 p-1">
          <div class="card-title mb-0">
          <span class="font-weight-bold">${movie.title}</span> <br/>
          </div>
          <span class="font-weight-light">${new Date(movie.release_date).toLocaleDateString()}</span>
        </div>
      </div>
    `;
  });
  row.innerHTML = html;
}