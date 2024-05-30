import SlimSelect from "slim-select";
import "slim-select/styles";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchBreeds, fetchCatByBreed } from "./request-helper.js";

const BREEDS_CACHE_KEY = 'cat_breeds';

let simpleCache = {};

function toggleHiddenCompletely(element, isVisible) {
  element.classList.toggle("is-hidden-compeletely", !isVisible);
}

function selectorUpload(selector, loader, catDescription) {
  fetchBreeds()
    .then(function (breeds) {
      selector.classList.remove("is-invisible");
      const slimSelector = breeds.map(
        ({ id, name }) => `<option value="${id}">${name}</option>`
      );
      selector.insertAdjacentHTML("afterbegin", slimSelector.join(""));
      new SlimSelect({
        select: selector,
      });

      localStorage.setItem(BREEDS_CACHE_KEY, breeds);
    })
    .catch(function (error) {
      handleError(error);
    })
    .finally(function () {
      toggleHiddenCompletely(selector, true);
      toggleHiddenCompletely(loader, false);
      toggleHiddenCompletely(catDescription, true);
    });
}

function createMarkup(event, selector, loader, catDescription) {
  toggleHiddenCompletely(catDescription, false);
  toggleHiddenCompletely(loader, true);
  toggleHiddenCompletely(selector, true);

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(function (catData) {
      console.log("catData: ", catData);

      if (catData.length === 0) {
        catDescription.innerHTML = ``;
        return;
      }
      let { url, breeds } = catData[0];

      catDescription.innerHTML = `
        <img src="${url}" alt="${breeds[0].name}" width="400" loading="lazy" />
        <div class="text-box">
          <h2>${breeds[0].name}</h2>
          <p>${breeds[0].description}</p>
          <p><b>Temperament: </b>${breeds[0].temperament}</p>
          <p><b>Origin: </b>${breeds[0].origin}</p>
        </div>`;
    })
    .catch(function (error) {
      handleError(error);
    })
    .finally(function () {
      toggleHiddenCompletely(loader, false);
      toggleHiddenCompletely(selector, true);
      toggleHiddenCompletely(catDescription, true);
    });
}

function handleError(error) {
  iziToast.error({
    title: "🔻 Oops!",
    message: error.message ?? "Something went wrong!",
    position: "topCenter",
  });
}

(() => {
  const selector = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");
  const catDescription = document.querySelector(".cat-description");

  selector.addEventListener("change", (event) =>
    createMarkup(event, selector, loader, catDescription)
  );
  selectorUpload(selector, loader, catDescription);
})();
