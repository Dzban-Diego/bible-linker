import React from 'react';
import {useAtom} from 'jotai';
import SwitchButton from './SwitchButton';
import {multiVerseAtom, redirectAtom} from '../utils/initAtoms';
import {ClientOnly} from './ClientOnly';
import {useRouter} from 'next/router';

interface Props {
  isMobile: boolean;
}

const Config: React.FC<Props> = ({isMobile}) => {
  const [redirect, setRedirect] = useAtom(redirectAtom);
  const [multiVerse, setMultiVerse] = useAtom(multiVerseAtom);
  const router = useRouter();

  if (isMobile) {
    return (
      <SwitchButton name={'Opcje'} onClick={() => router.push('/config')} />
    );
  }

  return (
    <ClientOnly>
      <div className={' w-full flex'}>
        <SwitchButton
          name={'Przekieruj do Biblii'}
          onClick={() => setRedirect(!redirect)}
          state={redirect}
        />
        <SwitchButton
          name={'Kilka wersetów'}
          onClick={() => setMultiVerse(!multiVerse)}
          state={multiVerse}
        />
      </div>
    </ClientOnly>
  );
};

export default Config;
