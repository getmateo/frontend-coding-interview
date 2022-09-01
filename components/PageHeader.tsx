import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import Button from "./Button";
import Menu, { MenuItemProps } from "./Menu";

type PageHeaderButtonProps = MenuItemProps;

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  primaryAction?: ReactNode;
  secondaryActions?: Array<PageHeaderButtonProps>;
};

const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
  primaryAction,
  secondaryActions,
}) => {
  const hasSecondaryActions =
    Array.isArray(secondaryActions) && secondaryActions.length > 0;
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-neutral-900 sm:text-3xl sm:truncate">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm font-medium text-neutral-500">{subtitle}</p>
        )}
        {children}
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {hasSecondaryActions && (
          <span className="hidden sm:block">
            {secondaryActions.map((s, index) => {
              return (
                <Button
                  {...s}
                  key={index}
                  className={clsx(index > 0 && "ml-3")}
                  style={"secondary"}
                  size={"small"}
                  id={`${s.id}-button`}
                />
              );
            })}
          </span>
        )}
        {primaryAction && (
          <span className={clsx(hasSecondaryActions && "sm:ml-3")}>
            {primaryAction}
          </span>
        )}

        {hasSecondaryActions && (
          <Menu className={clsx(primaryAction && "ml-3", "sm:hidden")}>
            <Menu.Button style="secondary" size={"small"} text={"Mehr"} />
            <Menu.Items direction={"right"}>
              <Menu.ItemGroup>
                {secondaryActions.map((s) => (
                  <Menu.Item key={s.text} {...s} id={`${s.id}-menu-item`} />
                ))}
              </Menu.ItemGroup>
            </Menu.Items>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
