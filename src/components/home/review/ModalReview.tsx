import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  
} from "@nextui-org/react";
import { RatingBar } from "@/components/shared/RatingBar";

type Params = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  insert: () => void;
  rating: number;
};

export const ModalReview = ({
  isOpen,
  onOpenChange,
  handleChange,
  insert,
  rating,
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
                Add Review
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
                    label="Comment"
                    name="comment"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={handleChange}
                  />
                  <div className="self-center">
                    <RatingBar rating={rating} onChange={handleChange} />
                  </div>
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
