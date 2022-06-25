import { Dispatch } from "redux";
import { booksAPI, BookType } from "../api/api";

let initialState = {
    book: {} as BookType
}

export type BookReducerType = typeof initialState

export const bookReducer = (state: BookReducerType = initialState, action: BookActionsType): BookReducerType => {
    switch (action.type) {
        case 'BOOK/SET_BOOK': {
            return { ...state, book: action.book }
        }
        default:
            return state;
    }
};


type SetBookType = ReturnType<typeof setBook>
export const setBook = (book: BookType) =>
    ({ type: 'BOOK/SET_BOOK', book } as const)


export const requestBook = (volumeId: string | undefined) => async (dispatch: Dispatch) => {
    const res = await booksAPI.getVolumeBook(volumeId)
    dispatch(setBook(res.data));
}


export type BookActionsType = SetBookType 
