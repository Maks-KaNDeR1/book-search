import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const booksReducer = useSelector<AppRootStateType, BooksReducerType>(state => state.books)

  const dispatch = useDispatch<any>()

  let [value, setValue] = useState('')
  let [sorting, setSorting] = useState(sort[1])

  useEffect(() => {
      dispatch(requestBooks(value, sorting))
  }, [dispatch, sorting])


  if (!booksReducer.books) {
    return <div style={item} >
      <Main />
      <span style={titleStyle}  > Nothing was found </span>
    </div>
  }

  if (booksReducer.books.length === 0) {
    return <div style={item} >
      <Main />
    </div>
  }





  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
