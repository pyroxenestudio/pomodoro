import clsx from "clsx";
import { styleTheme } from "../../theme";

const labelInputStyle = {
  label: 'flex text-left mb-2',
  input: {
    light: 'bg-slate-200 text-slate-800 border-slate-300 focus:border-slate-700',
    dark: 'dark:border-slate-700 dark:focus:border-slate-300 dark:bg-slate-800 dark:text-slate-100'
  }
}
interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  vertical?: boolean;
  title: string;
  ref?: React.Ref<HTMLInputElement>;
  leftAlign?: boolean;
  row?: boolean
}

export default function LabelInput({title, type, leftAlign, row, ...rest}: LabelInputProps) {

  const inputStyle = clsx(
    labelInputStyle.input.light,
    labelInputStyle.input.dark,
    row && 'ml-2',
    type === 'checkbox' && 'size-6'
  );

  const labelStyle = clsx(
    labelInputStyle.label,
    {
      'items-start': leftAlign,
      'flex-row items-center': row,
      'flex-col': !row
    }
  );

  return (
    <label className={`${labelStyle} ${styleTheme.font.weight.big}`} htmlFor={rest.name}>
      <span>{title}</span>
      <input className={inputStyle} id={rest.name} type={type} {...rest}/>
    </label>
  )
}