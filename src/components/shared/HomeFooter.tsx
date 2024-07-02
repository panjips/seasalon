import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "./PageContainer";

export const HomeFooter = () => {
  return (
    <footer className="bg-gray-50">
      <PageContainer>
        <div className="max-w-screen-xl py-2 mx-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <Image src="/logo.png" alt="Logo" width={72} height={72} />
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
