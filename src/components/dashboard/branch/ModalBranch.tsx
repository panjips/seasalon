import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";

type Params = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  insert: () => void;
};

export const ModalBranch = ({
  isOpen,
  onOpenChange,
  handleChange,
  insert,
}: Params) => {
  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Branch
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    type="text"
                    variant="bordered"
                    label="Name"
                    name="name"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    label="Location"
                    name="location"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={handleChange}
                  />
                  <TimeInput
                    variant="bordered"
                    label="Open At"
                    name="open_at"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          value: e.toString().substring(0, 5),
                          name: "open_at",
                        },
                      })
                    }
                  />
                  <TimeInput
                    variant="bordered"
                    label="Close At"
                    name="close_at"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          value: e.toString().substring(0, 5),
                          name: "close_at",
                        },
                      })
                    }
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={insert}>
                  Tambah
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
