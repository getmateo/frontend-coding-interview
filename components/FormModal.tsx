import React, {
  DetailedHTMLProps,
  FC,
  FormHTMLAttributes,
  ReactNode,
} from "react";
import Button from "./Button";
import Modal, { ModalProps } from "./Modal";

export type FormModalProps = {
  open: boolean;
  title: string;
  labels: { submit: string; cancel: string };
  description?: string;
  onClose: () => void;
  loading?: boolean;
  loadingContent?: boolean;
  children: ReactNode;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> &
  Pick<ModalProps, "size">;

const FormModal: FC<FormModalProps> = ({
  open,
  onClose,
  title,
  labels,
  loading,
  description,
  children,
  size,
  loadingContent,
  ...formProps
}) => {
  return (
    <Modal open={open} onClose={onClose} size={size}>
      <form {...formProps}>
        <Modal.Heading title={title} description={description} />
        <Modal.Content loading={loadingContent}>{children}</Modal.Content>
        <Modal.Footer>
          <Button
            loading={loading}
            disabled={loading}
            className="ml-3"
            text={labels.submit}
            style="primary"
            type="submit"
            size="medium"
          />
          <Button
            disabled={loading}
            text={labels.cancel}
            style="white"
            onClick={onClose}
            size="medium"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormModal;
