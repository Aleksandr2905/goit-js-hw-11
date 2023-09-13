import axios from "axios";

export class PixabayAPI { 
    static BASE_URL = `https://pixabay.com/api/`;
    static API_KEY = `39423334-465aef10dece7a90d90ef79ec`;

    constructor() {
        this.query = null;
        this.page = 1;
    }
    fetchPhotosByQuery() {
        const axiosOptions = {
            params: {
                q: this.query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                key: PixabayAPI.API_KEY,
                page: this.page,
                per_page: 40,
            },

        };

        return axios.get(`${PixabayAPI.BASE_URL}`, axiosOptions);
                 
    }
};
