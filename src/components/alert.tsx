import React from "react";
import { styleTheme } from "../theme";
import Button from "./elements/button";

interface IProps {
  children: React.ReactNode;
  title: string;
  accept: () => void;
  cancel?: () => void;
}

function Alert({title, children, accept, cancel}: IProps) {
  // States
  
  // METHODS
  return (
    <>
      <aside role='alert' className={`
        fixed-middle
        w-[620px]
        max-w-full
        max-h-4/5
        overflow-hidden
        flex
        flex-col
        ${styleTheme.background.level_1}
        ${styleTheme.padding.normal}
        ${styleTheme.border.radius.normal}
        ${styleTheme.zIndex.level_2}`
      }>
        <header className={`${styleTheme.padding.normal} font-bold text-2xl`}>
          <h1 className='flex-1'>{title}</h1>
        </header>
        <div className='overflow-y-auto'>
          {children}
        </div>
        <div className={styleTheme.padding.normal}>
          <Button variant='success' onClick={accept}>Accept</Button>
          {cancel && <Button variant='danger' onClick={cancel} className={'ml-5'}>Cancel</Button>}
        </div>
      </aside>
    </>
  )
}

export default Alert;