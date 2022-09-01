import { FC, ReactNode } from "react";
import clsx from "clsx";

export type FormGridLayoutProps = {
  children?: ReactNode;
  className?: string;
};

function FormGridLayout({ children, className }: FormGridLayoutProps) {
  return (
    <div className={clsx("grid grid-cols-6 gap-6", className)}>{children}</div>
  );
}

const FullWidth: FC<FormGridLayoutProps> = ({ children, className }) => (
  <div className={clsx("col-span-6", className)}>{children}</div>
);
FormGridLayout.FullWidth = FullWidth;

const HalfWidth: FC<FormGridLayoutProps> = ({ children, className }) => (
  <div className={clsx("col-span-6 sm:col-span-3", className)}>{children}</div>
);
FormGridLayout.HalfWidth = HalfWidth;

const ThirdWidth: FC<FormGridLayoutProps> = ({ children, className }) => (
  <div className={clsx("col-span-6 sm:col-span-3 lg:col-span-2", className)}>
    {children}
  </div>
);
FormGridLayout.ThirdWidth = ThirdWidth;

export default FormGridLayout;
