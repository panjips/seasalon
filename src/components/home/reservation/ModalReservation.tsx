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
  DatePicker,
} from "@nextui-org/react";
import { now, parseAbsoluteToLocal } from "@internationalized/date";
import { Branch, Reservation } from "@/utils/models";

type Params = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | object) => void;
  insert: () => void;
  input: Reservation;
  branch: Branch[];
};

export const ModalReservation = ({
  isOpen,
  onOpenChange,
  handleChange,
  insert,
  input,
  branch,
}: Params) => {
  const filteredServices = branch?.filter((val: Branch, index: number) => {
    if (val.id === input.branch_id) {
      return val;
    }
  });

  function formatDateTime(input: string) {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
  }

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
                Add Reservation
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Select
                    variant="bordered"
                    label="Select branch"
                    name="branch_id"
                    onChange={(e) => handleChange(e)}
                  >
                    {branch?.map((branch: Branch) => (
                      <SelectItem key={branch.id!}>{branch.name}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    variant="bordered"
                    label="Select service"
                    name="service_id"
                    onChange={(e) => handleChange(e)}
                  >
                    {filteredServices?.length != 0 &&
                      filteredServices[0]?.service.map(
                        (reservation: Reservation) => (
                          <SelectItem key={reservation.id!}>
                            {reservation.name}
                          </SelectItem>
                        )
                      )}
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
                    type="number"
                    variant="bordered"
                    label="Phone number"
                    name="phone_number"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={handleChange}
                  />
                  <DatePicker
                    variant="bordered"
                    className="max-w-md"
                    granularity="second"
                    label="Reservation Date Time"
                    classNames={{
                      inputWrapper: "border",
                    }}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "datetime",
                          value: formatDateTime(e.toString()),
                        },
                      });
                    }}
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
