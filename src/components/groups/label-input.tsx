import clsx from "clsx";

const labelInputStyle = {
  label: '',
  input: 'border rounded-sm text-slate-900 bg-slate-200 dark:bg-slate-800 dark:text-slate-100 font-normal'
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