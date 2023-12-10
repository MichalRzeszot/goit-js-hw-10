import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelector = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorMessageElement = document.querySelector('.error');
errorMessageElement.classList.add('error-message');

let isFirstLoad = true;

function setLoadingState(isBreedsLoading, isCatLoading) {
  if (isBreedsLoading) {
    if (!isFirstLoad) {
      loaderElement.textContent = 'Loading breeds, please wait...';
      loaderElement.style.display = 'block';
      document.body.classList.add('breeds-loading');
    } else {
      loaderElement.textContent = '';
      loaderElement.style.display = 'none';
      isFirstLoad = false;
    }
  } else if (isCatLoading) {
    loaderElement.textContent = 'Loading cat information, please wait...';
    loaderElement.style.display = 'block';
    document.body.classList.add('cat-loading');
  } else {
    loaderElement.textContent = '';
    loaderElement.style.display = 'none';
    document.body.classList.remove('breeds-loading', 'cat-loading');
  }
  errorMessageElement.style.display = 'none';
}

fetchBreeds()
  .then(breeds => {
    setLoadingState(true, false);
    const breedOptionsMarkup = breeds.map(
      breed => `<option value="${breed.id}">${breed.name}</option>`
    );
    breedSelector.innerHTML = breedOptionsMarkup.join('');
  })
  .catch(error => {
    setLoadingState(false, false);
    errorMessageElement.style.display = 'block';
    Notiflix.Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!'
    );
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
      setLoadingState(false, false);
      errorMessageElement.style.display = 'block';
      Notiflix.Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(function () {
      setLoadingState(false, false);
    });
});
