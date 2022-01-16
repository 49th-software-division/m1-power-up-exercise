import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BooksPresenter } from './books/BooksPresenter';
import { booksRepository } from './books/BooksRepository';

const hardcodedBook = { name: 'The Silmarillion', author: 'J.R.R. Tolkien' };

const App = () => {
  const [vm, copyVmToComponentState] = useState([]);
  const [apiChange, setApiChange] = useState(false);

  const addBook = async (payload) => {
    const postSuccess = await booksRepository.addBook(payload);
    if (postSuccess) {
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
      <button onClick={() => addBook(hardcodedBook)}>Add Book</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
