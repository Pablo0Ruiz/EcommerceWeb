import React from "react";
import Header from "./headers";
import Main from "./main";
import Footer from "./footer";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenido al Panel de Administración
        </h2>
        <p className="mb-8">
          Acá vas a poder gestionar usuarios, roles y productos de tu tienda de
          mate.
        </p>

        {/* Botones alineados horizontalmente */}
        <div className="flex justify-center gap-8 mb-8">
          {/* Botón 1 */}
          <button
            className="box-border border-2 border-black bg-[#A4835F] flex items-center justify-center"
            style={{
              width: "395px",
              height: "131.5px",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "60px",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            Añadir usuarios
          </button>

          {/* Botón 2 */}
          <button
            className="box-border border-2 border-black bg-[#848097] flex items-center justify-center"
            style={{
              width: "397px",
              height: "145px",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "60px",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            Editar usuarios
          </button>

          {/* Botón 3 */}
          <button
            className="box-border border-2 border-black bg-[#6A6972] flex items-center justify-center"
            style={{
              width: "395px",
              height: "131.5px",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "60px",
              color: "rgba(255, 255, 255, 0.75)",
            }
        }
            
          >
            Catálogo
          </button>
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
