import { AppRootStateType } from './store';
import { Dispatch } from "redux";
import { booksAPI, BookType } from "../api/api";
import { errorCode, errorMessage, setStatus } from "./app-reducer";

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

export const setBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/SET_BOOKS', books } as const)

export const addBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/ADD_BOOKS', books } as const)

export const setItemsTotalCount = (totalItemsCount: number) =>
    ({ type: 'BOOKS/SET_TOTAL_ITEMS_COUNT', totalItemsCount } as const)

export const setSearchValue = (value: string) =>
    ({ type: 'BOOKS/SET_SEARCH_VALUE', value } as const)

export const setSorting = (value: string) =>
    ({ type: 'BOOKS/SET_SORTING', value } as const)

export const setCategories = (value: string) =>
    ({ type: 'BOOKS/SET_CATEGORIES', value } as const)

export const setStartIndex = (value: number) =>
    ({ type: 'BOOKS/SET_START_INDEX', value } as const)


export const setCategoriesBooks = (books: BookType[]) =>
    ({ type: 'BOOKS/SET_CATEGORIES_BOOKS', books } as const)




const getBooksAPI = async (
    dispatch: Dispatch,
    actionCreator: Function,
    value?: string,
    sorting?: string,
    startIndex?: number
) => {

    dispatch(setStatus(true))
    try {
        const res = await booksAPI.getVolumeBooks(value, sorting, startIndex)
        dispatch(actionCreator(res.data.items));
        dispatch(setItemsTotalCount(res.data.totalItems));
    }
    catch (err: any) {
        dispatch(errorMessage(err.response.data.error.message))
        dispatch(errorCode(err.response.data.error.code))
    }
    finally {
        dispatch(setStatus(false))
    }
}

export const requestBooks =
    (value?: string, sorting?: string, startIndex?: number) => async (dispatch: Dispatch) => {
        getBooksAPI(dispatch, setBooks, value, sorting, startIndex)
    }

export const loadMoreBooks =
    (value?: string, sorting?: string, startIndex?: number) => async (dispatch: Dispatch) => {
        getBooksAPI(dispatch, addBooks, value, sorting, startIndex)
    }


export const loadMoreCategoriesBooks = (value?: string, sorting?: string, startIndex?: number, clickedOnSelect?: boolean) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const b = getState().books

        dispatch(setStatus(true))
        try {
            const res = await booksAPI.getVolumeBooks(value, sorting, startIndex)

            setFilteredBooks(dispatch, res.data.items, b.categories, clickedOnSelect)
        }
        finally {
            dispatch(setStatus(false))
        }
    }

const setFilteredBooks = (
    dispatch: Dispatch,
    items: BookType[],
    categories: string,
    clickedOnSelect?: boolean
) => {

    const filtered = items.filter(b => {
        if (b.volumeInfo.categories) {
            return b.volumeInfo.categories[0] === categories
        } else return false
    })

    if (clickedOnSelect) {
        dispatch(setBooks([] as BookType[]))
    }
    dispatch(setCategoriesBooks(filtered));
}


type SetBooksType = ReturnType<typeof setBooks>
type AddBooksType = ReturnType<typeof addBooks>
type SetItemsTotalCountType = ReturnType<typeof setItemsTotalCount>
type SetSearchValueType = ReturnType<typeof setSearchValue>
type SetSortingType = ReturnType<typeof setSorting>
type SetCategoriesType = ReturnType<typeof setCategories>
type SetStartIndexType = ReturnType<typeof setStartIndex>
type SetCategoriesBooksype = ReturnType<typeof setCategoriesBooks>

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





