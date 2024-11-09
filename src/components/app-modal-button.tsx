import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

import { AppButtonProps } from "@/types";

type Props = {
  triggerButton: AppButtonProps;
  actionButton?: AppButtonProps;
  closeButton?: AppButtonProps;
  modalConfig?: Partial<ModalProps>;
  backdrop?: "blur" | "opaque" | "transparent";
  body?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onCloseCallback?: () => void;
  onOpenCallback?: () => void;
};

export default function AppModal({
  backdrop = "blur",
  body,
  header,
  footer,
  open,
  triggerButton,
  actionButton,
  closeButton,
  modalConfig,
  onCloseCallback,
  onOpenCallback,
}: Readonly<Props>) {
  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: open,
    onClose: onCloseCallback,
    onOpen: onOpenCallback,
  });

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="primary"
          size="sm"
          variant="solid"
          {...triggerButton}
          onPress={handleOpen}
        >
          {triggerButton.label}
        </Button>
      </div>
      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        {...modalConfig}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                {footer}
                <br />
                {closeButton && (
                  <Button
                    color="danger"
                    variant="light"
                    {...closeButton}
                    onPress={onClose}
                  >
                    {closeButton?.label}
                  </Button>
                )}
                {actionButton && (
                  <Button color="primary" {...actionButton} onPress={onClose}>
                    {actionButton?.label}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
