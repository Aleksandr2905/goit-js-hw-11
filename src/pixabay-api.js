export class PixabayAPI { 
    static BASE_URL = `https://pixabay.com/api/`;
    static API_KEY = `39423334-465aef10dece7a90d90ef79ec`;

    constructor() {
        this.query = null;
        this.page = 1;
    }
    fetchPhotosByQuery() {
        const searchParams = new URLSearchParams({
            q: this.query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,  
            key: PixabayAPI.API_KEY,
            page: this.page,
            per_page: 40,

        })

        return fetch(`${PixabayAPI.BASE_URL}?${searchParams}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }
        );            
    }
};

// fetch(`https://pixabay.com/api/?key=39423334-465aef10dece7a90d90ef79ec&q=auto&image_type=photo&orientation=horizontal&safesearch=true`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     });