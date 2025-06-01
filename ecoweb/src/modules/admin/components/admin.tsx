"use server";
import React from "react";
import Header from "../components/headers";
import Main from "../components/main";
import Footer from "../components/footer";
import Image from "next/image";
import bgAdmin from "@/../public/bgAdmin.jpg";
import TrapezoidButton from "./button";

const AdminDashboard = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Fondo completo que ocupa toda la pantalla */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bgAdmin}
          alt="Background administrativo"
          fill
          className="object-cover"
          quality={100}
          priority
          style={{
            objectPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[#D9D9D9] opacity-60" />
      </div>

      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <Main className="flex-1">
        <div className="relative z-10 p-6 max-w-10xl mx-auto">
          <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Bienvenido al Panel de Administración
            </h2>
            <p>
              Acá vas a poder gestionar usuarios, roles y productos de tu tienda
              de mate.
            </p>
          </div>
          {/* Contenedor de botones trapezoidales */}
          <div className="flex justify-center gap-37 mt-80 w-full px-4">
            <TrapezoidButton
              text="Añadir usuarios"
              color="#A4835F"
              href="/admin/add-users"
            />

            <TrapezoidButton
              text="Borrar/Editar usuarios"
              color="#848097"
              href="/admin/edit-users"
            />

            <TrapezoidButton
              text="Acceso catálogo"
              color="#6A6972"
              href="/admin/catalog"
            />
          </div>
        </div>
      </Main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;