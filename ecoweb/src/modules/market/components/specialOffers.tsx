
// import  OfferCard from "./marketCard";
// import { Product } from "@/modules/product/typesProduct";
// import Link from "next/link";
// import { Header } from "./header";
// import { Footer } from "./footer";

// // const market: Product[] = [
// //     {
// //         id: "1",
// //         imagenUrl: "/vercel.svg",
// //         nombre: "Vercel Hosting",
// //         descripcion: "Campaña especial de hosting para tus proyectos web",
// //         precio: 92,
// //         tipoEntrega: "domicilio",
// //         stock: 2,
// //     },
// //     {
// //         id: "2",
// //         imagenUrl: "/window.svg",
// //         nombre: "Windows License",
// //         descripcion: "Licencia original de Windows para tu computadora",
// //         precio: 44,
// //         tipoEntrega: "tienda",
// //         stock: 4,
// //     },
// // ];

// export default function SpecialmarketPage() {
//     return (
//         <div className="min-h-screen flex flex-col">
//             <Header />

//             <main className="flex-grow container mx-auto p-4">
//                 <div className="flex items-center justify-between mb-6">
//                     <h1 className="text-3xl font-bold">Ofertas Especiales</h1>
//                     <Link href="/" className="text-blue-600 hover:underline">
//                         Volver al inicio
//                     </Link>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {market.map((market) => (
//                         <OfferCard key={market.id} producto={market} />
//                     ))}
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// }