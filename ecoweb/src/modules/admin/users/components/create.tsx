'use client'

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from '../../components/headers'
import Main from '../../components/main';
import Footer from '../../components/footer';

type FormData = {
    name: string;
    email: string;
    role: "admin" | "user" | "seller";
};

export default function CreateUserPage() {
    const { register, handleSubmit } = useForm<FormData>();
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        router.push("/admin/users");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main>
                <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                    <input
                        type="text"
                        placeholder="Nombre"
                        {...register("name")}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full p-2 border rounded"
                    />
                    <select {...register("role")} className="w-full p-2 border rounded">
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="bg-green-700 text-black px-4 py-2 rounded">
                        Crear Usuario
                    </button>
                </form>
            </Main>
            <Footer />
        </div>
    );
}
