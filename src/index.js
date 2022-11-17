import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewApiService from './news-service';
import LoadMoreBTN from "./components/load-more-btn";
import cards from "./templates/cards.hbs";


const refs = {
  searchForm: document.querySelector('.search-form'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery')
};

const loadMoreBtn = new LoadMoreBTN({
  selector: '[data-action="load-more"]',
  hidden: true,
});

let totalPages = 0;

const newApiService = new NewApiService();

const lightbox = new SimpleLightbox('.gallery a', {
  docClose: true,
  captionsData: 'alt',
  captionDelay: 250,
});


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
e.preventDefault();
 
  clearArticleContainer();
  loadMoreBtn.show();
  newApiService.resetPage();
  newApiService.query = e.currentTarget.elements.searchQuery.value;
   fetchHits();
}

function fetchHits() {
  loadMoreBtn.enable();
    newApiService.myApi().then(({ hits, totalHits }) => {
     if (newApiService.query === '') {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       clearArticleContainer();
      return loadMoreBtn.hide();
  }
    totalPages = totalHits;
    if (hits < 1) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      return loadMoreBtn.hide();
      
    }
     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
   createResultMarkup(hits);
    new SimpleLightbox('.gallery a');
     if (totalPages < 1) {
       Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        clearArticleContainer();

    }
  if (this.page == 1) {
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
  }
      newApiService.incrimentPage();
      if (totalPages > totalHits) {
     
      Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
     return loadMoreBtn.hide();
}
  });
    const { height: cardHeight } = document
    .querySelector('.gallery')
   .firstElementChild.getBoundingClientRect();
  window.scrollBy({
   top: cardHeight * 2,
  behavior: 'smooth',
 });
 lightbox.refresh();

}

function clearArticleContainer() {
  refs.gallery.innerHTML = '';
}

function createResultMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cards(hits));
}

