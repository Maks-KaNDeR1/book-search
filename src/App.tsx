import React from 'react';
import styles from './App.module.scss';
import { Main } from './Components/Main/Main';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { BooksReducerType } from './store/books-reducer';
import { ErrorSnackbar } from './Components/ErrorSnackbar/ErrorSnackbar';


function App() {

  const booksReducer = useSelector<AppRootStateType, BooksReducerType>(state => state.books)

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

  return (
    <div className={styles.App}>
      <Main booksReducer={booksReducer} />
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

