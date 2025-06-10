"use client"

import { useEffect, useState } from "react"

interface User {
    _id: string
    initial: string
    name: string
    role: "user" | "seller"
    email: string
    deletedAt?: string
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
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

const api = {
    restoreUser: async (userId: string) => {
        const response = await fetch(`/api/user/restore/${userId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Error restaurando usuario');
        }
        return await response.json();
    },
    fetchArchivedUsers: async () => {
        const response = await fetch('/api/user/login-attempts', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Error obteniendo usuarios archivados');
        }
        return await response.json();
    }
};

export default function ArchivedUsersList() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false)
    const [userToRestore, setUserToRestore] = useState<string | null>(null)

    const fetchArchivedUsers = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await api.fetchArchivedUsers()
            setUsers(data)
        } catch (error) {
            console.error("Error fetching archived users:", error)
            setError("No se pudieron cargar los usuarios archivados")
            alert("Error al cargar usuarios archivados")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchArchivedUsers()
    }, [])

    const handleRestoreClick = (id: string) => {
        setUserToRestore(id)
        setShowRestoreConfirm(true)
    }

    const confirmRestore = async () => {
        if (!userToRestore) return

        setIsLoading(true)
        try {
            const result = await api.restoreUser(userToRestore)

            if (result) {
                alert("Usuario restaurado correctamente")
                await fetchArchivedUsers() // Refrescar la lista
            }
        } catch (error) {
            console.error("Error restoring user:", error)
            alert("Error al restaurar el usuario")
        } finally {
            setIsLoading(false)
            setShowRestoreConfirm(false)
            setUserToRestore(null)
        }
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-"
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <h2 className="text-xl font-bold mb-4 text-yellow-700">Usuarios Archivados</h2>

            <ConfirmationPopup
                isOpen={showRestoreConfirm}
                onClose={() => {
                    setShowRestoreConfirm(false)
                    setUserToRestore(null)
                }}
                onConfirm={confirmRestore}
                message={`¿Estás seguro de que deseas restaurar este usuario? El usuario volverá a estar activo en el sistema.`}
            />

            {isLoading && (
                <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mr-3"></div>
                    <span>Cargando...</span>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{error}</p>
                    <button
                        onClick={fetchArchivedUsers}
                        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {!isLoading && !error && users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No hay usuarios archivados
                </div>
            )}

            {!isLoading && !error && users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-yellow-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Nombre</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Rol</th>
                                <th className="py-3 px-4 text-left">Archivado el</th>
                                <th className="py-3 px-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-yellow-100 last:border-0 hover:bg-yellow-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-purple-800 font-medium mr-3">
                                                {user.initial}
                                            </div>
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-xs px-2 py-1 rounded-full ${user.role === 'seller'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role === 'seller' ? 'Vendedor' : 'Usuario'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{formatDate(user.deletedAt)}</td>
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                            onClick={() => handleRestoreClick(user._id)}
                                        >
                                            Restaurar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}