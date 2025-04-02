import clsx from "clsx";

interface JustTestProps {
  name?: string;
  customStyles?: string[];
}

const justTestStyles = {
  main: 'p-2'
}

export default function JustTest({name, customStyles}: JustTestProps) {

  const className = clsx(
    justTestStyles.main,
    customStyles
  );

  return (
    <section className={className}>
      <hr />
      <h1>JUST TESTING</h1>
      <span>{name}</span>
    </section>
  )
}