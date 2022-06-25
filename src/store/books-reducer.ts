import { Dispatch } from "redux";
import { booksAPI, BookType } from "../api/api";
import { errorCode, errorMessage, initializedSuccess } from "./app-reducer";

let initialState = {
    books: [] as BookType[],
    totalItemsCount: 0,
};


export type BooksReducerType = typeof initialState

export const booksReducer = (state: BooksReducerType = initialState, action: BooksActionsType): BooksReducerType => {
    switch (action.type) {
        case 'BOOKS/SET_BOOKS': {
            return { ...state, books: action.books }
        }
        case 'BOOKS/ADD_BOOKS': {
            return { ...state, books: [...state.books, ...action.books] }
        }
        case 'BOOKS/SET_TOTAL_ITEMS_COUNT': {
            return { ...state, totalItemsCount: action.totalItemsCount }
        }
        default:
            return state;
    }
};


type SetBooksType = ReturnType<typeof setBooks>
export const setBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/SET_BOOKS', books } as const)


type AddBooksType = ReturnType<typeof addBooks>
export const addBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/ADD_BOOKS', books } as const)


type SetItemsTotalCountType = ReturnType<typeof setItemsTotalCount>
export const setItemsTotalCount = (totalItemsCount: number) =>
    ({ type: 'BOOKS/SET_TOTAL_ITEMS_COUNT', totalItemsCount } as const)


export const requestBooks =
    (value?: string, sorting?: string, startIndex?: number) => async (dispatch: Dispatch) => {
        dispatch(initializedSuccess(true))
        console.log(startIndex);
        try {
            const res = await booksAPI.getVolumeBooks(value, sorting, startIndex)
            dispatch(setBooks(res.data.items));
            dispatch(setItemsTotalCount(res.data.totalItems));
        }
        catch (err: any) {
            dispatch(errorMessage(err.response.data.error.message))
            dispatch(errorCode(err.response.data.error.code))
        }
        finally {
            dispatch(initializedSuccess(false))
        }
    }

export const requestAddBooks =
    (value?: string, sorting?: string, startIndex?: number) => async (dispatch: Dispatch) => {
        dispatch(initializedSuccess(true))
        try {
            const res = await booksAPI.getVolumeBooks(value, sorting, startIndex)
            dispatch(setItemsTotalCount(res.data.totalItems));
            dispatch(addBooks(res.data.items));
        }
        finally {
            dispatch(initializedSuccess(false))
        }
    }




export type BooksActionsType =
    | SetBooksType
    | SetItemsTotalCountType
    | AddBooksType
    | AddBooksType
