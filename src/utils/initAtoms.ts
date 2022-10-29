import {atomWithStorage} from 'jotai/utils';

export const redirectAtom = atomWithStorage('redirect', false);
export const multiVerseAtom = atomWithStorage('multiVerse', false);

type templateType = 'markdown' | 'text' | 'link';

export const template = atomWithStorage<templateType>('template', 'text');
