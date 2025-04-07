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
  ref?: React.Ref<HTMLInputElement>;
}

export default function LabelInput({title, type, ...rest}: LabelInputProps) {

  const inputStyle = clsx(
    labelInputStyle.input.light,
    labelInputStyle.input.dark
  );

  return (
    <label className={`flex flex-col text-left mb-2 ${styleTheme.font.weight.big}`} htmlFor={rest.name}>
      <span>{title}</span>
      <input className={inputStyle} id={rest.name} type={type} {...rest}/>
    </label>
  )
}