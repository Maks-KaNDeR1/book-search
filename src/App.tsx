import React from 'react';
import styles from './App.module.scss';
import { Main } from './Components/Main/Main';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { BooksReducerType } from './store/books-reducer';
import { LinearProgress } from '@mui/material';


function App() {

  const booksReducer = useSelector<AppRootStateType, BooksReducerType>(state => state.books)
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.statusLoading)


  if (booksReducer.books?.length === 0 && booksReducer.categories === 'all') {
    return <div style={item} >
      {loading && <LinearProgress sx={linearStyle}
        color='primary' />}
      <Main booksReducer={booksReducer} />
    </div>
  }

  return (
    <div className={styles.App}>
      {loading && <LinearProgress sx={linearStyle}
        color='primary' />}
      <Main booksReducer={booksReducer} />
    </div>
  );
}


let item: React.CSSProperties = {
  marginTop: '200px',
  textAlign: 'center'
}

let linearStyle: React.CSSProperties = {
  position: 'absolute',
  top: '1vh',
  width: '99%',
  height: '5px'
}


export default App;

