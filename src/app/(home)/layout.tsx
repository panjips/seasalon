"use client";
import React from "react";
import { HomeNavbar } from "@/components/shared/HomeNavbar";
import { HomeFooter } from "@/components/shared/HomeFooter";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HomeNavbar />
      {children}
      <HomeFooter />
    </div>
  );
}
