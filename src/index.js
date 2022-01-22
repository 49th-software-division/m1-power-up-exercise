import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BooksPresenter } from './books/BooksPresenter';
import { generateBook } from './books/generateBook';

const App = () => {
  const [vm, copyVmToComponentState] = useState([]);
  const booksPresenter = new BooksPresenter(); //> get books presenter object

  const load = async () => {
    const generatedVm = await booksPresenter.load(); //> load in the view model
    copyVmToComponentState(generatedVm); //> set view model to state
  };

  const addBook = async () => {
    const isPostSuccess = await booksPresenter.addBook(
      generateBook('The Silmarillion', 'J.R.R. Tolkien'),
    );
    if (isPostSuccess) {
      load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {vm.map((bookVm, i) => {
        return <div key={i}>{bookVm.visibleName}</div>;
      })}
      <button onClick={addBook}>Add Book</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
