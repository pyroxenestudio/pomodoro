import clsx from "clsx";
import { styleTheme } from "../../theme";

const labelSelectStyle = {
  label: '',
  input: {
    light: 'bg-slate-200 text-slate-800 border-slate-300 focus:border-slate-700',
    dark: 'dark:border-slate-700 dark:focus:border-slate-300 dark:bg-slate-800 dark:text-slate-100'
  }
}
interface LabelSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  title: string;
  options: string[];
  ref: React.Ref<HTMLSelectElement>;
}

export default function LabelInput({title, options, ...rest}: LabelSelectProps) {

  const inputStyle = clsx(
    labelSelectStyle.input.light,
    labelSelectStyle.input.dark
  );

  const optionsComponents = options.map(nameSound => {
    return <option value={nameSound} className={'uppercase'} key={nameSound}>{nameSound}</option>
  });

  return (
    <label className={`flex flex-col text-left mb-2 ${styleTheme.font.weight.big}`} htmlFor={rest.name}>
      <span>{title}</span>
      <select className={inputStyle} id={rest.name} {...rest}>
        {optionsComponents}
      </select>
    </label>
  )
}