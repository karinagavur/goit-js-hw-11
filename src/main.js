import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = formEl
  ? formEl.querySelector('input[name="search-text"]')
  : null;

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let isLoading = false;

if (!formEl || !inputEl) {
  console.error();
}

formEl.addEventListener('submit', onSearchSubmit);
window.addEventListener('scroll', onScrollLoad);

async function onSearchSubmit(event) {
  event.preventDefault();

  const query = inputEl.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  totalHits = 0;

  await loadImages();
}

async function loadImages() {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    if (!data || !Array.isArray(data.hits)) {
      iziToast.error({
        title: 'Error',
        message: 'Unexpected response from the server.',
        position: 'topRight',
      });
      return;
    }

    if (data.hits.length === 0 && currentPage === 1) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    iziToast.success({
      title: 'Success',
      message: `Found ${totalHits} images. Showing ${
        currentPage * 40 <= totalHits ? currentPage * 40 : totalHits
      }.`,
      position: 'topRight',
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
}

function onScrollLoad() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    if (currentPage * 40 >= totalHits) return;
    currentPage += 1;
    loadImages();
  }
}
