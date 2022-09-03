import './App.css';
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import axios from "axios";
import htmlToMarkdown from '@wcj/html-to-markdown';


const App: React.FC = () => {
  const [book, setBook] = useState<number>(0)
  const [chapterCount, setChapterCount] = useState<number>(10)
  const [chapter, setChapter] = useState<number>(0)
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [verseCount, setVerseCount] = useState<number>(176)
  const mutation = useMutation(async (data: { book: number, chapter: number }) => {
    return getVerseContent(data.book, data.chapter, 'text');
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

  const getVerseContent = async (book: number, chapter: number, config: 'text' | 'markdown') => {
    return axios.get(`https://wol.jw.org/pl/wol/b/r12/lp-p/nwtsty/${book}/${chapter}`).then(async ({data}) => {
      const htmlData = data || '<dit id="article"></dit>'
      const htmlElement = new DOMParser().parseFromString(htmlData, "text/html")
      const article = htmlElement.getElementById('article')
      if (article) {
        const scalableui = article.querySelector('.scalableui')
        if (scalableui) {

          // usuwa niepotrzebny content
          const header = scalableui.querySelector('header')
          const pswp = scalableui.querySelector('.pswp')

          if (header) {
            header.remove()
          }
          if (pswp) {
            pswp.remove()
          }

          scalableui.innerHTML = scalableui.innerHTML.replace(`<!-- Root element of lightbox -->`, '')

          // @ts-ignore
          if (config === 'marcdown') {
            // zamienia linki na linki do strony
            scalableui.innerHTML = scalableui.innerHTML.replaceAll('/pl/wol', 'http://wol.jw.org/pl/wol')

            // to markdown
            const markdown = await htmlToMarkdown({html: scalableui.innerHTML});

            // rozdziela na wersety
            return markdown.replaceAll(/\[(\d)/g, '<<<NEW>>>$&').split('<<<NEW>>>')
          }

          if (config === 'text') {
            // zamiana liczby rozdziału

            // let verses = []
            let content = [] // bez spanow, same wersety
            // Dla każdego komponentu .v
            const verseClassCount = scalableui.getElementsByClassName('v').length
            for (let i = 0; i < verseClassCount; i++) {
              const vComponent = scalableui.querySelector('.v')
              if (vComponent) {
                vComponent.innerHTML = vComponent.innerHTML.replace(/<strong>.*<\/strong>/g, '1')
                content.push(vComponent.innerHTML)
                vComponent.remove()
              }
            }

            // const verses = content.join('').replaceAll(/<a href.*>(.*)<\/a>/g, '<< $1 >>')
            let verses = content.join('')
            verses = verses.replaceAll('&nbsp;', ' ')
            verses = verses.replaceAll(/<a href="\/pl\/wol\/dx\/r12\/lp-p\/\d*\/\d*" class="[\w\s]*">(\d*\s)<\/a>/g, 'NEW$1')
            const versesHTML = new DOMParser().parseFromString(verses, "text/html")
            const linkComponentCount = versesHTML.getElementsByClassName('b').length
            for (let j = 0; j < linkComponentCount; j++) {
              const bComponent = versesHTML.querySelector('.b')
              if (bComponent) {
                bComponent.remove()
              }
            }

            const fnComponentCount = versesHTML.getElementsByClassName('fn').length
            for (let j = 0; j < fnComponentCount; j++) {
              const fnComponent = versesHTML.querySelector('.fn')
              if (fnComponent) {
                fnComponent.remove()
              }
            }

            const versesHTMLBody = versesHTML.querySelector('body')
            if (versesHTMLBody) {
              const versesContent = versesHTMLBody.textContent// || versesHTML.innerHTML
              if (versesContent) {
                const versesArray = versesContent.split('NEW')
                return versesArray.filter(verse => verse !== '')
              }
            }
          }
        }
      }
      return 'test'
    }).catch(e => console.log(e))
  }

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
          handleOpenVerse({verse: value});
          console.log(mutation.data)
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

  const handleOpenVerse = ({verse}: { verse: number }) => {
    /**
     * formated books/chapter/verse
     * dodane 0 na początku by link dobrze wysłać link
     * księga 2 znaki, rozdział i werset 3 znaki
     */
    const formatedBook: string = String(book).padStart(2, '0')
    const formatedChapter: string = String(chapter).padStart(3, '0')
    const formatedVerse: string = String(verse).padStart(3, '0')

    /** Otwiera  werset w jw library*/
    window.open(`https://jw.org/finder?srcid=jwlshare&wtlocale=P&prefer=lang&bible=${formatedBook}${formatedChapter}${formatedVerse}&pub=nwtsty`)

    /** Kopiuje wartość do schowka*/
    let el = document.createElement('textarea');
    el.value = `> [${books[book - 1][0]} ${chapter}:${verse}](https://jw.org/finder?srcid=jwlshare&wtlocale=P&prefer=lang&bible=${book < 10 ? `0${book}` : book}${String(chapter).padStart(3, '0')}${String(verse).padStart(3, '0')}&pub=nwtsty)`;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  return (
    <div className="App">
      <div>
        <span className={'book'}>{book > 0 ? `${books[book - 1][0]} ${chapter > 0 ? chapter : ''}` : 'Biblia'}</span>
        {/*<span>{mutation.isSuccess && mutation.data}</span>*/}
        <button className={'cell back'} onClick={_ => toBooksList()}>Lista</button>
      </div>
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
