import { useContext, useEffect} from "react";
import useCountDown from "../hooks/useCountDown";
import { DispatchContext } from "../store/context";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/24/solid";
import usePomodoroMode from "../hooks/usePomodoroMode";

const CountDown = function() {
  // CONTEXT
  const dispatch = useContext(DispatchContext)!;

  const pomodoroMode = usePomodoroMode();

  const timer = useCountDown(pomodoroMode.time, pomodoroMode.nextMode);

  useEffect(() => {
    dispatch({
      type: 'countDownIsRunning',
      payload: timer.isRunning
    });
  }, [timer.isRunning]);

  // METHODS

  // RENDER VARIABLES
  const min = timer.isRunning ? timer.time?.minutes.toString().padStart(2, '0') : pomodoroMode.time.toString().padStart(2, '0');
  const sec = timer.isRunning ? timer.time?.seconds.toString().padStart(2, '0') : '0'.padStart(2, '0');
  const startButton = !timer.isRunning || timer.isPause ? <button className='size-32' onClick={!timer.isPause ? timer.start : timer.pause} disabled={timer.isRunning && !timer.isPause}><PlayIcon className=''/></button> : null;
  const pauseButton = timer.isRunning && !timer.isPause ? <button className='size-32' onClick={timer.pause}><PauseIcon/></button> : null;
  const stopButton = timer.isRunning ? <button className='size-32' onClick={timer.stop}><StopIcon/></button> : null;

  return (
    <>
      {/* Percentage Bar */}
      {<span className='fixed top-0 bg-slate-600 dark:bg-slate-300 h-2' style={{width: `${timer.time?.percentage}%`}}/>}
      {/* Timer */}
      <div id='timer' className='text-8xl w-full font-mono flex items-center justify-center flex-col'>
        <div>
          <span>{min}</span>:<span>{sec}</span>
        </div>
        <div>
          {startButton}
          {pauseButton}
          {stopButton}
        </div>
      </div>
    </>
  );
}

export default CountDown;