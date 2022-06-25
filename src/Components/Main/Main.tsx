import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BooksReducerType, requestAddBooks, requestBooks } from '../../store/books-reducer';
import { Select } from './Select/Select';
import styles from './Main.module.scss';
import { Search } from './Search/Search';
import { Books } from './Books/Books';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailedBookInfo } from './Books/DetailedBookInfo/DetailedBookInfo';


const sort = ['relevance', 'newest']
const categor = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']


type PropsType = {
    booksReducer: BooksReducerType
}

export const Main: React.FC<PropsType> = ({ booksReducer }) => {

    const dispatch = useDispatch<any>()

    const [value, setValue] = useState('')
    const [sorting, setSorting] = useState<string>(sort[0])
    const [categories, setCategories] = useState(categor[0])
    const [startIndex, setStartIndex] = useState(0)

    useEffect(() => {
        const value = sessionStorage.getItem('value')
        const sortValue = sessionStorage.getItem('sorting')
        const catValue = sessionStorage.getItem('categories')
        const startValue = sessionStorage.getItem('startIndex')

        value ? setValue(JSON.parse(value)) : setValue('')
        sortValue ? setSorting(JSON.parse(sortValue)) : setSorting('relevance')
        catValue ? setCategories(JSON.parse(catValue)) : setCategories('all')
        startValue ? setStartIndex(JSON.parse(startValue)) : setStartIndex(0)
    }, []);

    useEffect(() => {
        sessionStorage.setItem('value', JSON.stringify(value));
        sessionStorage.setItem('sorting', JSON.stringify(sorting));
        sessionStorage.setItem('categories', JSON.stringify(categories));
        sessionStorage.setItem('startIndex', JSON.stringify(startIndex));
    }, [value, sorting, categories, startIndex]);


    const onClickSearchHandler = () => {
        setStartIndex(0)
        dispatch(requestBooks(value, sorting, startIndex))
    }

    const handleSelectSorting = (sortingValue: string) => {
        setSorting(sortingValue)
        dispatch(requestBooks(value, sorting, startIndex))
    }

    const handleSelectCategories = (categoriesValue: string) => {
        setCategories(categoriesValue)
        // dispatch(requestBooks(value, sorting, startIndex))
    }

    const onKeyPressInputHandler = (code: string) => {
        if (code === 'Enter') {
            dispatch(requestBooks(value, sorting, startIndex))
        }
    }

    const onChangeInputHandler = (inputValue: string) => {
        setValue(inputValue)
    }

    const onIndexChanged = (indexValue: number) => {
        setStartIndex(startIndex + indexValue)
        dispatch(requestAddBooks(value, sorting, startIndex))
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
                    <Select
                        sorting={sorting}
                        categories={categories}
                        sort={sort}
                        categor={categor}
                        handleSelectSorting={handleSelectSorting}
                        handleSelectCategories={handleSelectCategories}
                    />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to={"/books"} />} />
                    <Route path="/books" element={
                        <Books
                            value={value}
                            sorting={sorting}
                            categories={categories}
                            startIndex={startIndex}
                            onIndexChanged={onIndexChanged}
                        />} />
                    <Route path="/volume/*" element={<DetailedBookInfo />} />
                    <Route path="/volume/:volumeId" element={<DetailedBookInfo />} />
                </Routes>
            </div>
        )
    }
}
