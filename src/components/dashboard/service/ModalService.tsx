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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { Branch } from "@/utils/models";

type Params = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  insert: () => void;
  branch: Branch[];
};

export const ModalService = ({
  isOpen,
  onOpenChange,
  handleChange,
  insert,
  branch,
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
                Add Service
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Select
                    variant="bordered"
                    label="Select branch"
                    name="branch_id"
                    onChange={(e) => handleChange(e)}
                  >
                    {branch.map((branch: Branch) => (
                      <SelectItem key={branch.id!}>{branch.name}</SelectItem>
                    ))}
                  </Select>
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
                    label="Duration"
                    name="duration"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={handleChange}
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
