import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Books } from './Components/Books/Books';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './Components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { BooksReducerType, requestBooks } from './store/books-reducer';
import { Preloader } from './Components/common/Preloader/Preloader';
import { DetailedBookInfo } from './Components/Books/DetailedBookInfo/DetailedBookInfo';


function App() {

  const booksReducer = useSelector<AppRootStateType, BooksReducerType>(state => state.books)
  const initialized = useSelector<AppRootStateType>(state => state.app.initialized)


  const dispatch = useDispatch<any>()


  if (!booksReducer.books) {
    return <div style={item} >
      <Main booksReducer={booksReducer} />
      <span style={titleStyle}> Nothing was found </span>
    </div>
  }

  if (booksReducer.books.length === 0) {
    return <div style={item} >
      <Main booksReducer={booksReducer} />
    </div>
  }

  if (initialized) {
    return <div
      style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
      <Preloader />
    </div>
  }

  return (
    <div className={styles.App}>
      <Main booksReducer={booksReducer} />
      <Routes>
        <Route path="/" element={<Navigate to={"/books"} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/*" element={<DetailedBookInfo />} />
        <Route path="/book/:volumeId" element={<DetailedBookInfo />} />
      </Routes>
    </div>
  );
}




let item: React.CSSProperties = {
  marginTop: '200px',
  textAlign: 'center'
}

let titleStyle: React.CSSProperties = {
  color: 'rgb(230, 86, 86)',
  fontSize: '25px'
}

export default App;

