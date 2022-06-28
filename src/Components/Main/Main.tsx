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
import { BookType } from '../../api/api';


type PropsType = {
    booksReducer: BooksReducerType
}

export const Main: React.FC<PropsType> = ({ booksReducer }) => {

    let [booksLength, setBooksLength] = useState(1)
    const dispatch = useDispatch<any>()

    const b = booksReducer
    const value = b.searchValue
    const sorting = b.sorting
    const categories = b.categories
    const startIndex = b.startIndex
    const books = b.books

    useEffect(() => {
        if (books?.length === 0) return
        else {
            if (books?.length < booksLength * 30) {
                const newIndex = startIndex + 30
                dispatch(setStartIndex(newIndex))
                dispatch(loadMoreCategoriesBooks(value, sorting, newIndex))
            }
        }
    }, [books, sorting])

    const onClickSearchHandler = () => {
        const newIndex = 0
        dispatch(setCategories('all'))
        dispatch(setStartIndex(newIndex))
        dispatch(requestBooks(value, sorting, newIndex))
    }
    const handleSelectSorting = (sortingValue: string) => {
        const newvalue = sortingValue
        dispatch(setSorting(newvalue))
        dispatch(requestBooks(newvalue, sorting, startIndex))
    }
    const handleSelectCategories = (categoriesValue: string) => {
        const newCategory = categoriesValue
        dispatch(setCategories(newCategory))

        if (newCategory === 'all') {
            const newIndex = 0
            dispatch(setStartIndex(newIndex))
            dispatch(requestBooks(value, sorting, newIndex))
        } else {
            dispatch(setBooks([] as BookType[]))
            dispatch(loadMoreCategoriesBooks(value, sorting, startIndex))
        }
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
        setBooksLength(booksLength += 1)
        console.log(booksLength);
        const newIndex = indexValue + startIndex
        dispatch(setStartIndex(newIndex))
        dispatch(loadMoreBooks(value, sorting, newIndex))

    }



    if (!booksReducer.books) {
        return <div style={item} >
            <Search value={value}
                onClickSearchHandler={onClickSearchHandler}
                onChangeInputHandler={onChangeInputHandler}
                onKeyPressInputHandler={onKeyPressInputHandler}
            />
            <span style={titleStyle}> Nothing was found </span>
        </div>
    }
    if (booksReducer.books?.length === 0) {
        return <div>
            <Search value={value}
                onClickSearchHandler={onClickSearchHandler}
                onChangeInputHandler={onChangeInputHandler}
                onKeyPressInputHandler={onKeyPressInputHandler}
            />
        </div>
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
                        <Books booksReducer={booksReducer} onIndexChanged={onIndexChanged} categories={categories} />
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
