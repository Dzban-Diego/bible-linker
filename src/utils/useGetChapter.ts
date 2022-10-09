import {useState} from 'react';

export type verse_type = {
  link: string;
  content: string;
  content_with_links: string;
};

export type chapter_type = verse_type[] | false;

export const useGetChapter = (): {
  chapter: chapter_type;
  updateChapter: (book_index: number, chapter_index: number) => void;
  clearChatper: () => void;
} => {
  const [chapter, setChapter] = useState<chapter_type>();

  const updateChapter = (book_index: number, chapter_index: number) => {
    fetchChapter(book_index, chapter_index).then((data) => setChapter(data));
  };

  const fetchChapter = async (book_index: number, chapter_index: number) => {
    const options = {
      method: 'GET',
      header: {
        'Content-type': 'text/*; charset=utf-8',
        Accept: 'text/*',
      },
    };

    const response = await fetch(
      `https://wol.jw.org/pl/wol/b/r12/lp-p/nwtsty/${book_index}/${chapter_index}`,
      options,
    );

    if (response.status !== 200) {
      console.log('%cError', response);
    }

    const data = await response.text();
    const data_html = new DOMParser().parseFromString(data, 'text/html');

    const article_content = data_html.querySelector('article');
    const chapter_content = article_content?.querySelector('.scalableui');

    if (!chapter_content) return false;

    // remove unnecessary tags
    const header = chapter_content?.querySelector('header');
    if (header) header.remove();
    const pswp = chapter_content?.querySelector('.pswp');
    if (pswp) pswp.remove();
    chapter_content.innerHTML = chapter_content.innerHTML.replace(
      /<\!--.*?-->/g,
      '',
    );

    let content = [];
    // for every .v component
    const verseClassCount = chapter_content.getElementsByClassName('v').length;
    for (let i = 0; i < verseClassCount; i++) {
      const vComponent = chapter_content.querySelector('.v');
      if (vComponent) {
        // set first verse number
        vComponent.innerHTML = vComponent.innerHTML.replace(
          /<strong>.*<\/strong>/g,
          '1',
        );
        content.push(vComponent.innerHTML);
        vComponent.remove();
      }
    }

    let chapter_text = content.join('');
    chapter_text = chapter_text.replaceAll('&nbsp;', ' ');
    chapter_text = chapter_text.replaceAll(
      /<a href="\/pl\/wol\/dx\/r12\/lp-p\/\d*\/\d*" class="[\w\s]*">(\d*\s)<\/a>/g,
      'VERSE_SPLIT',
    );

    const chapter_content_with_links = chapter_text
      .split('VERSE_SPLIT')
      .filter((verse) => verse !== '');
    let chapter_content_text = chapter_text
      .replaceAll(/\<.*?\>?\<.*?\>/g, '')
      .split('VERSE_SPLIT')
      .filter((verse) => verse !== '');

    const chapterData = chapter_content_text.map((verse, index) => {
      return {
        link: `https://jw.org/finder?srcid=jwlshare&wtlocale=P&prefer=lang&bible=${
          book_index < 10 ? `0${book_index}` : book_index
        }${String(chapter_index).padStart(3, '0')}${String(index + 1).padStart(
          3,
          '0',
        )}&pub=nwtsty`,
        content: chapter_content_text[index],
        content_with_links: chapter_content_with_links[index],
      };
    });

    return chapterData;
  };

  const clearChatper = () => {
    setChapter(false);
  };

  return {
    chapter: chapter ?? false,
    updateChapter,
    clearChatper,
  };
};
