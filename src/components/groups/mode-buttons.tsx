import clsx from "clsx"
import { MODE } from "../../store/reducer";
import { styleTheme } from "../../theme";
import usePomodoroMode from "../../hooks/usePomodoroMode";

interface ModeButtonsProps {
  isRunning: boolean;
}

const mainClassName = `w-[115px] relative ${styleTheme.padding.normal} ${styleTheme.border.radius.no}`;
const activeClassName = `text-green-800 dark:text-green-200 after:content-[''] after:border-b-2 after:border-slate-500 after:w-full after:absolute after:left-0 after:bottom-3 ${styleTheme.font.weight.big}`;
const disabledClassName = `disabled:border-slate-300 disabled:${styleTheme.font.weight.verySmall}`;

export function ModeButtons({isRunning}: ModeButtonsProps) {
  // hooks
  const pomodoroMode = usePomodoroMode();

  // Render Variables
  const pomodoroStyle = clsx(mainClassName, (MODE.POMODORO === pomodoroMode.mode) && activeClassName, disabledClassName);
  const breakStyle = clsx(mainClassName, MODE.BREAK === pomodoroMode.mode && activeClassName, disabledClassName);
  const longBreakStyle = clsx(mainClassName, MODE.LONGBREAK === pomodoroMode.mode && activeClassName, disabledClassName);

  return (
    <div className='font-mono min-h-16 flex justify-center landscape:w-full'>
      <button className={pomodoroStyle} disabled={isRunning} onClick={() => {pomodoroMode.changeMode(MODE.POMODORO)}}>Pomodoro</button>
      <button className={breakStyle} disabled={isRunning} onClick={() => {pomodoroMode.changeMode(MODE.BREAK)}}>Break</button>
      <button className={longBreakStyle} disabled={isRunning} onClick={() => {pomodoroMode.changeMode(MODE.LONGBREAK)}}>Long Break</button>
    </div>
  )
}