import type { ReactNode, ButtonHTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  type: string;
  bgColor: string;
  textColor: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...rest
}: Props) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
