import "./styles.css";
import "./js/header/header.js";
import fetchMovies from "../src/js/fetchMovies.js";
import { fetchGenres } from "./js/fetchMovies.js";
import "./js/pagination.js";
import "./js/spinner.js";
import "./js/search-input.js";
import "./js/modal-window.js";
import "./js/switch-language.js";
import "./js/top-filters.js";
import "./js/localstorage/localstorage.js";
import "./js/markup-library.js";
import "./js/markup.js";
import "./js/buttons-movie";
import "./js/theme-switch.js";
import "./js/up-to.js";
import "./js/team-modal.js";

export let genres = [];

let lang = localStorage.getItem("lang");
if (!lang) {
  lang = "en-US";
  localStorage.setItem("lang", lang);
}

fetchGenres(lang).then((res) => {
  genres = res;
  localStorage.setItem("genres", JSON.stringify(genres));
  fetchMovies();
});
