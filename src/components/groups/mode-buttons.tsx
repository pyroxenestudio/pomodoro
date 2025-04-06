import clsx from "clsx"
import { MODE } from "../../store/reducer";
import { styleTheme } from "../../theme";

interface ModeButtonsProps {
  isRunning: boolean;
  active: MODE | undefined;
  onChange: (newMode: MODE) => void;
}

const mainClassName = `border-slate-500 w-[115px] ${styleTheme.padding.normal} ${styleTheme.border.radius.no} `;
const activeClassName = `border-b-2 text-green-800 dark:text-green-200 ${styleTheme.font.weight.big}`;
const disabledClassName = `disabled:border-slate-300 disabled:${styleTheme.font.weight.verySmall}`;

export function ModeButtons({isRunning, active, onChange}: ModeButtonsProps) {

  const pomodoroStyle = clsx(mainClassName, (MODE.POMODORO === active || !active) && activeClassName, disabledClassName);
  const breakStyle = clsx(mainClassName, MODE.BREAK === active && activeClassName, disabledClassName);
  const longBreakStyle = clsx(mainClassName, MODE.LONGBREAK === active && activeClassName, disabledClassName);

  return (
    <div className='absolute w-full top-0 mt-3 font-mono'>
      <button className={pomodoroStyle} disabled={isRunning} onClick={() => onChange(MODE.POMODORO)}>Pomodoro</button>
      <button className={breakStyle} disabled={isRunning} onClick={() => onChange(MODE.BREAK)}>Break</button>
      <button className={longBreakStyle} disabled={isRunning} onClick={() => onChange(MODE.LONGBREAK)}>Long Break</button>
    </div>
  )
}