import './App.css';
import {useEffect, useRef, useState} from "react";
import {useMutation} from "react-query";
import extractVerses from './utils/extractVerses'
import {copyTypeAtom} from './utils/initAtoms'
import {useAtom} from "jotai";

const App: React.FC = () => {
  const input = useRef<any>(null)
  const [book, setBook] = useState<number>(0)
  const [bookString, setBookString] = useState<string>('')
  const [chapterCount, setChapterCount] = useState<number>(10)
  const [chapter, setChapter] = useState<number>(0)
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [verseCount, setVerseCount] = useState<number>(176)
  const [showConfig, setShowConfig] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const [copyType] = useAtom(copyTypeAtom)

  const mutation = useMutation(async (data: { book: number, chapter: number }) => {
    return extractVerses(data.book, data.chapter, 'array');
  }, {
    onSuccess: (data, variables, context) => {
      if (data) {
        setVerseCount(data.length)
      }
    },
  })
  type bookType = [string, number, number, string, number, string]
  const books: bookType[] = [
    ["Rodzaju", 1, 50, "#3b3547", 176, "Rodz."],
    ["Wyjścia", 2, 40, "#3b3547", 176, "Wyjś."],
    ["Kapłańska", 3, 27, "#3b3547", 176, "Kapł."],
    ["Liczb", 4, 36, "#3b3547", 176, "Licz."],
    ["Powtórzonego Prawa", 5, 34, "#3b3547", 176, "Powt."],
    ["Jozuego", 6, 24, "#746b84", 176, "Jozu."],
    ["Sędziów", 7, 21, "#746b84", 176, "Sędz."],
    ["Rut", 8, 4, "#746b84", 176, "Rut."],
    ["1 Samuela", 9, 31, "#746b84", 176, "1 Sa."],
    ["2 Samuela", 10, 24, "#746b84", 176, "2 Sa."],
    ["1 Królów", 11, 22, "#746b84", 176, "1 Kr."],
    ["2 Królów", 12, 25, "#746b84", 176, "2 Kr."],
    ["1 Kronik", 13, 29, "#746b84", 176, "1 Kr."],
    ["2 Kronik", 14, 36, "#746b84", 176, "2 Kr."],
    ["Ezdrasza", 15, 10, "#746b84", 176, "Ezdr."],
    ["Nehemiasza", 16, 13, "#746b84", 176, "Nehe."],
    ["Estery", 17, 10, "#746b84", 176, "Este."],
    ["Hioba", 18, 42, "#544c63", 176, "Hiob."],
    ["Psalmy", 19, 150, "#544c63", 176, "Psal."],
    ["Przysłów", 20, 31, "#544c63", 176, "Przy."],
    ["Kaznodziei", 21, 12, "#544c63", 176, "Kazn."],
    ["Pieśń nad Pieśniami", 22, 8, "#544c63", 176, "Pieś."],
    ["Izajasza", 23, 66, "#3b3547", 176, "Izaj."],
    ["Jeremiasza", 24, 52, "#3b3547", 176, "Jere."],
    ["Lamentacje", 25, 5, "#3b3547", 176, "Lame."],
    ["Ezechiela", 26, 48, "#3b3547", 176, "Ezec."],
    ["Daniela", 27, 12, "#3b3547", 176, "Dani."],
    ["Ozeasza", 28, 14, "#3b3547", 176, "Ozea."],
    ["Joela", 29, 3, "#3b3547", 176, "Joel."],
    ["Amosa", 30, 9, "#3b3547", 176, "Amos."],
    ["Abdiasza", 31, 1, "#3b3547", 176, "Abdi."],
    ["Jonasza", 32, 4, "#3b3547", 176, "Jona."],
    ["Micheasza", 33, 7, "#3b3547", 176, "Mich."],
    ["Nahuma", 34, 3, "#3b3547", 176, "Nahu."],
    ["Habakuka", 35, 3, "#3b3547", 176, "Haba."],
    ["Sofoniasza", 36, 3, "#3b3547", 176, "Sofo."],
    ["Aggeusza", 37, 2, "#3b3547", 176, "Agge."],
    ["Zachariasza", 38, 14, "#3b3547", 176, "Zach."],
    ["Malachiasza", 39, 4, "#3b3547", 176, "Mala."],
    ["Mateusza", 40, 28, "#3b3547", 176, "Mate."],
    ["Marka", 41, 16, "#3b3547", 176, "Mark."],
    ["Łukasza", 42, 24, "#3b3547", 176, "Łuka."],
    ["Jana", 43, 21, "#3b3547", 176, "Jana."],
    ["Dzieje", 44, 28, "#746b84", 176, "Dzie."],
    ["Rzymian", 45, 16, "#544c63", 176, "Rzym."],
    ["1 Koryntian", 46, 16, "#544c63", 176, "1 Ko."],
    ["2 Koryntian", 47, 13, "#544c63", 176, "2 Ko."],
    ["Galatów", 48, 6, "#544c63", 176, "Gala."],
    ["Efezjan", 49, 6, "#544c63", 176, "Efez."],
    ["Filipian", 50, 4, "#544c63", 176, "Fili."],
    ["Kolosan", 51, 4, "#544c63", 176, "Kolo."],
    ["1 Tesaloniczan", 52, 5, "#544c63", 176, "1 Te."],
    ["2 Tesaloniczan", 53, 3, "#544c63", 176, "2 Te."],
    ["1 Tymoteusza", 54, 6, "#544c63", 176, "1 Ty."],
    ["2 Tymoteusza", 55, 4, "#544c63", 176, "2 Ty."],
    ["Tytusa", 56, 3, "#544c63", 176, "Tytu."],
    ["Filemona", 57, 1, "#544c63", 176, "File."],
    ["Hebrajczyków", 58, 13, "#544c63", 176, "Hebr."],
    ["Jakuba", 59, 5, "#544c63", 176, "Jaku."],
    ["1 Piotra", 60, 5, "#544c63", 176, "1 Pi."],
    ["2 Piotra", 61, 3, "#544c63", 176, "2 Pi."],
    ["1 Jana", 62, 5, "#544c63", 176, "1 Ja."],
    ["2 Jana", 63, 1, "#544c63", 176, "2 Ja."],
    ["3 Jana", 64, 1, "#544c63", 176, "3 Ja."],
    ["Judy", 65, 1, "#544c63", 176, "Judy."],
    ["Objawienie", 66, 22, "#3b3547", 176, "Obja."]
  ];
  const isMobile = width <= 768;

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }

    /**
     * tworzy listę wszyskich rozdziałów
     */
    const chapterCount: number = book > 0 ? books[book - 1][2] : 0
    setChapterCount(chapterCount)

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
    // eslint-disable-next-line
  }, [book])


  /** odświerza szerokość okna */
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  /**
   * Wraca do listy ksiąg
   */
  const toBooksList = () => {
    setBook(0)
    setChapter(0)
  }

  /**
   * renderList
   * render list of possible verse or chapters
   */
  type keyTypes = 'chapter' | 'verse'
  const renderList = (count: number | Promise<number>, key: keyTypes) => {
    const arr: React.ReactElement[] = []
    const handleClick = (value: number, key: keyTypes) => {
      switch (key) {
        case 'chapter':
          setChapter(value);
          mutation.mutate({book: book, chapter: value})
          break;
        case 'verse':
          let test: string[][] = []
          // handleOpenVerse({verse: value});

          const verseData = mutation.data && mutation.data[value - 1]
          console.log(verseData)

          if (verseData) {
            window.open(verseData[2], '', 'left=600,top=250,width=700,height=700')

            console.log(verseData[1])

            let el = document.createElement('textarea');
            el.value = verseData[0];
            el.setAttribute('readonly', '');
            document.body.appendChild(el);
            el.select();
            el.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(el.value);
            document.execCommand('copy');
            document.body.removeChild(el);
          }

          break;
      }
    }
    for (let i = 1; i <= count; i++) {
      arr.push(
        <button
          className={`cell ${key}`}
          key={`${key}-${i}`}
          onClick={_ => handleClick(i, key)}
        >
          {i}
        </button>
      )
    }
    return arr
  }

  const setBookInput = () => {
    const bookObj = books.find(book => book[0].toUpperCase() === bookString.toUpperCase() || book[5].toUpperCase().replace('.', '') === bookString.toUpperCase())
    if (bookObj) {
      setBook(bookObj[1])
    }

    if (bookString === 'b') {
      setBook(0)
      setChapter(0)
    }

    setBookString('')

    const num = parseInt(bookString)
    if (num) {
      if (chapter !== 0) {
        const verseData = mutation.data && mutation.data[num - 1]
        console.log(verseData)

        if (verseData) {
          window.open(verseData[2], '', 'left=600,top=250,width=700,height=700')

          console.log(verseData[1])

          let el = document.createElement('textarea');
          el.value = verseData[0];
          el.setAttribute('readonly', '');
          document.body.appendChild(el);
          el.select();
          el.setSelectionRange(0, 99999);
          navigator.clipboard.writeText(el.value);
          document.execCommand('copy');
          document.body.removeChild(el);
        }
      }
      if (book !== 0) {
        setChapter(num);
        mutation.mutate({book: book, chapter: num})
      }

    }

  }

  // const options = () => {
  //   return books.map(book => {
  //     return {
  //       name: book[0],
  //       value: book[0],
  //     }
  //   })
  // }

  return (
    <div className="App">
      <header>
        <span className={'book'}>{book > 0 ? `${books[book - 1][0]} ${chapter > 0 ? chapter : ''}` : 'Biblia'}</span>
        {/*<span>{mutation.isSuccess && mutation.data}</span>*/}
        <div>
          <input type="text" className={'text-black'} id="one" value={bookString}
                 onChange={e => setBookString(e.target.value)} onKeyDown={(event) => {
            if (event.keyCode === 13) setBookInput()
          }} ref={input}/>
          <button className="btn btn-primary rounded-none" onClick={_ => toBooksList()}>Lista</button>
        </div>
      </header>
      <div className={'grid'}>
        {/* Lista ksiąg */}
        {!book && (
          <>
            {books.filter((book, index) => {
              return index < 39
            }).map((book, index) => {
              return <button
                className={'cell'}
                key={book[0]}
                onClick={_ => setBook(index + 1)}
                style={{backgroundColor: `${book[3]}`}}
              >
                {isMobile ? book[5] : book[0]}
              </button>
            })}
          </>
        )}
        {/* Lista rozdziałów */}
        {book > 0 && chapter === 0 && (<>
          {renderList(chapterCount, 'chapter')}
        </>)}
        {/* Lista wersetów */}
        {chapter > 0 && (<>
          {renderList(verseCount, 'verse')}
        </>)}
      </div>
      <div className={'grid'}>
        {/* Nowy testament */}
        {!book && (
          <>
            {books.filter((book, index) => {
              return index > 38
            }).map((book, index) => {
              return <button
                className={'cell'}
                key={book[0]}
                onClick={_ => setBook(index + 40)}
                style={{backgroundColor: `${book[3]}`}}
              >
                {isMobile ? book[5] : book[0]}
              </button>
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
