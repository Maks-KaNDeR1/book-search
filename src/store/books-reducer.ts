import { AppRootStateType } from './store';
import { Dispatch } from "redux";
import { booksAPI, BookType } from "../api/api";
import { errorCode, errorMessage, initializedSuccess } from "./app-reducer";

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
        case 'BOOKS/SET_SORTING': {
            return { ...state, sorting: action.value }
        }
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

type SetBooksType = ReturnType<typeof setBooks>
export const setBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/SET_BOOKS', books } as const)

type AddBooksType = ReturnType<typeof addBooks>
export const addBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/ADD_BOOKS', books } as const)

type SetItemsTotalCountType = ReturnType<typeof setItemsTotalCount>
export const setItemsTotalCount = (totalItemsCount: number) =>
    ({ type: 'BOOKS/SET_TOTAL_ITEMS_COUNT', totalItemsCount } as const)


type SetSearchValueType = ReturnType<typeof setSearchValue>
export const setSearchValue = (value: string) =>
    ({ type: 'BOOKS/SET_SEARCH_VALUE', value } as const)

type SetSortingType = ReturnType<typeof setSorting>
export const setSorting = (value: string) =>
    ({ type: 'BOOKS/SET_SORTING', value } as const)

type SetCategoriesType = ReturnType<typeof setCategories>
export const setCategories = (value: string) =>
    ({ type: 'BOOKS/SET_CATEGORIES', value } as const)

type SetStartIndexType = ReturnType<typeof setStartIndex>
export const setStartIndex = (value: number) =>
    ({ type: 'BOOKS/SET_START_INDEX', value } as const)


type SetCategoriesBooksype = ReturnType<typeof setCategoriesBooks>
export const setCategoriesBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/SET_CATEGORIES_BOOKS', books } as const)




export const requestBooks =
    (value?: string, sorting?: string, startIndex?: number) => async (dispatch: Dispatch) => {
        dispatch(initializedSuccess(true))
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

export const loadMoreBooks =
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

export const loadMoreCategoriesBooks =
    (value?: string, sorting?: string, startIndex?: number) =>
        async (dispatch: Dispatch, getState: () => AppRootStateType) => {

            const booksReducer = getState().books

            dispatch(initializedSuccess(true))
            try {
                const res = await booksAPI.getVolumeBooks(value, sorting, startIndex)
                dispatch(setItemsTotalCount(res.data.totalItems));

                const filtered = res.data.items.filter(b => {
                    if (b.volumeInfo.categories) {
                        return b.volumeInfo.categories[0] === booksReducer.categories
                    } else return false
                })

                if (booksReducer.books.length !== 0) {
                    let residue = booksReducer.books.length - filtered.length
                    filtered.splice(residue, filtered.length)
                }
                dispatch(setCategoriesBooks(filtered));
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
    | SetSearchValueType
    | SetSortingType
    | SetCategoriesType
    | SetStartIndexType
    | SetCategoriesBooksype