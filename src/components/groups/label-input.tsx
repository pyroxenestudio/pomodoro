import clsx from "clsx";

const labelInputStyle = {
  label: '',
  input: 'border rounded-sm bg-slate-200'
}

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  vertical?: boolean;
  title: string;
}

export default function LabelInput({vertical = true, title, type, ...rest}: LabelInputProps) {

  const inputStyle = clsx(
    labelInputStyle.input,
    {'p-1': type != 'range'}
  )

  return (
    <label className='flex flex-col text-left mb-1'>
      <span>{title}</span>
      <input className={inputStyle} type={type} {...rest}/>
    </label>
  )
}