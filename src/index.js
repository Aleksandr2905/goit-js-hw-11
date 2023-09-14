import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from "./pixabay-api";
import { createGalleryCards } from "./gallery-cards";

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
};

const pixabayAPI = new PixabayAPI();

const onSearchFormElSubmit = async event => {
    event.preventDefault();

    pixabayAPI.query = event.target.searchQuery.value.trim();

    pixabayAPI.page = 1;

    if (pixabayAPI.query === '') {
        Notify.failure(`Enter a word to search for`)
            
        return;
    }

    try { 
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    if (data.totalHits === 0) {
        Notify.failure(`Invalid search word`)

        event.target.reset();

        refs.galleryEl.innerHTML = '';

        refs.loadMoreBtnEl.classList.add('is-hidden');

        return;
    };

    if (data.totalHits === 1) {
        refs.galleryEl.innerHTML = createGalleryCards(data.hits);
        refs.loadMoreBtnEl.classList.add('is-hidden');
    }
    refs.galleryEl.innerHTML = createGalleryCards(data.hits);
    refs.loadMoreBtnEl.classList.remove('is-hidden');
    } catch (err) {
        console.log(err);
    }   

};    


const onLoadMoreBtnElClick = async event => { 
    pixabayAPI.page += 1;

    try {
        const { data } = await pixabayAPI.fetchPhotosByQuery()
        refs.galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

        if (pixabayAPI.page === data.totalHits) {
        refs.loadMoreBtnEl.classList.add('is-hidden'); 
        Notify.failure(`We're sorry, but you've reached the end of search results`);    
        }
    } catch (err) {
        Notify.failure(`err`);
    }    
};

refs.searchFormEl.addEventListener('submit', onSearchFormElSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick)





    