import {atomWithStorage} from 'jotai/utils';

export const redirectAtom = atomWithStorage('redirect', false);
export const multiVerseAtom = atomWithStorage('multiVerse', false);
export const template = atomWithStorage('template', '');
