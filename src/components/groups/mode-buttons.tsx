// interface ModeButtonsProps {

import clsx from "clsx"
import { MODE } from "../../store/reducer";

interface ModeButtonsProps {
  isRunning: boolean;
  active: MODE | undefined;
  onChange: (newMode: MODE) => void;
}

// const ModeButtonsStyles = {
//   main: ''
// }

export function ModeButtons({isRunning, active, onChange}: ModeButtonsProps) {
  const activeClassName = 'border-b-2 text-green-800 dark:text-green-200 font-semibold';
  const disabledClassName = 'font-thin disabled:border-slate-300';

  const pomodoroStyle = clsx('p-2 border-slate-500 w-[115px]', (MODE.POMODORO === active || !active) && activeClassName, disabledClassName);
  const breakStyle = clsx('p-2 border-slate-500 w-[115px]', MODE.BREAK === active && activeClassName, disabledClassName);
  const longBreakStyle = clsx('p-2 border-slate-500 w-[115px]', MODE.LONGBREAK === active && activeClassName, disabledClassName);

  return (
    <div className='absolute w-full top-0 mt-3 font-mono'>
      <button className={pomodoroStyle} disabled={isRunning} onClick={() => onChange(MODE.POMODORO)}>Pomodoro</button>
      <button className={breakStyle} disabled={isRunning} onClick={() => onChange(MODE.BREAK)}>Break</button>
      <button className={longBreakStyle} disabled={isRunning} onClick={() => onChange(MODE.LONGBREAK)}>Long Break</button>
    </div>
  )
}