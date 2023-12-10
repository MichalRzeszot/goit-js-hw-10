import Notiflix from 'notiflix'; // Dodaj import Notiflix

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelector = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorMessageElement = document.querySelector('.error');
errorMessageElement.classList.add('error-message');

let isFirstLoad = true;

function setLoadingState(isBreedsLoading, isCatLoading, isError = false) {
  if (isBreedsLoading) {
    loaderElement.textContent = 'Loading data, please wait...';
    loaderElement.style.display = 'block';
    document.body.classList.add('breeds-loading');
    breedSelector.style.display = 'none';
  } else if (isCatLoading) {
    loaderElement.textContent = 'Loading data, please wait...';
    loaderElement.style.display = 'block';
    document.body.classList.add('cat-loading');
  } else {
    loaderElement.textContent = '';
    loaderElement.style.display = 'none';
    document.body.classList.remove('breeds-loading', 'cat-loading');
    breedSelector.style.display = 'block';
  }

  if (isError) {
    errorMessageElement.style.display = 'block';
    Notiflix.Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!'
    );
  } else {
    errorMessageElement.style.display = 'none';
  }
}

// Ukryj select na początku
breedSelector.style.display = 'none';
errorMessageElement.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    setLoadingState(true, false);
    const breedOptionsMarkup = breeds.map(
      breed => `<option value="${breed.id}">${breed.name}</option>`
    );
    breedSelector.innerHTML = breedOptionsMarkup.join('');
  })
  .catch(error => {
    setLoadingState(false, false, true);
  })
  .finally(() => {
    // Wywołaj setLoadingState bez isError, aby ukryć komunikat o błędzie przy ładowaniu strony
    setLoadingState(false, false, false);
  });

breedSelector.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  catInfoContainer.innerHTML = '';
  setLoadingState(false, true);

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const catHtml = catData.map(cat => {
        return `<img width="600" height="400" src="${cat.url}" class="cat-img"></img>
                <h2 class="cat-name">${cat.breeds[0].name}</h2>
                <p class="description">${cat.breeds[0].description}</p>`;
      });
      catInfoContainer.innerHTML = catHtml.join('');
    })
    .catch(error => {
      setLoadingState(false, false, true);
    })
    .finally(() => {
      setLoadingState(false, false);
    });
});
