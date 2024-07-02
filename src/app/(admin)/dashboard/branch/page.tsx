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

import { Branch } from "@/utils/models";
import { ModalBranch } from "@/components/dashboard/branch/ModalBranch";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [refresh, setRefresh] = useState(false);
  const [collectionData, setCollectionData] = useState<Branch[]>([]);
  const [input, setInput] = useState<Branch>({
    name: "",
    location: "",
    open_at: "",
    close_at: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const headCell = [
    { id: "name", label: "Name" },
    { id: "location", label: "Location" },
    { id: "open_at", label: "Open Time" },
    { id: "close_at", label: "Close Time" },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/v1/branch", {
        method: "GET",
      });
      const data = await res.json();
      setCollectionData(data.data);
    }

    fetchData();
  }, [refresh]);

  const handleInsert = async () => {
    try {
      const insertData = await fetch("/api/v1/branch", {
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
          setInput({ name: "", location: "", open_at: "", close_at: "" });
          setRefresh(!refresh);
        });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setInput({ name: "", location: "", open_at: "", close_at: "" });
    }
  };

  return (
    <PageContainer>
      <div className="mx-6">
        <div className="my-3 w-full">
          <div className="border-b border-b-gray-300 mb-4">
            <p className="text-xl font-light text-gray-700 mb-2">
              DASHBOARD{" "}
              <strong className="text-gray-800 font-bold">BRANCH</strong>
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
            Tambah Branch
          </Button>
          <ModalBranch
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            handleChange={handleChangeInput}
            insert={handleInsert}
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
              {collectionData?.map((data: Branch, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.location}</TableCell>
                    <TableCell>{data.open_at}</TableCell>
                    <TableCell>{data.close_at}</TableCell>
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
