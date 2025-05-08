import { useContext, useEffect, useState } from "react";
import { SettingsContext, DispatchContext } from "../store/context";
import { MODE } from "../store/reducer";
import Sounds from '../sounds';
import useLocalStorageRef from "./useLocalStorageRef";
import useLocalStorage from "./useLocalStorage";

export default function () {
  // STORE
  const settings = useContext(SettingsContext)!;
  const dispatch = useContext(DispatchContext)!;
  const localStorageHook = useLocalStorage();

  // REFS
  const howManyBreaks = useLocalStorageRef<number>('howManyBreaks', 0);

  const [audio,setAudio] = useState<HTMLAudioElement>(() => {
    return new Audio(Sounds[settings.sound]);
  });

  function nextMode(userEvent: boolean = false) {
    if (userEvent) return;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0,0,0);

    if (settings.interval === howManyBreaks.current) {
      dispatch({
        type: 'mode',
        payload: MODE.LONGBREAK
      });

      howManyBreaks.setRef(0, date);
    } else {
      switch (settings.mode) {
        case MODE.POMODORO:
          dispatch({
            type: 'mode',
            payload: MODE.BREAK
          });
          break;
        case MODE.BREAK:
        case MODE.LONGBREAK:
          dispatch({
            type: 'mode',
            payload: MODE.POMODORO
          });
          if (howManyBreaks.current !== null) {
            howManyBreaks.setRef(howManyBreaks.current + 1, date);
          }
          break;
      }
    }
    audio.volume = settings.volume/100;
    audio.play();
  }

  function changeMode(mode: MODE) {
    dispatch({
      type: 'mode',
      payload: mode
    });
  }

  function getTimeByMode() {
    switch (settings?.mode) {
      case MODE.POMODORO:
        return settings.pomodoro;
      case MODE.BREAK:
        return settings.break;
      case MODE.LONGBREAK:
        return settings.longBreak;
      default:
        return 0;
    }
  }

  // EFFECTS
  useEffect(() => {
    setAudio(new Audio(Sounds[settings.sound]));
  }, [settings.sound]);

  useEffect(() => {
    // Add one day to the date,s o expiration time is today + 1 day
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0,0,0);
    localStorageHook.save('mode', settings.mode, date);
  }, [settings.mode]);

  return {
    mode: settings.mode,
    time: getTimeByMode(),
    howManyBreaks: howManyBreaks.current,
    nextMode,
    changeMode
  }
}