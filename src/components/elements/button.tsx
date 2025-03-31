import clsx from "clsx";

const buttonStyle = {
  main: 'p-2 rounded-sm font-semibold disabled:bg-slate-300 dark:disabled:bg-slate-500',
  success: {
    light: 'bg-green-200 active:bg-green-300',
    dark: 'dark:bg-green-700 dark:active:bg-green-800'
  },
  danger: {
    light: 'bg-rose-200 active:bg-rose-300',
    dark: 'dark:bg-rose-700 dark:active:bg-rose-800'
  },
  warning: {
    light: 'bg-amber-200 active:bg-amber-300',
    dark: 'dark:bg-amber-700 dark:active:bg-amber-800'
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