import { BookType } from "../api/api";
import { BooksActionsType } from "./books-actions";

let initialState = {
    books: [] as BookType[],
    totalItemsCount: 0,
    searchValue: '',
    sorting: 'relevance',
    categories: 'all',
    startIndex: 0
};


export type BooksReducerType = typeof initialState

export const booksReducer = (state: BooksReducerType = initialState, action: BooksActionsType): BooksReducerType => {
    switch (action.type) {
        case 'BOOKS/SET_BOOKS': {
            return { ...state, books: action.books }
        }
        case 'BOOKS/SET_CATEGORIES_BOOKS':
        case 'BOOKS/ADD_BOOKS': {
            return { ...state, books: [...state.books, ...action.books] }
        }
        case 'BOOKS/SET_TOTAL_ITEMS_COUNT': {
            return { ...state, totalItemsCount: action.totalItemsCount }
        }
        case 'BOOKS/SET_SEARCH_VALUE': {
            return { ...state, searchValue: action.value }
        }
        case 'BOOKS/SET_SORTING':
            return { ...state, sorting: action.value }

        case 'BOOKS/SET_CATEGORIES': {
            return { ...state, categories: action.value }
        }
        case 'BOOKS/SET_START_INDEX': {
            return { ...state, startIndex: action.value }
        }
        default:
            return state;
    }
};
