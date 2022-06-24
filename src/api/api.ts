import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'https://www.googleapis.com/books/v1/',
//     headers: {
//         'key': 'AIzaSyDwIk5yc27iRinGB4KjckAX4pmeEAWMVZ0'
//     }
// })

let baseURL = 'https://www.googleapis.com/books/v1/'
let key = 'AIzaSyDwIk5yc27iRinGB4KjckAX4pmeEAWMVZ0'



export const booksAPI = {

    getVolumeBooks: (searchTerms?: string, sorting?: string, page?: number) =>
        axios.get<BooksType>(`${baseURL}volumes?q=${searchTerms}&orderBy=${sorting}&maxResults=30&page=${page}`),
    getVolumeBook: (volumeId: string | undefined) =>
        axios.get<BookType>(`${baseURL}volumes/${volumeId}`),



    // https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=yourAPIKey


}


export type BooksType = {
    kind: string // "books#volumes",
    totalItems: number // 431,
    items: BookType[]
}

export type BookType = {
    etag: string // "OuLlOhameZ0",
    id: string // "VbOtAQAACAAJ",
    kind: string // "books#volume",
    saleInfo: {}
    searchInfo: {
        textSnippet: string // "Charlie Gordon, a floor sweeper born with an unusually low IQ,"
    }
    selfLink: string // "https://www.googleapis.com/books/v1/volumes/VbOtAQAACAAJ",
    volumeInfo: {
        title: string // "Flowers for Algernon",
        authors: [
            string // "Daniel Keyes" 
        ],
        publisher: string // "Weidenfeld & Nicolson",
        publishedDate: string // "2017-07-13",
        description: string //
        imageLinks: {
            smallThumbnail: string // "http://books.google.com/books/content?id=VbOtAQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
            thumbnail: string // "http://books.google.com/books/content?id=VbOtAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }
        categories: string
    },
}
