import React, { MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import { requestBook } from '../../store/book-reducer'
import { addBooks, BooksReducerType, requestBooks } from '../../store/books-reducer'
import { AppRootStateType } from '../../store/store'
import { Preloader } from '../common/Preloader/Preloader'
import styles from './Books.module.scss'



export const Books = () => {

    const booksReducer = useSelector<AppRootStateType, BooksReducerType>(state => state.books)
    const initialized = useSelector<AppRootStateType>(state => state.app.initialized)

    const dispatch = useDispatch<any>()

    let onPageChanged = (page: number) => {
        // dispatch(requestBooks(page))
    }

    if (!booksReducer.books?.length) {
        return <div>Nothing was found</div>
    }

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
                        booksReducer.books.map(b => <div className={styles.bookItem} key={b.id} >
                            <Link to={`/book/${b.id}`}>
                                <img src={b.volumeInfo.imageLinks?.smallThumbnail} alt=''
                                />
                            </Link>
                            {
                                b.volumeInfo.categories ? <span>{b.volumeInfo.categories}</span>
                                    : <span style={{ color: 'rgb(241 241 241)', borderBottom: 'none' }}> 1</span>
                            }
                            <div className={styles.title} > {b.volumeInfo.title} </div>
                            <div className={styles.authors}>
                                {
                                    b.volumeInfo.authors?.length > 0 ?
                                        b.volumeInfo.authors.map(a => <div>{a}</div>)
                                        :
                                        <div>{b.volumeInfo?.authors}</div>
                                }
                            </div>
                        </div>
                        )
                    }
                </div>
                <div className={styles.buttonItem}>
                    <button onClick={() => onPageChanged(5)} >ADD BOOKS</button>
                </div>
            </div>
        </div>
    )
}
