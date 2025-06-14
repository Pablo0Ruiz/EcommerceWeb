"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface Intent {
    _id: string
    email: string
    reason: string
    date: string
    ip?: string
}

export default function IntentList() {
    const [intents, setIntents] = useState<Intent[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchIntents = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/auth/admin/intents', {
                method: 'GET',
                credentials: 'include',

            });
            if (response.ok) {
                const data: Intent[] = await response.json();
                setIntents(data);
            }
        } catch (error) {
            // console.error("Error fetching intents:", error)
            toast.error(`${error instanceof Error ? error.message : "Error al cargar los intentos fallidos"}`)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchIntents()
    }, [])

    return (
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <h2 className="text-xl font-bold mb-4 text-red-700">Intentos Fallidos</h2>
            {isLoading && (
                <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></div>
                    <span>Cargando...</span>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Motivo</th>
                            <th className="py-2 px-4 text-left">Fecha</th>
                            <th className="py-2 px-4 text-left">IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {intents.map((intent) => (
                            <tr key={intent._id} className="border-b border-red-100 last:border-0">
                                <td className="py-2 px-4">{intent.email}</td>
                                <td className="py-2 px-4">{intent.reason}</td>
                                <td className="py-2 px-4">{new Date(intent.date).toLocaleString()}</td>
                                <td className="py-2 px-4">{intent.ip || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}