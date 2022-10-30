import {atomWithStorage} from 'jotai/utils';

export const redirectAtom = atomWithStorage('redirect', false);
export const multiVerseAtom = atomWithStorage('multiVerse', false);

type templateType = 'markdown' | 'text' | 'link' | 'markdown-link';

export const templateAtom = atomWithStorage<templateType>('template', 'text');
