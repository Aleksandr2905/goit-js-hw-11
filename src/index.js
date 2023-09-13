import { PixabayAPI } from "./pixabay-api";
import { createGalleryCards } from "./gallery-cards";

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
};

const pixabayAPI = new PixabayAPI();

const onSearchFormElSubmit = event => {
    event.preventDefault();

    pixabayAPI.query = event.target.searchQuery.value.trim();

    pixabayAPI.page = 1;

    if (pixabayAPI.query === '') {
        alert`Введіть слово для пошуку`
        
        return;
    }
        
    pixabayAPI.fetchPhotosByQuery()
        .then(({data}) => {
            if (data.totalHits === 0) {
                alert`Некоректне слово для пошуку`

                event.target.reset();

                refs.galleryEl.innerHTML = '';

                refs.loadMoreBtnEl.classList.add('is-hidden');

                return;
            }

            if (data.totalHits === 1) {
                refs.galleryEl.innerHTML = createGalleryCards(data.hits);
                refs.loadMoreBtnEl.classList.add('is-hidden');
            }

            refs.galleryEl.innerHTML = createGalleryCards(data.hits);
            refs.loadMoreBtnEl.classList.remove('is-hidden');
        })
        .catch(err => {
            console.log(err);
        });
}

const onLoadMoreBtnElClick = event => { 
    pixabayAPI.page += 1;
    pixabayAPI.fetchPhotosByQuery()
        .then(({data}) => {
            refs.galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

            if (pixabayAPI.page === data.totalHits) {
               refs.loadMoreBtnEl.classList.add('is-hidden'); 
            }
        })
        .catch(err => {
            console.log(err);
        });

};

refs.searchFormEl.addEventListener('submit', onSearchFormElSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick)





    