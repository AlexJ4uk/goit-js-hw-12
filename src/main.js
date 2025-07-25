import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";

const form = document.querySelector('.form');
const input = form.querySelector('input');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const query = input.value.trim();
    input.value = '';
    
    if (!query) {
        iziToast.warning({
            message: 'Please enter a search query.',
            position: 'topRight',
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
            maxWidth: 432
        });
        return;
    }

    showLoader();
    clearGallery();

    getImagesByQuery(query)
        .then(data => {
            hideLoader();

            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: '#ef4040',
                    messageColor: '#ffffff',
                    maxWidth: 432
                });
                return;
            }
            createGallery(data.hits);
            
        })
        .catch(error => {
            hideLoader();
            iziToast.error({
                message: 'Failed to fetch images. Please try again later.',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: '#ffffff',
                maxWidth: 432
            });  
        });
}