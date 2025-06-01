import React from "react";

interface MainProps {
  children: React.ReactNode;
  className?: string; // Añade esta prop opcional
}

const Main: React.FC<MainProps> = ({ children, className = "" }) => {
  return (
    <main className={`flex-1 p-6 ${className}`}> {/* Elimina bg-gray-50 y min-h-screen */}
      {children}
    </main>
  );
};

export default Main;