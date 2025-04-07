import { useState, useEffect } from 'react'
import { defaultStore, settingsReducer } from './store/reducer';
import { useImmerReducer } from "use-immer";
import { DispatchContext, SettingsContext } from './store/context';
import CountDown from './components/countdown';
import { NavBar } from './components/groups/navbar';
import { Footer } from './components/groups/footer';



function App() {
  const [settings, dispatch] = useImmerReducer(settingsReducer, defaultStore);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const localStoreConfig = localStorage.getItem('settings');
    if (localStoreConfig) {
      dispatch({
        type: 'saveConfig',
        payload: JSON.parse(localStoreConfig)
      });
    }
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? <SettingsContext.Provider value={settings}>
        <DispatchContext.Provider value={dispatch}>
        <NavBar />
        <section id='content' className='flex-auto flex flex-col justify-center relative'>
          <CountDown />
        </section>
        <Footer />
        </DispatchContext.Provider>
      </SettingsContext.Provider> : null}
    </>
  )
}

export default App
