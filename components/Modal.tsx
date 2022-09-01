import { FC, Fragment, PropsWithChildren, ReactNode } from "react";
import { Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";
import { TailSpin } from "react-loader-spinner";

export type ModalProps = PropsWithChildren<{
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  size?: "full-screen";
}>;

function Modal({ children, open, onClose, size }: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 overflow-y-scroll"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "relative bg-white rounded-lg text-left shadow-xl transform transition-all p-1",
                  size === "full-screen"
                    ? "m-10 w-full h-full"
                    : "sm:my-8 sm:max-w-lg"
                )}
              >
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-none "
                    onClick={onClose}
                  >
                    <span>X</span>
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export type HeadingProps = {
  title: string;
  description?: string;
  style?: "info" | "danger" | "success";
};

const ICON_CONTAINER_STYLES = {
  info: "bg-primary-100",
  danger: "bg-danger-100",
  success: "bg-success-100",
};

const ICON_STYLES = {
  info: "text-primary-600",
  danger: "text-danger-600",
  success: "text-success-100",
};

const Heading: FC<HeadingProps> = ({ title, description, style }) => {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        {style ? (
          <div
            className={clsx(
              "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mr-2 sm:h-10 sm:w-10",
              ICON_CONTAINER_STYLES[style]
            )}
          ></div>
        ) : null}
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-neutral-900"
          >
            {title}
          </Dialog.Title>
          {description && (
            <div className="mt-2">
              <Dialog.Description className="text-sm text-neutral-500">
                {description}
              </Dialog.Description>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.Heading = Heading;

export type ContentProps = PropsWithChildren<{ loading?: boolean }>;

export const Content: FC<ContentProps> = ({ children, loading }) => {
  return (
    <div className="px-4 sm:px-6 py-2 sm:py-4">
      {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="#059669"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass="flex items-center justify-center"
          visible={true}
        />
      ) : (
        children
      )}
    </div>
  );
};

Modal.Content = Content;

export type FooterProps = {
  children: ReactNode;
};
export const Footer: FC<FooterProps> = ({ children }) => (
  <div className="py-3 px-4 sm:px-6 flex flex-row-reverse">{children}</div>
);

Modal.Footer = Footer;

export default Modal;
