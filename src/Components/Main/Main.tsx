import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BooksReducerType, loadMoreBooks, requestBooks, setCategories, setCategoriesBooks, setSearchValue, setSorting, setStartIndex } from '../../store/books-reducer';
import { Select } from './Select/Select';
import styles from './Main.module.scss';
import { Search } from './Search/Search';
import { Books } from './Books/Books';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailedBookInfo } from './Books/DetailedBookInfo/DetailedBookInfo';
import { BookType } from '../../api/api';




type PropsType = {
    booksReducer: BooksReducerType
}

export const Main: React.FC<PropsType> = ({ booksReducer }) => {

    const dispatch = useDispatch<any>()

    const b = booksReducer
    const value = b.searchValue
    const sorting = b.sorting
    const categories = b.categories
    const startIndex = b.startIndex


    let [sortedBooks, setSortedBooks] = useState([] as BookType[])

    if (categories === 'all') {
        setSortedBooks(b.books)
    } else {
        setSortedBooks(b.categoriesBooks)
    }


    let filtered = booksReducer.books.filter(b => {
        if (b.volumeInfo.categories) {
            return b.volumeInfo.categories[0] === categories
        } else return false
    }
    )

    useEffect(() => {
        setCategoriesBooks(filtered)
    }, [categories])


    do {
        const newIndex = 30 + startIndex
        dispatch(setStartIndex(newIndex))
        dispatch(loadMoreBooks(value, sorting, newIndex))
    } while (sortedBooks.length < 30)


    const onClickSearchHandler = () => {
        dispatch(setStartIndex(0))
        dispatch(requestBooks(value, sorting, startIndex))
    }
    const handleSelectSorting = (sortingValue: string) => {
        const newvalue = sortingValue
        dispatch(setSorting(newvalue))
        dispatch(requestBooks(newvalue, sorting, startIndex))
    }
    const handleSelectCategories = (categoriesValue: string) => {
        const newCategory = categoriesValue
        dispatch(setCategories(newCategory))
        dispatch(requestBooks(value, sorting, startIndex))
    }
    const onKeyPressInputHandler = (code: string) => {
        if (code === 'Enter') {
            dispatch(requestBooks(value, sorting, startIndex))
        }
    }
    const onChangeInputHandler = (inputValue: string) => {
        dispatch(setSearchValue(inputValue))
    }
    const onIndexChanged = (indexValue: number) => {
        const newIndex = indexValue + startIndex
        dispatch(setStartIndex(newIndex))
        dispatch(loadMoreBooks(value, sorting, newIndex))
    }

    if (!booksReducer.books?.length) {
        return <Search value={value}
            onClickSearchHandler={onClickSearchHandler}
            onChangeInputHandler={onChangeInputHandler}
            onKeyPressInputHandler={onKeyPressInputHandler}
        />

    } else {
        return (
            <div className={styles.main}>
                <Search value={value}
                    onClickSearchHandler={onClickSearchHandler}
                    onChangeInputHandler={onChangeInputHandler}
                    onKeyPressInputHandler={onKeyPressInputHandler} />
                <div>
                    <Select sorting={sorting}
                        categories={categories}
                        handleSelectSorting={handleSelectSorting}
                        handleSelectCategories={handleSelectCategories}
                    />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to={"/books"} />} />
                    <Route path="/books" element={
                        <Books sortedBooks={sortedBooks} onIndexChanged={onIndexChanged} categories={categories} />
                    } />
                    <Route path="/volume/*" element={<DetailedBookInfo />} />
                    <Route path="/volume/:volumeId" element={<DetailedBookInfo />} />
                </Routes>
            </div>
        )
    }
}
