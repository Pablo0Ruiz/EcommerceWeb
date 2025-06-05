import React from "react";

interface MainProps {
    children: React.ReactNode;
    className?: string
}

const Main: React.FC<MainProps> = ({ children, className}) => {
    return (
        <main className={`flex-1 p-6 ${className}`}>
            {children}
        </main>
    );
};

export default Main;