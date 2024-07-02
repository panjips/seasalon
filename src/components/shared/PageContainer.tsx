import React, { PropsWithChildren } from "react";
import clsx from "clsx";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={clsx("h-full max-w-5xl mx-auto")}>{children}</section>
  );
};
