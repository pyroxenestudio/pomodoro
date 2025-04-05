import { useContext, useMemo, useRef, useState } from "react";
import useCountDown from "../hooks/useCountDown";
import { DispatchContext, SettingsContext } from "../store/context";
import { MODE } from "../store/reducer";
import Button from "./elements/button";
// import rocket from '../assets/audio/rocket.mp3';
import Sounds from '../sounds';
import { ModeButtons } from "./groups/mode-buttons";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

const CountDown = function() {
  // CONTEXT
  const settings = useContext(SettingsContext)!;
  const dispatch = useContext(DispatchContext)!;

  const [audio,] = useState<HTMLAudioElement>(() => {
    return new Audio(Sounds.rocket);
  });

  // VARIABLES

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
  function changeMode (manualChange?: MODE) {
    // Change mode
    if (!timer.isRunning) {
      if (manualChange != undefined) {
        dispatch({
          type: 'mode',
          payload: Number(manualChange)
        });
        interval.current = 0;
      } else {
        // Play Sound
        audio.volume = settings.volume/100;
        audio.play();
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
  const startButton = !timer.isRunning || timer.isPause ? <button className='size-32' onClick={!timer.isPause ? timer.start : timer.pause} disabled={timer.isRunning && !timer.isPause}><PlayIcon className='size-32'/></button> : null;
  const pauseButton = timer.isRunning && !timer.isPause ? <button className='size-32' onClick={timer.pause}><PauseIcon/></button> : null;
  const stopButton = timer.isRunning ? <Button className='w-30 absolute top-[75px] left-[50%] -translate-x-1/2' variant='danger' onClick={timer.stop}>STOP</Button> : null
  
  return (
    <>
      {/* Percentage Bar */}
      {timer.isRunning ? <span className='fixed top-0 bg-slate-600 dark:bg-slate-300 h-2' style={{width: `${timer.time?.percentage}%`}}/> : null}
      {/* Mode buttons */}
      <ModeButtons isRunning={timer.isRunning} active={settings.mode} onChange={changeMode}/>
      {/* Timer */}
      <div id='timer' className='text-8xl font-mono'>
        <span>{min}</span>:<span>{sec}</span>
        <div>
          {startButton}
          {pauseButton}
        </div>
      </div>
      {stopButton}
    </>
  );
}

export default CountDown;