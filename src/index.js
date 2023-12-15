import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let searchQuery = '';
let currentPage = 1;
let totalHits = 0;
let lightbox = null;

const API_KEY = '41266476-bb46a0bfc74cc3a1da8946be1';
const API_URL = 'https://pixabay.com/api/';

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.target.searchQuery.value;
  currentPage = 1;
  gallery.innerHTML = '';
  fetchImages();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  fetchImages();
});

async function fetchImages() {
  const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      displayImages(data.hits);
      totalHits = data.totalHits;
      loadMoreBtn.classList.toggle(
        'hidden',
        gallery.children.length >= totalHits
      );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Error fetching images. Please try again later.');
  }
}

function displayImages(images) {
  images.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');
    photoCard.innerHTML = `
            <a href="${image.largeImageURL}" data-lightbox="gallery">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                <p class="info-item"><b>Views:</b> ${image.views}</p>
                <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
            </div>
        `;
    gallery.appendChild(photoCard);
  });

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('[data-lightbox="gallery"]', {});
  }
}
