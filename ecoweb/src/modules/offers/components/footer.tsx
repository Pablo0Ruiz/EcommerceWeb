
export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-yellow-300 transition">
                                    rellenen con otros datos 
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-yellow-300 transition">
                                    igual
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-yellow-300 transition">
                                    otros
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contacto</h4>
                        <p>contacto@elgauchito.com</p>
                        <p>+54 11 1234-5678</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-6 pt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} El gauchito. Todos los derechos reservados matero</p>
                </div>
            </div>
        </footer>
    );
};