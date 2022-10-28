import React, {useRef} from "react";
import {useAtom} from "jotai";
import {redirectToVerse} from "../utils/initAtoms";

const Config: React.FC = () => {
  const [redirectToVerre, setRedirectToVerse] = useAtom(redirectToVerse)

  return (
    <div className={'bg-amber-100 w-full flex'}>
      <label>
        <p>Przekieruj do biblii</p>
        <input type={'checkbox'} className="" onChange={v => setRedirectToVerse(v.target.value)} value={redirectToVerre}/>
      </label>
    </div>
  )
}

export default Config;
