import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BooksPresenter } from './books/BooksPresenter';
import { booksRepository } from './books/BooksRepository';
import { generateBook } from './books/generateBook';

const App = () => {
  const [vm, copyVmToComponentState] = useState([]);
  const [apiChange, setApiChange] = useState(false);

  const addBook = async (payload) => {
    const isPostSuccess = await booksRepository.addBook(payload);
    if (isPostSuccess) {
      setApiChange(() => !apiChange);
    }
  };

  useEffect(() => {
    const load = async () => {
      const booksPresenter = new BooksPresenter(); //> get books presenter object
      const generatedVm = await booksPresenter.load(); //> load in the view model
      copyVmToComponentState(generatedVm); //> set view model to state
    };
    load();
  }, [apiChange]);

  return (
    <div>
      {vm.map((bookVm, i) => {
        return <div key={i}>{bookVm.visibleName}</div>;
      })}
      <button
        onClick={() =>
          addBook(generateBook('The Silmarillion', 'J.R.R. Tolkien'))
        }
      >
        Add Book
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
