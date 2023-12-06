import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const breedSelect = document.querySelector('.breed-select');
  const catInfo = document.querySelector('.cat-info');
  const catImage = document.querySelector('.cat-info img');
  const breedName = document.querySelector('.cat-info h2');
  const description = document.querySelector('.cat-info p:first-child');
  const temperament = document.querySelector('.cat-info p:last-child');

  let breeds = [];

  const showLoader = () => {
    loader.style.display = 'block';
  };

  const hideLoader = () => {
    loader.style.display = 'none';
  };

  const showError = () => {
    error.style.display = 'block';
  };

  const hideError = () => {
    error.style.display = 'none';
  };

  const fillBreedsSelect = () => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.add(option);
    });
  };

  const showCatInfo = catData => {
    catImage.src = catData.url;
    breedName.textContent = catData.breeds[0].name;
    description.textContent = `Description: ${catData.breeds[0].description}`;
    temperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
    catInfo.style.display = 'block';
  };

  const clearCatInfo = () => {
    catImage.src = '';
    breedName.textContent = '';
    description.textContent = '';
    temperament.textContent = '';
    catInfo.style.display = 'none';
  };

  breedSelect.addEventListener('change', async () => {
    const selectedBreedId = breedSelect.value;
    showLoader();
    hideError();
    clearCatInfo();

    try {
      const response = await fetchCatByBreed(selectedBreedId);
      const catData = response[0];
      showCatInfo(catData);
    } catch (error) {
      showError();
    } finally {
      hideLoader();
    }
  });

  const initializeApp = async () => {
    showLoader();
    hideError();

    try {
      breeds = await fetchBreeds();
      fillBreedsSelect();
    } catch (error) {
      showError();
    } finally {
      hideLoader();
    }
  };

  initializeApp();
});
