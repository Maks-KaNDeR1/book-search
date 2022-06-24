
import { Dispatch } from "redux";
import { booksAPI, BookType } from "../api/api";
import { initializedSuccess } from "./app-reducer";

let initialState = {
    book: {} as BookType
}




export type BookReducerType = typeof initialState

export const bookReducer = (state: BookReducerType = initialState, action: BookActionsType): BookReducerType => {
    switch (action.type) {
        case 'BOOK/SET_BOOK': {
            // return {
            //     ...state,  action.book
            // }
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
    //dispatch(initializedSuccess(true))
    //  try {
    const res = await booksAPI.getVolumeBook(volumeId)
    dispatch(setBook(res.data));
    // }
    // finally {
    // dispatch(initializedSuccess(false))
    // }
}


export type BookActionsType = SetBookType 
