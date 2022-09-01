import React, { forwardRef, useMemo } from "react";
import clsx from "clsx";

export type AvatarProps = {
  name?: string;
  imgSrc?: string;
  size: "small" | "medium" | "large";
  style?: "squared" | "rounded";
  onClick?: () => void | Promise<void>;
  className?: string;
  showOverlay?: boolean;
  label?: string;
  inputId?: string;
};

const CONTAINER_SIZE_CLASSES = {
  small: "h-8 w-8",
  medium: "h-14 w-14",
  large: "h-24 w-24",
};

const TEXT_SIZE_CLASSES = {
  small: "text-xs",
  medium: "text-2xl",
  large: "text-3xl",
};

const USER_ICON_SIZE_CLASSES = {
  small: "w-4 h-4",
  medium: "w-6 h-6",
  large: "w-8 h-8",
};

const ICON_SIZE_CLASSES = {
  small: "w-4 h-4",
  medium: "w-4 h-4",
  large: "w-6 h-6",
};

// eslint-disable-next-line react/display-name
const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      imgSrc,
      style,
      name,
      label,
      onClick,
      size,
      className,
      showOverlay,
      inputId,
      ...props
    },
    ref
  ) => {
    const initials = useMemo<string | null>(() => {
      if (!name) return null;
      const initials = name.split(" ").map((namePart) => namePart.charAt(0));
      return [initials.shift(), initials.pop()].join("");
    }, [name]);
    return (
      <span
        ref={ref}
        onClick={onClick}
        className={clsx(
          className,
          "relative",
          style === "squared" ? "rounded-md" : "rounded-full",
          `inline-flex items-center justify-center ${CONTAINER_SIZE_CLASSES[size]}`,
          !imgSrc && "bg-neutral-500",
          onClick && "cursor-pointer"
        )}
        {...props}
      >
        {label && (
          <label htmlFor={inputId} className="sr-only">
            {label}
          </label>
        )}
        {imgSrc ? (
          <div
            style={{ backgroundImage: `url(${imgSrc})` }}
            className={clsx(
              CONTAINER_SIZE_CLASSES[size],
              "bg-cover",
              style === "squared" ? "rounded-md" : "rounded-full"
            )}
          />
        ) : (
          <span
            className={clsx("font-bold text-white", TEXT_SIZE_CLASSES[size])}
          >
            {initials}
          </span>
        )}
        {onClick && (
          <span
            className={clsx(
              showOverlay ? "opacity-80" : "opacity-0 hover:opacity-80",
              "gap-y-1 duration-200 absolute inset-0 flex flex-col justify-center items-center bg-neutral-800 text-white text-sm text-light",
              style === "squared" ? "rounded-md" : "rounded-full"
            )}
          >
            {label && size !== "small" ? label : null}
          </span>
        )}
      </span>
    );
  }
);

export default Avatar;
