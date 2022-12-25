import { BookType } from "../api/types";


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





