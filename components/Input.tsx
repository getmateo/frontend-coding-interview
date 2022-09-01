import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import { FormElementProps } from "./types";
import clsx from "clsx";
import ElementWrapper from "./ElementWrapper";

export type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref" | "aria-describedby" | "aria-invalid" | "className"
> &
  FormElementProps;

// eslint-disable-next-line react/display-name
export const PlainInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, description, error, ...inputProps } = props;
    const identifier = props.id ?? props.name;

    return (
      <div className="relative rounded-md shadow-sm mt-1">
        <input
          ref={ref}
          id={identifier}
          className={clsx(
            "block w-full pr-10 sm:text-sm rounded-md focus:outline-none",
            error
              ? "border-danger-300 text-danger-900 placeholder-danger-300 focus:ring-danger-500 focus:border-danger-500"
              : "border-neutral-300 focus:ring-primary-500 focus:border-primary-500",
            "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${identifier}-description`}
          {...inputProps}
        />
      </div>
    );
  }
);

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, description, error, id, name } = props;
  const identifier = id ?? name;
  return (
    <ElementWrapper
      id={identifier}
      label={label}
      description={description}
      error={error}
    >
      <PlainInput ref={ref} {...props} />
    </ElementWrapper>
  );
});

export default Input;
