import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BooksReducerType } from '../../../store/books-reducer'
import { AppRootStateType } from '../../../store/store'
import { Preloader } from '../../common/Preloader/Preloader'
import styles from './Books.module.scss'

type PropsType = {
    value: string
    sorting: string
    categories: string
    startIndex: number
    onIndexChanged: (value: number) => void

}

export const Books: React.FC<PropsType> = (
    { value, sorting, categories, startIndex, onIndexChanged }) => {

    const booksReducer = useSelector<AppRootStateType, BooksReducerType>(state => state.books)
    const initialized = useSelector<AppRootStateType>(state => state.app.initialized)

    const onClickHandler = () => {
        onIndexChanged(30)
    }

    if (!booksReducer.books?.length) {
        return <div>Nothing was found</div>
    }

    console.log(booksReducer.books);


    if (initialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <Preloader />
        </div>
    }

    return (
        <div className={styles.main}>
            <div>
                <h3>Found {booksReducer.totalItemsCount} results</h3>
                <div className={styles.booksBlock}  >
                    {
                        booksReducer.books.map((b, id) => <div key={id} className={styles.bookItem}  >
                            <Link to={`/volume/${b.id}`}>
                                <img src={b.volumeInfo.imageLinks?.smallThumbnail} alt=''
                                />
                            </Link>
                            {
                                b.volumeInfo.categories ? <span>{b.volumeInfo.categories}</span>
                                    : <span style={{ color: 'rgb(241 241 241)', borderBottom: 'none' }}> 1</span>
                            }
                            <div className={styles.title}> {b.volumeInfo.title} </div>
                            <div className={styles.authors}>
                                {
                                    b.volumeInfo.authors?.length > 0 ?
                                        b.volumeInfo.authors.map(a => <div key={b.etag} >{a}</div>)
                                        :
                                        <div>{b.volumeInfo?.authors}</div>
                                }
                            </div>
                        </div>
                        )
                    }
                </div>
                <div className={styles.buttonItem}>
                    <button onClick={onClickHandler}>ADD BOOKS</button>
                </div>
            </div>
        </div>
    )
}