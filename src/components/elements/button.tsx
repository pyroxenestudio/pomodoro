import clsx from "clsx";
import { styleTheme } from "../../theme";

const buttonStyle = {
  success: 'success',
  danger: 'danger',
  warning: 'warning',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // variant?: keyof Omit<typeof buttonStyle, 'main'>
  variant?: keyof typeof buttonStyle
  padding?: keyof typeof styleTheme.padding;
  radius?: keyof typeof styleTheme.border.radius;
}

export default function Button({
  children,
  variant,
  radius,
  padding = 'normal',
  ...rest}: ButtonProps) {

  // New Way
  rest.className = clsx(
    styleTheme.padding[padding],
    radius && styleTheme.border.radius[radius],
    variant && buttonStyle[variant],
    rest.className
  );

  return <button {...rest}>{children}</button>
}