import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions.js";

const form = document.querySelector('.form');
const input = form.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more-btn');

hideLoadMoreButton();

form.addEventListener('submit', handleSubmit);

let page = 1;
let query = '';

loadMoreBtn.addEventListener('click', onLoadBtn);

async function handleSubmit(event) {
    event.preventDefault();

    page = 1;
    query = input.value.trim();
    
    if (!query) {
        return showToast('warning', 'Please enter a search query.');
    }

    showLoader();
    clearGallery();
    hideLoadMoreButton();

    try {
        const imagesResults = await getImagesByQuery(query, page);

        if (imagesResults.hits.length === 0) {
            return showToast('error', 'Sorry, there are no images matching your search query.');
        }
        createGallery(imagesResults.hits);

        if (imagesResults.totalHits > 15) {
            showLoadMoreButton();
        }

        if (imagesResults.totalHits <= page * 15) {
            return showToast('info', "You've reached the end of search results.");
        }
    }

    catch (error) {
        return showToast('error', 'Failed to fetch images. Please try again later.');
    }

    finally {
        hideLoader();
    }
}

async function onLoadBtn() {
    page++;
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        hideLoader();
        createGallery(data.hits);
        
        const firstItem = document.querySelector('.gallery').firstElementChild;

        if (firstItem) {
            const { height: cardHeight } = firstItem.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }

        if (data.totalHits <= page * 15) {
            showToast('info', "You've reached the end of search results.");
            setTimeout(() => {
        hideLoadMoreButton();
            }, 1000);
            return;
        }
        else {
            showLoadMoreButton();
        }
        
    } catch (error) {
        return showToast('error', "Failed to load more images. Please check your connection or try again.");
    }
    finally {
        hideLoader();
    }
}

function showToast(type, message) {
    iziToast[type]({
        message,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
        maxWidth: 432
    });
}