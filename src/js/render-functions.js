import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightBox = new simpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({ 
        webformatURL, largeImageURL, tags, likes, views, comments, downloads
    }) => {
        return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
        <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"/>
        <div class="info-wrap">
        <p><span><b>Likes</b></span>${likes}</p>
        <p><span><b>Views</b></span>${views}</p>
        <p><span><b>Comments</b></span>${comments}</p>
        <p><span><b>Downloads</b></span>${downloads}</p>
        </div>
        </a>
    </li>`}).join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    lightBox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-active');
}

export function hideLoader() {
  loader.classList.remove('is-active');
}

