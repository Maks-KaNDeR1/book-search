import thunk, { ThunkAction } from 'redux-thunk';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { BooksActionsType, booksReducer } from './books-reducer'
import { BookActionsType, bookReducer } from './book-reducer';
import appReducer, { AppActionsType } from './app-reducer';

export const rootReducer = combineReducers({
    books: booksReducer,
    book: bookReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllActionsType = BooksActionsType | BookActionsType | AppActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>



// @ts-ignore
window.store = store
