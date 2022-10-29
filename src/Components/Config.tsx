import React, {useEffect, useRef, useState} from "react";
import {useAtom} from "jotai";
import SwitchButton from "./SwitchButton";
import {redirectAtom} from "../utils/initAtoms";
import {ClientOnly} from "./ClientOnly";

const Config: React.FC = () => {
  const [redirect, setRedirect] = useAtom(redirectAtom)

  return (
    <ClientOnly>
      <div className={' w-full flex'}>
        <SwitchButton name={'Przekieruj do Biblii'} onClick={() => setRedirect(!redirect)} state={redirect} />
      </div>
    </ClientOnly>
  )
}

export default Config;
