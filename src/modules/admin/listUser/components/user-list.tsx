"use client"

import { useState } from "react"

interface User {
    id: number
    initial: string
    name: string
    role: string
    hasEmail?: boolean
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, initial: "A", name: "Usuario 1", role: "User" },
        { id: 2, initial: "A", name: "List item", role: "Seller" },
        { id: 3, initial: "A", name: "List item", role: "User", hasEmail: true },
        { id: 4, initial: "A", name: "List item", role: "User" },
        { id: 5, initial: "A", name: "List item", role: "User" },
        { id: 6, initial: "A", name: "List item", role: "User" },
        { id: 7, initial: "A", name: "List item", role: "User" },
        { id: 8, initial: "A", name: "List item", role: "User" },
        { id: 9, initial: "A", name: "List item", role: "User" },
        { id: 10, initial: "A", name: "List item", role: "User", hasEmail: true },
        { id: 11, initial: "A", name: "List item", role: "User", hasEmail: true },
        { id: 12, initial: "A", name: "List item", role: "User", hasEmail: true },
    ])

    const handleDelete = (id: number) => {
        setUsers(users.filter((user) => user.id !== id))
    }

    return (
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-green-100 last:border-0">
                                <td className="py-3 pl-4 pr-2 w-10">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-purple-800 font-medium">
                                        {user.initial}
                                    </div>
                                </td>
                                <td className="py-3 px-2">
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.role}</div>
                                </td>
                                <td className="py-3 px-2 text-right">
                                    {user.hasEmail && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-mail inline-block text-gray-400"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    )}
                                </td>
                                <td className="py-3 px-2 text-right">
                                    <button className="mr-2 bg-green-500 hover:bg-green-600 text-white border-0">
                                        Rol
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white border-0"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
