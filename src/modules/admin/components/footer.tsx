import React from "react";

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white p-4 text-center">
            &copy; {new Date().getFullYear()} Tienda de Mate - Admin Panel
        </footer>
    );
};

export default Footer;
