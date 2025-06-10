"use client"

import { useEffect, useState } from "react"

interface User {
    _id: string
    initial: string
    name: string
    role: "user" | "seller"
    hasEmail?: boolean
}

const ConfirmationPopup = ({
    isOpen,
    onClose,
    onConfirm,
    message
}: {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    message: string
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-medium mb-4">Confirmación</h3>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

const RoleSelectionPopup = ({
    isOpen,
    onClose,
    onRoleChange,
    currentRole
}: {
    isOpen: boolean
    onClose: () => void
    onRoleChange: (newRole: "user" | "seller") => void
    currentRole: "user" | "seller"
}) => {
    const [selectedRole, setSelectedRole] = useState<"user" | "seller">(currentRole);

    useEffect(() => {
        setSelectedRole(currentRole);
    }, [currentRole]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-medium mb-4">Cambiar Rol</h3>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="userRole"
                            name="role"
                            checked={selectedRole === "user"}
                            onChange={() => setSelectedRole("user")}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="userRole" className="ml-2 block text-sm text-gray-700">
                            Usuario
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="sellerRole"
                            name="role"
                            checked={selectedRole === "seller"}
                            onChange={() => setSelectedRole("seller")}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="sellerRole" className="ml-2 block text-sm text-gray-700">
                            Seller
                        </label>
                    </div>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onRoleChange(selectedRole)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        disabled={selectedRole === currentRole}
                    >
                        Cambiar Rol
                    </button>
                </div>
            </div>
        </div>
    );
};


const api = {
    updateUserRole: async (userId: string, newRole: "user" | "seller") => {
        const response = await fetch(`/api/auth/user/role`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, newRole }),
        });
        if (!response.ok) {
            throw new Error('Error actualizando rol');
        }
        return await response.json();
    },
    deleteUser: async (userId: string) => {
        const response = await fetch(`/api/auth/delete/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Error eliminando usuario');
        }
        return await response.json();
    }
};

export default function UserList() {
    const [users, setUsers] = useState<User[]>([])

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [userToDelete, setUserToDelete] = useState<string | null>(null)
    const [showRoleSelection, setShowRoleSelection] = useState(false)
    const [userToUpdate, setUserToUpdate] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteClick = (id: string) => {
        setUserToDelete(id)
        setShowDeleteConfirm(true)
    }
    const userFetch = async () => {
        const response = await fetch('/api/auth/admin', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const data: User[] = await response.json();
            setUsers(data);
        }
    }
    useEffect(() => {
        userFetch()
    }, [])

    const confirmDelete = async () => {
        if (!userToDelete) return

        setIsLoading(true)
        try {
            const result = await api.deleteUser(userToDelete)

            if (result.success) {
                setUsers(users.filter((user) => user._id !== userToDelete))
            }
        } catch (error) {
            console.error("Error deleting user:", error)
        } finally {
            setIsLoading(false)
            setShowDeleteConfirm(false)
            setUserToDelete(null)
        }
    }

    const handleRoleClick = (user: User) => {
        setUserToUpdate(user)
        setShowRoleSelection(true)
    }

    const confirmRoleChange = async (newRole: "user" | "seller") => {
    if (!userToUpdate) return

    setIsLoading(true)
    try {

        const result = await api.updateUserRole(userToUpdate._id, newRole)

        if (result.success) {
            await userFetch(); 
        }
    } catch (error) {
        console.error("Error updating user role:", error)
    } finally {
        setIsLoading(false)
        setShowRoleSelection(false)
        setUserToUpdate(null)
    }
}

    return (
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">

            <ConfirmationPopup
                isOpen={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false)
                    setUserToDelete(null)
                }}
                onConfirm={confirmDelete}
                message={`¿Estás seguro de que deseas eliminar al usuario ${userToDelete}? Esta acción no se puede deshacer.`}
            />


            {userToUpdate && (
                <RoleSelectionPopup
                    isOpen={showRoleSelection}
                    onClose={() => {
                        setShowRoleSelection(false)
                        setUserToUpdate(null)
                    }}
                    onRoleChange={confirmRoleChange}
                    currentRole={userToUpdate.role}
                />
            )}

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mr-3"></div>
                            <span>Procesando...</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-green-100 last:border-0">
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
                                    <button
                                        className="mr-2 bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1 rounded"
                                        onClick={() => handleRoleClick(user)}
                                    >
                                        Cambiar Rol
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white border-0 px-3 py-1 rounded"
                                        onClick={() => handleDeleteClick(user._id)}
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