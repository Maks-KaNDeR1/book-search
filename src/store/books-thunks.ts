import { AppRootStateType } from './store';
import { Dispatch } from "redux";
import { booksAPI } from "../api/api";
import { errorCode, errorMessage, setStatus } from "./app-reducer";
import { addBooks, setBooks, setCategoriesBooks, setItemsTotalCount } from './books-actions';
import { BookType } from '../api/types';


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




