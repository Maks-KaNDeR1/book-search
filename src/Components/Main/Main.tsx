import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BooksReducerType, requestBooks } from '../../store/books-reducer';
import { Select } from './Select/Select';
import styles from './Main.module.scss';
import { Search } from './Search/Search';


const sort = ['relevance', 'newest']
const categor = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']


type PropsType = {
    booksReducer: BooksReducerType
}

export const Main: React.FC<PropsType> = ({ booksReducer }) => {

    const dispatch = useDispatch<any>()

    let [value, setValue] = useState('')
    let [sorting, setSorting] = useState('relevance')
    let [categories, setCategories] = useState('all')


    const onClickSearchHandler = () => {
        dispatch(requestBooks(value, sorting))
    }

    const handleSelectSorting = (sortingValue: string) => {
        setSorting(sortingValue)
        dispatch(requestBooks(value, sorting))
    }

    const handleSelectCategories = (categoriesValue: string) => {
        setCategories(categoriesValue)
        dispatch(requestBooks(value, sorting))
    }

    // useEffect(() => {
    //     dispatch(requestBooks(value, sorting))


    // }, [sorting])

    const onKeyPressInputHandler = (code: string) => {
        if (code === 'Enter') {
            dispatch(requestBooks(value, sorting))
        }
    }

    let onChangeInputHandler = (inputValue: string) => {
        setValue(inputValue)
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
                        sort={sort}
                        categor={categor}
                        sorting={sorting}
                        categories={categories}
                        handleSelectSorting={handleSelectSorting}
                        handleSelectCategories={handleSelectCategories}
                    />
                </div>
            </div>
        )
    }
}
