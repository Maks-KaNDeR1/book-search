import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BookReducerType, requestBook } from '../../../store/book-reducer';
import { AppRootStateType } from '../../../store/store';
import styles from './DetailedBookInfo.module.scss'


export const DetailedBookInfo = () => {

    const books = useSelector<AppRootStateType, BookReducerType>(state => state.book)
    const b = books.book
    const dispatch = useDispatch<any>()

    const { volumeId } = useParams();
    // console.log(book);

    useEffect(() => {
        dispatch(requestBook(volumeId))
    }, [volumeId])


    return (
        <div className={styles.main}>
            <div className={styles.bookInfoBlock} >
                <div className={styles.imgBlock} >
                    <img src={b.volumeInfo?.imageLinks?.smallThumbnail} alt='' />
                </div>
                <div className={styles.descriptionBlock}>
                    <div className={styles.authors}>
                        {
                            b.volumeInfo.authors?.length > 0 ?
                                b.volumeInfo.authors.map(a => <div>{a}</div>)
                                :
                                <div>{b.volumeInfo?.authors}</div>
                        }
                    </div>
                    <h3> {b.volumeInfo?.title} </h3>
                    <span> {b.volumeInfo?.categories} </span>

                    <div className={styles.description}>{b.volumeInfo?.description}</div>
                </div>
            </div>
        </div >
    )
}
