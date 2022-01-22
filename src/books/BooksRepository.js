import { HttpGateway } from '../shared/HttpGateway';
import { apiPath } from '../shared/apiPath';
const path = apiPath('ajones@ximasoftware.com');

// the repository is purposely a singleton, usually
class BooksRepository {
  constructor() {
    this.httpGateway = new HttpGateway();
    this.booksPm = [];
  }

  getBooks = async () => {
    const booksDto = await this.httpGateway.get(path); //> get the books from the api/database
    this.booksPm = booksDto.result.map((bookDto) => {
      return { name: bookDto.name };
    }); //> define the programmers model
    return this.booksPm; //> return pm to presenter
  };

  addBook = async (payload) => {
    const newBookDto = await this.httpGateway.post(path, payload); //> ping the api with the new book
    if (newBookDto.success) {
      this.booksPm.push({ name: payload.name }); //> if the addition was successful, edit "state"
    }
    return newBookDto.success; //> return the success to the component so the component can fetch all the books
  };
}

const booksRepository = new BooksRepository();
export { booksRepository };
