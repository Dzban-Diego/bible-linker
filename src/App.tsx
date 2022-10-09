import './App.css';
import {useEffect, useState} from 'react';
import {book_type, books} from './utils/books';
import {useGetChapter} from './utils/useGetChapter';

export const App = () => {
  const [book, setBook] = useState<book_type>();
  const [chapter_index, setChapterIndex] = useState<number>();
  const {chapter, updateChapter, clearChatper} = useGetChapter();

  const [command, setCommand] = useState<string>();

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
    clearChatper();
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

  const handleVersePress = (verse_index: number) => {
    if (!chapter) return;
    const verse = chapter[verse_index - 1];

    // todo pobrac ustawienia

    window.open(verse.link, '', 'left=600,top=250,width=700,height=700');

    let el = document.createElement('textarea');
    el.value = verse.content;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(el.value);
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const execCommand = () => {
    setCommand('');
    if (!command) return;

    switch (command) {
      case 'c':
        return clear();
      case 'b': {
        if (chapter) {
          setChapterIndex(undefined);
          clearChatper();
        } else {
          return clear();
        }
      }
    }

    if (parseInt(command)) {
      if (chapter_index) {
        handleVersePress(parseInt(command));
      } else {
        handleChapterPress(parseInt(command));
      }
    } else {
      const book = books.find(
        (book) =>
          book.book_name.toUpperCase() === command.toUpperCase() ||
          book.short_book_name.toUpperCase().replace('.', '') ===
            command.toUpperCase(),
      );
      if (book) {
        handleBookPress(book);
      }
    }
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
          <input
            autoFocus
            type="text"
            className={'text-black'}
            id="one"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(event) => {
              if (event.keyCode === 13) execCommand();
            }}
          />
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
