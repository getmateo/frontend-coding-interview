import { FC, ReactNode } from "react";
import clsx from "clsx";
import { FormElementProps } from "./types";

export type ElementWrapperProps = Pick<
  FormElementProps,
  "label" | "description" | "error" | "id"
> & { children: ReactNode; className?: string };

export const ElementDescription: FC<
  Pick<FormElementProps, "id" | "description" | "error">
> = ({ id, description, error }) => (
  <p
    className={clsx(
      "mt-2 text-sm",
      error ? "text-danger-600" : "text-neutral-500"
    )}
    id={`${id}-description`}
    {...(error ? { role: "error" } : {})}
  >
    {error ? error : description ? description : ""}
  </p>
);

const ElementWrapper: FC<ElementWrapperProps> = ({
  children,
  label,
  description,
  error,
  id,
  className,
}) => {
  return (
    <div className={clsx("text-sm", className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      {children}
      <ElementDescription id={id} description={description} error={error} />
    </div>
  );
};

export default ElementWrapper;
