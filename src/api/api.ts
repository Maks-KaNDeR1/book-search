import axios from 'axios';
import { BooksType, BookType } from './types';

// let key = 'AIzaSyDwIk5yc27iRinGB4KjckAX4pmeEAWMVZ0'

let baseURL = 'https://www.googleapis.com/books/v1/'


export const booksAPI = {
    getVolumeBooks: (searchTerms?: string, sorting?: string, startIndex?: number) =>
        axios.get<BooksType>(`${baseURL}volumes?q=${searchTerms}&orderBy=${sorting}&maxResults=30&startIndex=${startIndex}`),

    getVolumeBook: (volumeId: string | undefined) =>
        axios.get<BookType>(`${baseURL}volumes/${volumeId}`),

}
