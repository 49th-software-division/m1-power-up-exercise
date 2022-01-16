const generateOptions = (method, payload) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

export class HttpGateway {
  get = async (path) => {
    const response = await fetch(path); //> get response from api
    const booksDto = response.json(); //> turn response into json
    return booksDto; //> return dto to repository
  };

  post = async (path, payload) => {
    const options = generateOptions('POST', payload);
    const response = await fetch(path, options);
    const bookPostDto = response.json();
    return bookPostDto;
  };
}
