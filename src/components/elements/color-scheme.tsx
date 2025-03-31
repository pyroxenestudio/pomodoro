import { useCallback, useContext, useEffect, useState } from "react";
import { MoonIcon } from '@heroicons/react/24/outline'
import { SunIcon } from '@heroicons/react/24/solid'

export enum COLORSCHEME {
  'dark',
  'light',
  'auto'
}

export function ColorScheme() {
  const [colorScheme, setColorScheme] = useState<COLORSCHEME>(() => {
    const htmlTag = document.querySelector('html');
    const colorScheme = localStorage.getItem('colorScheme');
    // if (colorScheme window.matchMedia('(prefers-color-scheme: dark)').matches)

    if ((colorScheme && JSON.parse(colorScheme) === COLORSCHEME.dark) || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('colorScheme', JSON.stringify(COLORSCHEME.dark));
      htmlTag?.setAttribute('data-theme', 'dark');
      return COLORSCHEME.dark;
    }
    return COLORSCHEME.light;
    // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   localStorage.setItem('colorScheme', JSON.stringify(COLORSCHEME.dark));
    //   htmlTag?.setAttribute('data-theme', 'dark');
    // }
  });

  const changeColorScheme = (newColorScheme: COLORSCHEME) => {
    const htmlTag = document.querySelector('html');
    switch (newColorScheme) {
      case COLORSCHEME.dark:
        localStorage.setItem('colorScheme', JSON.stringify(COLORSCHEME.dark));
        htmlTag?.setAttribute('data-theme', 'dark');
        setColorScheme(COLORSCHEME.dark);
        break;
      case COLORSCHEME.light:
        localStorage.setItem('colorScheme', JSON.stringify(COLORSCHEME.light));
        htmlTag?.setAttribute('data-theme', 'light');
        setColorScheme(COLORSCHEME.light);
        break;
    }
  }

  return (
    <>
      {colorScheme === COLORSCHEME.dark ? <button onClick={() => changeColorScheme(COLORSCHEME.light)}><MoonIcon className='size-10'/></button> : null}
      {colorScheme === COLORSCHEME.light ? <button onClick={() => changeColorScheme(COLORSCHEME.dark)}><SunIcon className='size-10'/></button> : null}
      {/* {colorScheme === COLORSCHEME.auto ? (
        <button onClick={changeColorScheme} className='flex relative size-12 justify-center items-center'>
          <SunIcon className='size-6 absolute right-1 top-1'/>
          <MoonIcon className='size-10 absolute'/>
        </button>
      ) : null} */}
    </>
  );
}