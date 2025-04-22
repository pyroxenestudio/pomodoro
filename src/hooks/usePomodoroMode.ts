import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext, DispatchContext } from "../store/context";
import { MODE } from "../store/reducer";
import Sounds from '../sounds';

export default function () {
  // STORE
  const settings = useContext(SettingsContext)!;
  const dispatch = useContext(DispatchContext)!;
  console.log('settings', settings);
  // REFS
  const howManyBreaks = useRef<number>(0);

  const [audio,setAudio] = useState<HTMLAudioElement>(() => {
    return new Audio(Sounds[settings.sound]);
  });

  function nextMode() {
    if (settings.interval === howManyBreaks.current) {
      dispatch({
        type: 'mode',
        payload: MODE.LONGBREAK
      });
      howManyBreaks.current = 0;
      return true;
    }
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
        break;
    }
    howManyBreaks.current++;
    audio.volume = settings.volume/100;
    audio.play();
    return true;
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

  return {
    mode: settings.mode,
    time: getTimeByMode(),
    nextMode,
    changeMode
  }
}