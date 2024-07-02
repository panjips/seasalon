"use client";
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Button,
} from "@nextui-org/react";

import { Branch, Service } from "@/utils/models";
import { ModalService } from "@/components/dashboard/service/ModalService";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [refresh, setRefresh] = useState<boolean>(false);
  const [branch, setBranch] = useState<Branch[]>([]);
  const [service, setService] = useState<Service[]>([]);
  const [input, setInput] = useState<Service>({
    name: "",
    duration: "",
    branch_id: "",
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const headCell = [
    { id: "name", label: "Name" },
    { id: "duration", label: "Duration" },
    { id: "branch", label: "Branch" },
  ];

  useEffect(() => {
    async function fetchDataBranch() {
      const res = await fetch("/api/v1/branch", {
        method: "GET",
      });
      const data = await res.json();
      setBranch(data.data);
    }
    async function fetchDataService() {
      const res = await fetch("/api/v1/service", {
        method: "GET",
      });
      const data = await res.json();
      setService(data.data);
    }

    fetchDataBranch();
    fetchDataService();
  }, [refresh]);

  const handleInsert = async () => {
    try {
      const insertData = await fetch("/api/v1/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      await toast
        .promise(Promise.all([insertData]), {
          loading: "Menyimpan data...",
          success: "Data berhasil disimpan",
          error: "Gagal menyimpan data",
        })
        .then(() => {
          onClose();
          setInput({ name: "", duration: "", branch_id: "" });
          setRefresh(!refresh);
        });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setInput({ name: "", duration: "", branch_id: "" });
    }
  };

  return (
    <PageContainer>
      <div className="mx-6">
        <div className="my-3 w-full">
          <div className="border-b border-b-gray-300 mb-4">
            <p className="text-xl font-light text-gray-700 mb-2">
              DASHBOARD{" "}
              <strong className="text-gray-800 font-bold">SERVICE</strong>
            </p>
            <div className="bg-gray-600 h-1 w-32"></div>
          </div>
        </div>

        <div className="w-full my-3 flex justify-end">
          <Button
            color="success"
            size="md"
            variant="flat"
            onPress={() => onOpen()}
            className="shadow-sm"
          >
            Tambah Service
          </Button>
          <ModalService
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            handleChange={handleChangeInput}
            insert={handleInsert}
            branch={branch}
          />
        </div>

        <div>
          <Table aria-label="Table Berita" radius="sm">
            <TableHeader className="flex justify-center">
              {headCell.map((cell) => (
                <TableColumn key={cell.id}>{cell.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {service?.map((data: Service, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.duration}</TableCell>
                    <TableCell>{data.Branch?.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageContainer>
  );
}
