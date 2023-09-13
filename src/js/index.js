import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchQuery } from './API-service';
import { markupGalerry } from './markup-galerry';
import { refs } from './refs';

refs.form.addEventListener('submit', fetchGallery);
const lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let searchValue = '';

async function fetchGallery(e) {
  e.preventDefault();
  refs.loader.classList.remove('hidden');
  refs.btnloadMore.classList.add('hidden');
  refs.galleryBox.innerHTML = '';
  searchValue = e.currentTarget.searchQuery.value.trim();
  currentPage = 1;
  responseProcessing();
}

async function responseProcessing() {
  try {
    const data = await fetchQuery(searchValue, currentPage);
    const gallery = data.hits;
    const totalHits = data.totalHits;

    if (gallery.length === 0 || searchValue === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loader.classList.add('hidden');
      return;
    }

    if (currentPage === 1) {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }

    const markup = markupGalerry(gallery);
    refs.galleryBox.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    refs.loader.classList.add('hidden');

    if (currentPage * 40 >= totalHits) {
      refs.btnloadMore.classList.add('hidden');
      refs.btnloadMore.removeEventListener('click', handleClick);
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      refs.btnloadMore.classList.remove('hidden');
      refs.btnloadMore.addEventListener('click', handleClick);
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loader.classList.add('hidden');
  }
}

async function handleClick() {
  currentPage++;
  refs.loader.classList.remove('hidden');
  await responseProcessing();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
