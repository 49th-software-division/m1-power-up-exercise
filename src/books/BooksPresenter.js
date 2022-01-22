import { booksRepository } from './BooksRepository';

export class BooksPresenter {
  load = async () => {
    const booksPm = await booksRepository.getBooks(); //> get necessary repository(ies)
    const booksVm = booksPm.map((bookPm) => {
      return { visibleName: bookPm.name };
    }); //> define the view model including only the things needed for display
    return booksVm; // return vm to component
  };

  addBook = async (payload) => {
    const isPostSuccess = await booksRepository.addBook(payload);
    return isPostSuccess;
  };
}
