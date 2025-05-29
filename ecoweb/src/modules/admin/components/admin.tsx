import React from "react";
import Header from "./headers";
import Main from "./main";
import Footer from "./footer";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main>
                <h2 className="text-2xl font-semibold mb-4">Bienvenido al Panel de Administración</h2>
                <p>Acá vas a poder gestionar usuarios, roles y productos de tu tienda de mate.</p>
            </Main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
