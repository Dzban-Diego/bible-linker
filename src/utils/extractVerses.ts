import axios from "axios";
import htmlToMarkdown from "@wcj/html-to-markdown";
import {copyTypes} from "../types";

export default async (book: number, chapter: number, config: copyTypes) => {
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

          let verses = content.join('')
          verses = verses.replaceAll('&nbsp;', ' ')
          verses = verses.replaceAll(/<a href="\/pl\/wol\/dx\/r12\/lp-p\/\d*\/\d*" class="[\w\s]*">(\d*\s)<\/a>/g, 'NEW')

          // usuwanie linków
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
              console.log(versesArray.filter(verse => verse !== ''))
              return versesArray.filter(verse => verse !== '')
            }
          }
        }

        if (config === 'array') {
          let array: string[][] = []

          scalableui.innerHTML = scalableui.innerHTML.replaceAll('/pl/wol', 'http://wol.jw.org/pl/wol')

          // to markdown
          const markdown = await htmlToMarkdown({html: scalableui.innerHTML});

          // rozdziela na wersety
          array[0] = markdown.replaceAll(/\[(\d)/g, '<<<NEW>>>$&').split('<<<NEW>>>')

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

          let verses = content.join('')
          verses = verses.replaceAll('&nbsp;', ' ')
          verses = verses.replaceAll(/<a href="http:\/\/wol\.jw\.org\/pl\/wol\/dx\/r12\/lp-p\/\d*\/\d*" class="[\w\s]*">(\d*\s)<\/a>/g, 'NEW')
          verses = verses.replaceAll(/<a href="http:\/\/wol\.jw\.org\/pl\/wol\/bc\/r12\/lp-p\/\d*\/\d*" data-bid="\d*-\d*" class="b">.<\/a>/g, '')

          // usuwanie linków
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
            console.log(versesContent)
            if (versesContent) {
              const versesArray = versesContent.split('NEW')
              console.log(versesArray.filter(verse => verse !== ''))
              array[1] = versesArray.filter(verse => verse !== '')
            }
          }

          array[2] = array[1].map((virse, index) => {
            return `https://jw.org/finder?srcid=jwlshare&wtlocale=P&prefer=lang&bible=${book < 10 ? `0${book}` : book}${String(chapter).padStart(3, '0')}${String(index + 1).padStart(3, '0')}&pub=nwtsty`
          })

          const final = array[1].map((ss, index) => {
            return [array[0][index], array[1][index], array[2][index]]
          })
          console.log(final)
          return final
          // console.log(array)
        }
      }
    }
    // return 'test'
  }).catch(e => console.log(e))
}
