import cardTemplate from "../templates/movie-card.hbs";
import movieButtons from "../js/buttons-movie";


const gallery = document.querySelector(".photo-gallery-list");

export default function markupSearch(data) {
  data.results.map((movie) => markup(movie));
  gallery.innerHTML = cardTemplate(data.results);
  const li = document.querySelectorAll(".photo-gallery-item");
  movieButtons(li, data);
}

export function markup(movie) { 

  if (movie.wasMarkedUp) return;
  movie.title = movie.title.toUpperCase();

  if (movie.title.length > 31) {
    movie.title = movie.title.substring(0, 29) + "...";
  }

  let newGenres = JSON.parse(localStorage.getItem("genres"));
  newGenres.map(genre=>genre.name.toUpperCase())
  let movieGenres = [];

  if (movie.genre_ids) {
    movie.genre_ids.forEach((el) => {
      const foundGenreName = newGenres.find((item) => item.id === el);
      if (foundGenreName) {
        movieGenres.push(" " + foundGenreName.name)};
    });
  } else if (movie.genres) {
    movie.genres.forEach((el) => {
      const foundGenreName = newGenres.find((item) => item.name === el.name);
      if (foundGenreName) movieGenres.push(" " + foundGenreName.name);      
    });    
  }

  const lang = localStorage.getItem("lang");

  lang === "en-US" && !movieGenres.length ? movieGenres.push(" Other") : "";
  lang === "ru-RU" || lang === "RU" && !movieGenres.length ? movieGenres.push(" Другое") : "";
  movie.genres = movieGenres.slice(0, 2);

  if (movie.release_date) {
    movie.release_date = movie.release_date.substring(0, 4);
  }

  if (movie.poster_path)
    movie.poster_path =
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
      movie.poster_path;
  else
    movie.poster_path =
      "https://sales.arecontvision.com/images/products/img_placeholder_41845_xl.jpg";

  movie.wasMarkedUp = true;

  return movie;
}
