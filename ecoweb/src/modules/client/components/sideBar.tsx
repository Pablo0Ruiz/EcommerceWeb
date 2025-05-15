

export const Sidebar = () => {
    return (
        <nav  className="space-y-6">
            <h2 className="text-xl font-semibold">Perfil</h2>
            <ul className="space-y-2">
                <li className="text-black hover:text-blue-600 cursor-pointer">Mi cuenta</li>
                <li className="text-black hover:text-blue-600 cursor-pointer">Ordenes</li>
                <li className="text-black hover:text-blue-600 cursor-pointer">Lista de compras</li>
                <li className="text-black hover:text-blue-600 cursor-pointer">Configuracion</li>
            </ul>
        </nav>
    )
}