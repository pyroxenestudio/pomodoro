import { useState } from "react";
import Button from "./elements/button";
import { XMarkIcon } from '@heroicons/react/24/solid'
import React from "react";

interface IProps {
  children: React.JSX.Element;
  title: string;
  icon: React.JSX.Element;
  buttonStyles?: string;
}

function Modal({title, children, icon, buttonStyles}: IProps) {
  // Props
  // const  = props;

  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [childWithOptions, setChildWithOptions] = useState<React.JSX.Element>(
    React.cloneElement(children, {closeCallBackModal: () => {setIsOpen((oldValue) => !oldValue)}})
  );

  return (
    <>
      {isOpen && (
        <>
          <div className='overlay fixed bg-slate-300 top-0 left-0 size-full z-1' onClick={() => {setIsOpen((oldValue) => !oldValue)}}/>
          <aside className='fixed bg-slate-100 top-10 bottom-10 left-10 right-10 p-1 rounded-sm z-2'>
            <header className='flex p-2 relative'>
              <span className='flex-1'>{title}</span>
              <Button onClick={() => {setIsOpen((oldValue) => !oldValue)}} variant='transparent' className='absolute top-0 right-0 p-2'>
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