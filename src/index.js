import axios from 'axios';

$(document).ready(function () {
  const $searchForm = $('#search-form');
  const $gallery = $('.gallery');
  const $loadMoreBtn = $('.load-more');
  let currentPage = 1;

  $searchForm.submit(function (event) {
    event.preventDefault();
    const searchQuery = $('input[name="searchQuery"]').val();

    // Reset pagination
    currentPage = 1;

    // Clear gallery
    $gallery.html('');

    searchImages(searchQuery);
  });

  $loadMoreBtn.click(function () {
    const searchQuery = $('input[name="searchQuery"]').val();
    currentPage++;
    searchImages(searchQuery);
  });

  async function searchImages(query) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Pixabay API key
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;

    try {
      const response = await axios.get(apiUrl);

      if (response.data.hits.length > 0) {
        // Show notification for the first search
        if (currentPage === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        }

        // Append images to the gallery
        response.data.hits.forEach(image => {
          const cardHtml = `
            <div class="photo-card">
              <a href="${image.largeImageURL}" class="lightbox" data-lightbox="gallery">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                <p class="info-item"><b>Views:</b> ${image.views}</p>
                <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
              </div>
            </div>
          `;
          $gallery.append(cardHtml);
        });

        // Refresh SimpleLightbox after adding new images
        const lightbox = new SimpleLightbox('.lightbox');
        lightbox.refresh();

        // Scroll to the newly added images
        const { height: cardHeight } = $gallery
          .children()
          .last()
          .get(0)
          .getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        // Show Load more button if there are more images
        if (response.data.totalHits > currentPage * 40) {
          $loadMoreBtn.show();
        } else {
          $loadMoreBtn.hide();
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        // Show notification if no images found
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
});
