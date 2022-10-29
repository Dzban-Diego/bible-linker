
import {atom} from 'jotai'
import {atomWithStorage} from "jotai/utils";

export const redirectToVerse = atom('redirectToVerse')
export const redirectAtom = atomWithStorage('redirect',false)
