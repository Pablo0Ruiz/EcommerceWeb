"use client";

import { Suspense } from 'react';
import useToastMessages from "@/shared/hooks/useToastMessages";

// Componente que usa el hook
const ToastHandler = () => {
  useToastMessages();
  return null;
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>
      {children}
    </>
  );
}