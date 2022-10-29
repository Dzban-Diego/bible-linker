import React from 'react';
import {useAtom} from 'jotai';
import SwitchButton from './SwitchButton';
import {multiVerseAtom, redirectAtom} from '../utils/initAtoms';
import {ClientOnly} from './ClientOnly';

const Config: React.FC = () => {
  const [redirect, setRedirect] = useAtom(redirectAtom);
  const [multiVerse, setMultiVerse] = useAtom(multiVerseAtom);

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
