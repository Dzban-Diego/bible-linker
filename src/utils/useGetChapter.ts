import {useState} from 'react';

export type verse_type = {
  link: string;
  content: string;
  content_with_links?: string;
};

export type chapter_type = verse_type[] | false;

export const useGetChapter = (): {
  chapter: chapter_type;
  updateChapter: (book_index: number, chapter_index: number) => void;
  clearChapter: () => void;
} => {
  const [chapter, setChapter] = useState<chapter_type>();

  const updateChapter = (book_index: number, chapter_index: number) => {
    fetchChapter(book_index, chapter_index).then((data) => setChapter(data));
  };

  const fetchChapter = async (book_index: number, chapter_index: number) => {
    const range = `${book_index}${String(chapter_index).padStart(
      3,
      '0',
    )}001-${book_index}${String(chapter_index).padStart(3, '0')}179`;

    console.log(range);

    const response = await fetch(`/api/verse?range=${range}`);

    if (response.status !== 200) {
      console.log('%cError', response);
    }

    const data = await response.json();
    const verses = data.data.ranges[range].verses.map((verse: any) => {
      const temp = document.createElement('div');
      temp.innerHTML = verse.content;
      const verseContent = temp.textContent;
      return {
        link: `https://jw.org/finder?srcid=jwlshare&wtlocale=P&prefer=lang&bible=${String(
          verse.bookNumber,
        ).padStart(2, '0')}${String(verse.chapterNumber).padStart(
          3,
          '0',
        )}${String(verse.verseNumber).padStart(3, '0')}&pub=nwtsty`,
        content: verseContent,
      };
    });

    console.log(verses);
    return verses;
  };

  const clearChapter = () => {
    setChapter(false);
  };

  return {
    chapter: chapter ?? false,
    updateChapter,
    clearChapter,
  };
};
