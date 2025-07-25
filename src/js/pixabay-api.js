import axios from "axios";

const API_KEY = "51378434-708cb4473fdf89ff203a412e8";

export function getImagesByQuery(query) {
    return axios('https://pixabay.com/api/', {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 33
        }
    })
        .then(res => res.data)
}