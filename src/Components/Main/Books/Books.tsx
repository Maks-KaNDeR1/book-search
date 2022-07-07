import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BookType } from '../../../api/api'
import { BooksReducerType } from '../../../store/books-reducer'
import { AppRootStateType } from '../../../store/store'
import styles from './Books.module.scss'

type PropsType = {
    booksReducer: BooksReducerType
    sortedBooks?: BookType[]
    loadMoreBooksOnClick: (indexValue: number) => void
    categories: string
}

export const Books: React.FC<PropsType> = ({ booksReducer, sortedBooks, loadMoreBooksOnClick }) => {

    const loading = useSelector<AppRootStateType, boolean>(state => state.app.statusLoading)
    const { books } = booksReducer

    const onClickHandler = () => {
        loadMoreBooksOnClick(30)
    }

    if (!books?.length) {
        return <div>Nothing was found</div>
    }

    console.log(books);

    let totalItemsCount = () => {
        if (books.length < 30) {
            return books.length
        } else {
            return booksReducer.totalItemsCount
        }
    }

    return (
        <div className={styles.main}>
            <div>
                <h3>Found {totalItemsCount()}  results</h3>
                <div className={styles.booksBlock}  >
                    {
                        books.map((b, i) => <div key={b.etag + i} className={styles.bookItem}  >
                            <Link to={`/volume/${b.id}`}>
                                <img src={b.volumeInfo.imageLinks?.smallThumbnail} alt=''
                                />
                            </Link>
                            <div >
                                {
                                    b.volumeInfo.categories
                                        ? <span className={styles.categories} >{b.volumeInfo.categories} </span>
                                        : <span className={styles.noCategories}> 25/17</span>
                                }
                            </div>
                            <div className={styles.title}> {b.volumeInfo.title} </div>
                            <div className={styles.authors}>
                                {
                                    b.volumeInfo.authors?.length > 0
                                        ? b.volumeInfo.authors.map((a, i) => <div key={b.etag + i}> {a} </div>)
                                        : <div>{b.volumeInfo?.authors}</div>
                                }
                            </div>
                        </div>
                        )
                    }
                </div>
                <div className={styles.buttonItem}>
                    <button onClick={onClickHandler}>
                        {loading && (
                            <i
                                className="fa fa-refresh fa-spin"
                                style={{ margin: "0 10px 0 0", fontSize: "18px" }}
                            />
                        )} ADD BOOKS</button>
                </div>
            </div>
        </div>
    )
}
