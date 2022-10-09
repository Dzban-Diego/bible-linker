import './App.css';
import {useEffect, useState} from 'react';
import {book_type, books} from './utils/books';
import {useGetChapter} from './utils/useGetChapter';

export const App = () => {
  const [book, setBook] = useState<book_type>();
  const [chapter_index, setChapterIndex] = useState<number>();
  const {chapter, updateChapter} = useGetChapter();

  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const clear = () => {
    setBook(undefined);
    setChapterIndex(undefined);
  };

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const handleBookPress = (book: book_type) => {
    setBook(book);
  };

  const handleChapterPress = (chapter: number) => {
    setChapterIndex(chapter);
    if (updateChapter && book) {
      updateChapter(book.book_id, chapter);
    }
  };

  const handleVersePress = (verse: number) => {
    console.log('verseclick');
    if (chapter) {
      console.log(chapter[verse - 1]);
    }
    // TODO
  };

  type list_type = 'chapters' | 'verses';
  const renderList = (
    count: number,
    type: list_type,
    callback: (index: number) => void,
  ) => {
    let arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(
        <button
          className={`cell ${type}`}
          key={`${type}-${i}`}
          onClick={() => callback(i)}>
          {i}
        </button>,
      );
    }

    return arr;
  };

  return (
    <div className="App">
      <header>
        <span className={'book'}>
          {book ? `${book.book_name} ${chapter_index ?? ''}` : 'Biblia'}
        </span>
        <div>
          {/*<input*/}
          {/*  type="text"*/}
          {/*  className={'text-black'}*/}
          {/*  id="one"*/}
          {/*  value={bookString}*/}
          {/*  onChange={(e) => setBookString(e.target.value)}*/}
          {/*  onKeyDown={(event) => {*/}
          {/*    if (event.keyCode === 13) setBookInput();*/}
          {/*  }}*/}
          {/*  ref={input}*/}
          {/*/>*/}
          <button
            className="btn btn-primary rounded-none"
            onClick={(_) => clear()}>
            Lista
          </button>
        </div>
      </header>
      <div className={'grid'}>
        {/* Lista ksiąg */}
        {!book && (
          <>
            {books
              .filter((book, index) => {
                return index < 39;
              })
              .map((book, index) => {
                return (
                  <button
                    className={'cell'}
                    key={book.book_id}
                    onClick={(_) => handleBookPress(book)}
                    style={{backgroundColor: `${book.color}`}}>
                    {isMobile ? book.short_book_name : book.book_name}
                  </button>
                );
              })}
          </>
        )}
        {/* Lista rozdziałów */}
        {book && !chapter && (
          <>{renderList(book.chapter_count, 'chapters', handleChapterPress)}</>
        )}
        {/*Lista wersetów */}
        {chapter && (
          <>{renderList(chapter.length, 'verses', handleVersePress)}</>
        )}
      </div>
      <div className={'grid'}>
        {/* Nowy testament */}
        {!book && (
          <>
            {books
              .filter((book, index) => {
                return index > 38;
              })
              .map((book, index) => {
                return (
                  <button
                    className={'cell'}
                    key={book.book_id}
                    onClick={(_) => handleBookPress(book)}
                    style={{backgroundColor: `${book.color}`}}>
                    {isMobile ? book.short_book_name : book.book_name}
                  </button>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};
