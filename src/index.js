import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelector = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorSpanElement = document.querySelector('.error');

errorSpanElement.textContent = '';
loaderElement.textContent = '';
loaderElement.style.display = 'none';
loaderElement.style.scale = '1';

fetchBreeds()
  .then(breeds => {
    const breedOptionsMarkup = breeds.map(
      breed => `<option value="${breed.id}">${breed.name}</option>`
    );
    breedSelector.innerHTML = breedOptionsMarkup.join('');
  })
  .catch(error => {
    Notiflix.Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

breedSelector.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  catInfoContainer.innerHTML = '';
  loaderElement.style.display = 'block';

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
      Notiflix.Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loaderElement.style.display = 'none';
    });
});
