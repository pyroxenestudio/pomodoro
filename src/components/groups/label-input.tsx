import clsx from "clsx";
import { styleTheme } from "../../theme";

const labelInputStyle = {
  label: '',
  input: {
    light: 'bg-slate-200 text-slate-800 border-slate-300 focus:border-slate-700',
    dark: 'dark:border-slate-700 dark:focus:border-slate-300 dark:bg-slate-800 dark:text-slate-100'
  }
}
interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  vertical?: boolean;
  title: string;
}

export default function LabelInput({title, type, ...rest}: LabelInputProps) {

  const inputStyle = clsx(
    labelInputStyle.input.light,
    labelInputStyle.input.dark
  );

  return (
    <label className={`flex flex-col text-left mb-1 ${styleTheme.font.weight.big}`} htmlFor={rest.name}>
      <span>{title}</span>
      <input className={inputStyle} type={type} {...rest} id={rest.name}/>
    </label>
  )
}