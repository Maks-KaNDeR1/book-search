import axios from 'axios';

// let key = 'AIzaSyDwIk5yc27iRinGB4KjckAX4pmeEAWMVZ0'

let baseURL = 'https://www.googleapis.com/books/v1/'


export const booksAPI = {

    getVolumeBooks: (searchTerms?: string, sorting?: string, startIndex?: number) =>
        axios.get<BooksType>(`${baseURL}volumes?q=${searchTerms}&orderBy=${sorting}&maxResults=30&startIndex=${startIndex}`),

    getVolumeBook: (volumeId: string | undefined) =>
        axios.get<BookType>(`${baseURL}volumes/${volumeId}`),

}


export type BooksType = {
    kind: string
    totalItems: number
    items: BookType[]
}

export type BookType = {
    etag: string
    id: string
    kind: string
    saleInfo: {}
    searchInfo: {
        textSnippet: string
    }
    selfLink: string
    volumeInfo: {
        title: string
        authors: [
            string
        ],
        publisher: string
        publishedDate: string
        description: string
        imageLinks: {
            smallThumbnail: string
            thumbnail: string
        }
        categories: string[]
    },
}
