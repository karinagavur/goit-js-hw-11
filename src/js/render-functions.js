import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderEl = document.querySelector('#loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  if (!galleryContainer) return;

  const markup = images
    .map(img => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;

      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${escapeHtml(
        tags
      )}" loading="lazy" />
        </a>
        <div class="info">
          <p class="item"><b>Likes:</b> ${likes}</p>
          <p class="item"><b>Views:</b> ${views}</p>
          <p class="item"><b>Comments:</b> ${comments}</p>
          <p class="item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>`;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add('visible');
}

export function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.remove('visible');
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
