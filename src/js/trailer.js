import { onPressKey } from "./modal-window.js";
import config from "../data-base//config.json";

const backTrailerRef = document.querySelector(".trailer-box");

function fetchUrl(movieID) {
  const url = `${config.baseURL}movie/${movieID}/videos?api_key=${config.KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let youtubeKey = data.results[0].key;
      backTrailerRef.classList.add("is-open");
      backTrailerRef.insertAdjacentHTML(
        "beforeend",
        `<div class="trailer-iframe">
      <iframe class ="trailer"
      type="text/html"
      src="http://www.youtube.com/embed/${youtubeKey}?color=red&modestbranding=1" 
      frameborder="0"
      allow="accelerometer; picture-in-picture; autoplay"
      allowfullscreen
      ></iframe>
      </div>
      `,
      );

      showBtnClosePlayer(document.querySelector(".trailer-iframe"));
    })
    .catch(() => {
      backTrailerRef.classList.add("is-open");
      backTrailerRef.insertAdjacentHTML(
        "beforeend",
        `<div class="trailer-iframe search-error">
        <iframe class ="trailer"
        type="text/html"
          src="https://giphy.com/embed/WY6omKOR8oRLG" 
          frameborder="0"
          allow="accelerometer; picture-in-picture; autoplay"
          allowfullscreen
          ></iframe>
          </div>
          `,
      );
      showBtnClosePlayer(document.querySelector(".trailer-iframe"));
    });
}

function showBtnClosePlayer(trailerFrameRefs) {
  let timerId = setTimeout(() => {
    trailerFrameRefs.insertAdjacentHTML(
      "beforeend",
      `<button class="btn-close-player">
      <svg class="btn-close-icon">
      <use href="./images/symbol-defs.svg#icon-cancel"></use>
      </svg>
      </button>`,
    );
    clearTimeout(timerId);
  }, 400);
}

function escPlayerHandler(event) {
  if (event.code === "Escape") {
    onClosePlayer();
  }
  window.addEventListener("keydown", onPressKey);
}

function onClosePlayer() {
  backTrailerRef.classList.remove("is-open");
  backTrailerRef.innerHTML = "";
}

window.addEventListener("keydown", escPlayerHandler);
backTrailerRef.addEventListener("click", onClosePlayer);

export function playTrailer() {
  const buttonTrailerRefs = document.querySelector(".button-trailer");
  const posterSvgRefs = document.querySelector(".trailer-box-svg-on");

  function showPosterPlay(event) {
    let movieID = event.currentTarget.dataset.id;
    fetchUrl(movieID);
    window.removeEventListener("keydown", onPressKey);
  }
  posterSvgRefs.addEventListener("click", showPosterPlay);
  buttonTrailerRefs.addEventListener("click", showPosterPlay);
}
