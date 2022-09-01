import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import clsx from "clsx";

export type ButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "ref" | "style"
> & {
  style: "primary" | "secondary" | "white" | "danger" | "transparent";
  size: "small" | "medium" | "large";
  loading?: boolean;
  text: string;
  fullWidth?: boolean;
};

const STYLE_CLASSNAMES: Record<string, string> = {
  primary:
    "border shadow-sm border-transparent text-white bg-primary-600 enabled:hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
  secondary:
    "border shadow-sm border-transparent text-primary-700 bg-primary-100 enabled:hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
  white:
    "border shadow-sm border-neutral-300 text-neutral-700 bg-white enabled:hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
  danger:
    "border shadow-sm border-transparent text-danger-700 bg-danger-100 enabled:hover:bg-danger-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
  transparent:
    "border-none text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-transparent",
};

const SIZE_CLASSNAMES: Record<string, string> = {
  small: "px-3 py-2 text-sm leading-4",
  medium: "px-4 py-2 text-sm",
  large: "px-4 py-2 text-base",
};

const ICON_SIZE_CLASSNAMES: Record<string, string> = {
  small: "-ml-0.5 mr-2 h-4 w-4",
  medium: "-ml-1 mr-2 h-5 w-5",
  large: "-ml-1 mr-3 h-5 w-5",
};

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      style,
      size,
      loading,
      text,
      disabled,
      className,
      fullWidth,
      ...buttonProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          "inline-flex justify-center items-center font-medium rounded-md",
          STYLE_CLASSNAMES[style],
          SIZE_CLASSNAMES[size],
          className,
          "disabled:opacity-75"
        )}
        disabled={loading || disabled}
        {...buttonProps}
      >
        {text}
      </button>
    );
  }
);

export default Button;
