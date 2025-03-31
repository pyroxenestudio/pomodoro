import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import useCountDown from "../hooks/useCountDown";
import { DispatchContext, SettingsContext } from "../store/context";
import { MODE } from "../store/reducer";
import Button from "./elements/button";
import rocket from '../assets/audio/rocket.mp3';

interface IProps {}

const CountDown = function(props: IProps) {
  const {} = props;
  // CONTEXT
  const settings = useContext(SettingsContext)!;
  const dispatch = useContext(DispatchContext)!;

  // VARIABLES
  const audio = {
    rocket: new Audio(rocket)
  }

  // STATES

  // REF
  const interval = useRef<number>(0);

  // HOOKS
  // Hook to save the minute to be used by mode
  const minuteByMode = useMemo(() => {
    let minute = 0;
    switch (settings?.mode) {
      case MODE.POMODORO:
        minute = settings.pomodoro
        break;
      case MODE.BREAK:
        minute = settings.break;
        break;
      case MODE.LONGBREAK:
        minute = settings.longBreak;
        break;
      default:
        throw new Error("This mode doesn't exist");
    }
    return minute;
  }, [settings]);

  const timer = useCountDown(minuteByMode, changeMode);

  // METHODS
  function changeMode (manualChange?: React.ChangeEvent<HTMLSelectElement>) {
    // Change mode
    if (!timer.isRunning) {
      if (manualChange) {
        dispatch({
          type: 'mode',
          payload: Number(manualChange.currentTarget.value)
        });
        interval.current = 0;
      } else {
        // Play Sound
        audio.rocket.volume = settings.volume/100;
        audio.rocket.play();
        if (interval.current == settings.interval) {
          interval.current = 0;
          dispatch({
            type: 'mode',
            payload: MODE.LONGBREAK
          });
        } else {
          if (settings.mode === MODE.POMODORO) {
            interval.current += 1;
            dispatch({
              type: 'mode',
              payload: MODE.BREAK
            });
          } else {
            dispatch({
              type: 'mode',
              payload: MODE.POMODORO
            });
          }
        }
      }
    }
  }

  // EFFECTS

  // RENDER VARIABLES
  const min = timer.isRunning ? timer.time?.minutes.toString().padStart(2, '0') : minuteByMode.toString().padStart(2, '0');
  const sec = timer.isRunning ? timer.time?.seconds.toString().padStart(2, '0') : '0'.padStart(2, '0');

  return (
    <>
      {/* Percentage Bar */}
      {timer.isRunning ? <span className='fixed top-0 bg-slate-400 h-2' style={{width: `${timer.time?.percentage}%`}}/> : null}
      {/* Timer */}
      <div id='timer' className='text-8xl font-mono'>
        <span>{min}</span>:<span>{sec}</span>
      </div>
      {/* Buttons to control Timer */}
      <Button onClick={timer.start} disabled={timer.isRunning}>START</Button>
      <Button onClick={timer.stop} variant='danger' disabled={!timer.isRunning}>STOP</Button>
      <Button onClick={timer.pause} variant='warning' disabled={!timer.isRunning}>{!timer.isPause ? 'PAUSE' : 'UNPAUSE'}</Button>
      {/* Select Mode */}
      <select name='selectMode' onChange={changeMode} value={settings.mode} disabled={timer.isRunning} className='p-2'>
        <option value={MODE.POMODORO}>POMODORO</option>
        <option value={MODE.BREAK}>BREAK</option>
        <option value={MODE.LONGBREAK}>LONG BREAK</option>
      </select>
    </>
  );
}

export default CountDown;