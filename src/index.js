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

  const updateCatInfo = catData => {
    if (catData && catData.breeds && catData.breeds.length > 0) {
      const cat = catData.breeds[0];
      const breed = cat.breeds[0] || {};

      if (catImage) {
        catImage.src = cat.url || '';
      }

      if (breedName) {
        breedName.textContent = `Name: ${breed.name || ''}`;
      }

      if (description) {
        description.textContent = `Description: ${breed.description || ''}`;
      }

      if (temperament) {
        temperament.textContent = `Temperament: ${breed.temperament || ''}`;
      }

      if (catInfo) {
        catInfo.style.display = 'block';
      }
    }
  };

  const clearCatInfo = () => {
    if (catImage) {
      catImage.src = '';
    }

    if (breedName) {
      breedName.textContent = '';
    }

    if (description) {
      description.textContent = '';
    }

    if (temperament) {
      temperament.textContent = '';
    }

    if (catInfo) {
      catInfo.style.display = 'none';
    }
  };

  breedSelect.addEventListener('change', async () => {
    const selectedBreedId = breedSelect.value;
    showLoader();
    hideError();
    clearCatInfo();

    try {
      const response = await fetchCatByBreed(selectedBreedId);
      const catData = response.data;
      updateCatInfo(catData);
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
