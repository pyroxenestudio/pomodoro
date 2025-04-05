import clsx from "clsx";

const labelInputStyle = {
  label: '',
  input: 'focus:outline-none border rounded-sm border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-normal focus:border-slate-700 dark:focus:border-slate-300'
}

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  vertical?: boolean;
  title: string;
}

export default function LabelInput({title, type, ...rest}: LabelInputProps) {

  const inputStyle = clsx(
    labelInputStyle.input,
    {'p-1': type != 'range'}
  )

  return (
    <label className='flex flex-col text-left mb-1 font-semibold'>
      <span>{title}</span>
      <input className={inputStyle} type={type} {...rest}/>
    </label>
  )
}