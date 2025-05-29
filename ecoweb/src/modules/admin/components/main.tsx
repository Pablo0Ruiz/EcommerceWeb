import React from "react";

interface MainProps {
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
            {children}
        </main>
    );
};

export default Main;
