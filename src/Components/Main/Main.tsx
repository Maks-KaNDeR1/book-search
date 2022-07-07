import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    setBooks,
    BooksReducerType,
    requestBooks,
    loadMoreBooks,
    loadMoreCategoriesBooks,
    setCategories,
    setSearchValue,
    setSorting,
    setStartIndex
} from '../../store/books-reducer';
import { Select } from './Select/Select';
import styles from './Main.module.scss';
import { Search } from './Search/Search';
import { Books } from './Books/Books';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailedBookInfo } from './Books/DetailedBookInfo/DetailedBookInfo';


type PropsType = {
    booksReducer: BooksReducerType
}

export const Main: React.FC<PropsType> = ({ booksReducer }) => {
    const { books, searchValue, sorting, categories, startIndex } = booksReducer

    let [booksLength, setBooksLength] = useState(1)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        // if (books?.length === 0) return
        // else {
        if (books?.length < booksLength * 30) {
            const newIndex = startIndex + 30
            dispatch(setStartIndex(newIndex))
            dispatch(loadMoreCategoriesBooks(searchValue, sorting, newIndex))
        } if (books?.length > booksLength * 30) {
            let residue = books.length - booksLength * 30
            let crop = books.slice(residue)
            dispatch(setBooks(crop))
        }
    }, [books, sorting])


    const onChangeInputHandler = (inputValue: string) => {
        dispatch(setSearchValue(inputValue))
    }
    const searchHandler = () => {
        const newIndex = 0
        dispatch(setCategories('all'))
        dispatch(setStartIndex(newIndex))
        dispatch(requestBooks(searchValue, sorting, newIndex))
    }
    const onClickSearchHandler = () => {
        searchHandler()
    }
    const onKeyPressInputHandler = (code: string) => {
        if (code === 'Enter') searchHandler()
    }

    const handleSelectSorting = (sortingValue: string) => {
        const newValue = sortingValue
        dispatch(setSorting(newValue))
        dispatch(requestBooks(searchValue, newValue, startIndex))
    }

    const handleSelectCategories = (categoriesValue: string) => {
        const newCategory = categoriesValue
        dispatch(setCategories(newCategory))

        if (newCategory === 'all') {
            const newIndex = 0
            dispatch(setStartIndex(newIndex))
            dispatch(requestBooks(searchValue, sorting, newIndex))
        } else {
            // dispatch(setBooks([] as BookType[]))
            let clickedOnSelect = true
            dispatch(loadMoreCategoriesBooks(searchValue, sorting, startIndex, clickedOnSelect))
        }
    }

    const loadMoreBooksOnClick = (indexValue: number) => {
        setBooksLength(prevState => prevState + 1)
        const newIndex = indexValue + startIndex
        dispatch(setStartIndex(newIndex))
        dispatch(loadMoreBooks(searchValue, sorting, newIndex))
    }

    if (!booksReducer.books) {
        return <div style={item} >
            <Search value={searchValue}
                onClickSearchHandler={onClickSearchHandler}
                onChangeInputHandler={onChangeInputHandler}
                onKeyPressInputHandler={onKeyPressInputHandler}
            />
            <span style={titleStyle}> Nothing was found </span>
        </div>
    }
    if (booksReducer.books?.length === 0) {
        return <div>
            <Search value={searchValue}
                onClickSearchHandler={onClickSearchHandler}
                onChangeInputHandler={onChangeInputHandler}
                onKeyPressInputHandler={onKeyPressInputHandler}
            />
        </div>
    } else {
        return (
            <div className={styles.main}>
                <Search value={searchValue}
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
                        <Books
                            booksReducer={booksReducer}
                            loadMoreBooksOnClick={loadMoreBooksOnClick}
                            categories={categories}
                        />
                    } />
                    <Route path="/volume/*" element={<DetailedBookInfo />} />
                    <Route path="/volume/:volumeId" element={<DetailedBookInfo />} />
                </Routes>
            </div>
        )
    }
}









let item: React.CSSProperties = {
    marginTop: '200px',
    textAlign: 'center'
}

let titleStyle: React.CSSProperties = {
    color: 'rgb(230, 86, 86)',
    fontSize: '25px'
}
