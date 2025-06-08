
import React from "react";
import Header from "@/modules/admin/components/headers";
import Main from "@/modules/admin/components/main";
import Footer from "@/modules/admin/components/footer";
import bgAdmin from "@/../public/bgAdmin.jpg";
import TrapezoidButton from "@/modules/admin/components/button";
import Image from "next/image";



export default function Seller() {
    return(
        <div className="relative flex flex-col min-h-screen">
            <div className="fixed inset-0 -z-10">
                <Image
                    src={bgAdmin}
                    alt="Background administrativo"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                    style={{ objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-[#D9D9D9] opacity-60" />
            </div>

            <Header />

            <Main className="flex-1">
                <div className="relative z-10 p-6 max-w-10xl mx-auto">
                    <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                            Bienvenido al Panel de Seller
                        </h2>
                        <p>
                            Acá vas a poder gestionar tus productos
                        </p>
                    </div>

                    <div className="flex justify-center gap-10 mt-20 w-full px-4">
                        <TrapezoidButton
                            text="Crear producto"
                            color="#A4835F"
                            href="/admin/product"
                        />
                    </div>
                </div>
            </Main>

            <Footer />
        </div>
    );
}