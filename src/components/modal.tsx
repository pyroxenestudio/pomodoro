import { useState } from "react";
import Button from "./elements/button";
import { XMarkIcon } from '@heroicons/react/24/solid'
import React from "react";

interface IProps {
  children: React.JSX.Element;
  title: string;
  icon: React.JSX.Element;
  buttonStyles?: string;
  hasCallback?: boolean;
}

function Modal({title, children, icon, buttonStyles, hasCallback = false}: IProps) {
  // Props
  // const  = props;

  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [childWithOptions,] = useState<React.JSX.Element>(
   hasCallback ? React.cloneElement(children, {closeCallBackModal: () => {setIsOpen((oldValue) => !oldValue)}}) : children
  );
// h-[500px] w-[300px]
  return (
    <>
      {isOpen && (
        <>
          <div className='overlay fixed bg-slate-300 dark:bg-slate-700 top-0 left-0 size-full z-1' onClick={() => {setIsOpen((oldValue) => !oldValue)}}/>
          <aside className='fixed bg-slate-100 dark:bg-slate-900 left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 h-[800px] w-[600px] max-h-full max-w-full p-2 rounded-sm z-2'>
            <header className='flex p-2 relative font-bold text-2xl'>
              <h1 className='flex-1'>{title}</h1>
              <Button onClick={() => {setIsOpen((oldValue) => !oldValue)}} variant='transparent' className='absolute top-1/2 -translate-y-1/2 right-0 p-2'>
                <XMarkIcon className='size-6'/>
              </Button>
            </header>
            {childWithOptions}
          </aside>
        </>
      )}
      {!isOpen && <button className={buttonStyles} onClick={() => {setIsOpen((oldValue) => !oldValue)}}>{icon}</button>}
    </>
  )
}

export default Modal;