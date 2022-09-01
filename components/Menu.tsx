import { FC, Fragment, ReactNode } from "react";
import { Menu as TwMenu, Transition } from "@headlessui/react";
import Button, { ButtonProps } from "./Button";
import Avatar, { AvatarProps } from "./Avatar";
import clsx from "clsx";

export type MenuProps = {
  children: ReactNode;
  className?: string;
};
const Menu = ({ children, className }: MenuProps) => (
  <TwMenu
    as="div"
    className={clsx(className, "relative inline-block text-left")}
  >
    {children}
  </TwMenu>
);

const MenuButton: FC<Omit<ButtonProps, "icon">> = (props) => (
  <div>
    <TwMenu.Button {...props} as={Button} />
  </div>
);
Menu.Button = MenuButton;

const MenuAvatarButton: FC<AvatarProps> = (props) => (
  <div>
    <TwMenu.Button {...props} as={Avatar} />
  </div>
);
Menu.AvatarButton = MenuAvatarButton;

export type MenuItemsProps = {
  children: ReactNode;
  direction?: "left" | "right";
};
const MenuItems: FC<MenuItemsProps> = ({ children, direction }) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <TwMenu.Items
      className={clsx(
        direction === "right" ? "left-0" : "right-0",
        "z-50 absolute mt-2 w-60 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      )}
    >
      {children}
    </TwMenu.Items>
  </Transition>
);
Menu.Items = MenuItems;

export type MenuItemGroupProps = { children: ReactNode };
const MenuItemGroup: FC<MenuItemGroupProps> = ({ children }) => (
  <div className="px-1 py-1">{children}</div>
);
Menu.ItemGroup = MenuItemGroup;

export type MenuItemProps = {
  id?: string;
  text: string;
  onClick: () => void;
};
const MenuItem: FC<MenuItemProps> = ({ id, text, onClick }) => (
  <TwMenu.Item>
    {({ active }) => (
      <button
        id={id}
        className={`${
          active ? "bg-primary-500 text-white" : "text-neutral-700"
        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        onClick={onClick}
      >
        <span className="text-left break-words">{text}</span>
      </button>
    )}
  </TwMenu.Item>
);
Menu.Item = MenuItem;

export default Menu;
