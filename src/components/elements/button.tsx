import clsx from "clsx";
// import { IStyleTheme } from "../../theme";

const buttonStyle = {
  main: 'p-2 rounded-sm font-semibold disabled:bg-slate-300 dark:disabled:bg-slate-500',
  success: {
    light: 'bg-green-200 hover:bg-green-300 active:bg-green-400 text-slate-800',
    dark: 'dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900 dark:text-slate-100'
  },
  danger: {
    light: 'bg-rose-200 hover:bg-rose-300 active:bg-rose-400 text-slate-800',
    dark: 'dark:bg-rose-700 dark:hover:bg-rose-800 dark:active:bg-rose-900 dark:text-slate-100'
  },
  warning: {
    light: 'bg-amber-200 active:bg-amber-300 text-slate-800',
    dark: 'dark:bg-amber-700 dark:active:bg-amber-800 dark:text-slate-100'
  },
  transparent: {
    light: '',
    dark: ''
  }
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof Omit<typeof buttonStyle, 'main'>
}

export default function Button({children, variant = 'success', ...rest}: ButtonProps) {

  // New Way
  rest.className = clsx(buttonStyle.main, buttonStyle[variant].light, buttonStyle[variant].dark, rest.className);

  return <button {...rest}>{children}</button>
}