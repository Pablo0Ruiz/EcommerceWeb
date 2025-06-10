
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import UserList from "@/modules/admin/listUser/components/user-list"

export default function AdminDashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-green-800 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full bg-white p-1"
                    />
                    <span className="ml-2 font-semibold">Modo Admin</span>
                </div>
                <div className="flex items-center">
                    <button className="text-white">
                        <span className="mr-2">Mi cuenta</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="flex-1 p-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center mb-6">
                        <Link href="#" className="mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-left"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold">Usuarios</h1>
                    </div>

                    <div className="relative mb-6">
                        <input type="text" placeholder="Buscar" className="pl-4 pr-10 py-2 w-full max-w-md border rounded-md" />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between mb-6 gap-4">
                        <Link href={"/admin/recover"}>
                        <button className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300">
                            Usuarios archivados
                        </button>
                        </Link>
                    </div>

                    <UserList />
                </div>
            </main>
        </div>
    )
}
