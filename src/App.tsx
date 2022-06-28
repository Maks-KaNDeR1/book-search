import React from 'react';
import styles from './App.module.scss';
import { Main } from './Components/Main/Main';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { BooksReducerType } from './store/books-reducer';


function App() {

  const booksReducer = useSelector<AppRootStateType, BooksReducerType>(state => state.books)

  if (booksReducer.books?.length === 0) {
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


export default App;

