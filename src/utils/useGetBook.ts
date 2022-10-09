import {book_type, books} from './books';

const useGetBook = (book_id: number): book_type | false => {
  return books.find((book) => book.book_id === book_id) ?? false;
};
