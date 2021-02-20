import { checkFilm } from "../js/modal-window.js";
import { modalWatchedHandler } from "../js/modal-window.js";
import { modalQueueHandler } from "../js/modal-window.js";

export default function movieButtons(li, data) {
  if (!li || !data) return;

  for (let index = 0; index < li.length; ++index) {
    let el = li[index];
    let movie = data.results[index];

    el.addEventListener("mouseenter", (e) => {
      let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
      let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));      
      let watchedBtnText;
      let queueBtnText;
      let lang = localStorage.getItem('lang');

      if (checkFilm(watchedInLocalstorage, movie) && lang === "en-US") {
        watchedBtnText = "remove from Watched";
      } else if (checkFilm(watchedInLocalstorage, movie) && lang === "ru-RU") {
        watchedBtnText = "удалить из просмотренных";
      } else if (!checkFilm(watchedInLocalstorage, movie) && lang === "en-US") {
        watchedBtnText = "add to Watched";
      } else if (!checkFilm(watchedInLocalstorage, movie) && lang === "ru-RU") {
        watchedBtnText = "добавить в просмотренные";
      }

      if (checkFilm(queueInLocalstorage, movie) && lang === "en-US") {
        queueBtnText = "remove from queue";
      } else if (checkFilm(queueInLocalstorage, movie) && lang === "ru-RU") {
        queueBtnText = "удалить из очереди";
      } else if (!checkFilm(queueInLocalstorage, movie) && lang === "en-US") {
        queueBtnText = "add to queue";
      } else if (!checkFilm(queueInLocalstorage, movie) && lang === "ru-RU") {
        queueBtnText = "добавить в очередь";
      }

      e.target.insertAdjacentHTML(
        "afterBegin",
        `<div class="film-overlay"><button class="button watched-button button-anactive li-btn-js-watched">${watchedBtnText}</button>
              <button class="button queue-button button-anactive li-btn-js-queue">${queueBtnText}</button></div>`,
      );

      const mainSectionBtnQueue = document.querySelector(".li-btn-js-queue");
      const mainSectionBtnWatched = document.querySelector(
        ".li-btn-js-watched",
      );

      mainSectionBtnWatched.addEventListener(
        "click",
        modalWatchedHandler(movie, mainSectionBtnWatched, mainSectionBtnQueue),
      );
      mainSectionBtnQueue.addEventListener(
        "click",
        modalQueueHandler(movie, mainSectionBtnWatched, mainSectionBtnQueue),
      );
    });
    el.addEventListener("mouseleave", () => {
      const overlay = document.querySelector(".film-overlay");
      if (overlay) {
        overlay.remove();
      }
    });   
  }
}


