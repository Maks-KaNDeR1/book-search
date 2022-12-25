import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BookType } from '../../../api/types'
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
                                {
                                    !b.volumeInfo.imageLinks ? <img src='https://thumbs.dreamstime.com/b/%D0%B4%D0%B5%D0%BA%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B8-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%B0-%D1%80%D0%B0%D0%BC%D0%BA%D0%B8-%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D1%8B-124413469.jpg' alt='' />
                                        : <img src={b.volumeInfo.imageLinks?.smallThumbnail} alt='' />
                                }
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
                        )}
                        ADD BOOKS
                    </button>
                </div>
            </div>
        </div>
    )
}
