import { createPortal } from "react-dom";
import { useContext, useEffect, useRef} from "react";
import useCountDown from "../hooks/useCountDown";
import { DispatchContext } from "../store/context";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/24/solid";
import usePomodoroMode from "../hooks/usePomodoroMode";
import Alert from "./alert";

const CountDown = function() {
  // CONTEXT
  const dispatch = useContext(DispatchContext)!;
  // HOOKS
  const pomodoroMode = usePomodoroMode();
  const timer = useCountDown(pomodoroMode.time, pomodoroMode.nextMode);
  // REFS
  const titleEmpty = useRef<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'countDownIsRunning',
      payload: timer.isRunning
    });
  }, [timer.isRunning]);

  useEffect(() => {
    if (!timer.isHidden) {
      // Here the portal is already deleted, so react doesn't control title and you can change the innerHtml
      document.querySelector('title')!.innerHTML = 'Pomodoro';
      titleEmpty.current = false;
    }
  }, [timer.isHidden]);


  // There aren't any portal so is ok to do the innerHtml, because reactjs doesn't control the title yet
  if (timer.isHidden && !titleEmpty.current) {
    document.querySelector('title')!.innerHTML = '';
    titleEmpty.current = true;
  }


  // METHODS

  // RENDER VARIABLES
  const min = timer.isRunning ? timer.time?.minutes.toString().padStart(2, '0') : pomodoroMode.time.toString().padStart(2, '0');
  const sec = timer.isRunning ? timer.time?.seconds.toString().padStart(2, '0') : '0'.padStart(2, '0');
  const startButton = !timer.isRunning || timer.isPause ? <button className='size-32' onClick={!timer.isPause ? timer.start : timer.pause} disabled={timer.isRunning && !timer.isPause}><PlayIcon className=''/></button> : null;
  const pauseButton = timer.isRunning && !timer.isPause ? <button className='size-32' onClick={timer.pause}><PauseIcon/></button> : null;
  const stopButton = timer.isRunning ? <button className='size-32' onClick={timer.stop}><StopIcon/></button> : null;

  const clockDownUI = (
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
  );

  return (
    <>
      {<span className='fixed top-0 bg-slate-600 dark:bg-slate-300 h-2' style={{width: `${timer.time?.percentage}%`}}/>}
      {timer.freezeTime.message ? <Alert title='Resume tab from freeze' accept={timer.freezeTime.callback}>{timer.freezeTime.message}</Alert> : null}
      {timer.isHidden && createPortal(<>{min}:{sec}</>, document.querySelector('title') as HTMLElement, 'title')}
      {!timer.isHidden && clockDownUI}
    </>
  );
}

export default CountDown;