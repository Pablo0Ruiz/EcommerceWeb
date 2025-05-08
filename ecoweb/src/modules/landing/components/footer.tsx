import {Facebook,Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                
                <div>
                    <h3 className="text-xl font-bold mb-3">Matezon</h3>
                    <p>El sabor de nuestras tierras en cada sorbo. Distribuimos mates, bombillas y kits artesanales en todo el país.</p>
                </div>

                
                <div>
                    <h4 className="font-semibold mb-2">Secciones</h4>
                    <ul className="space-y-1">
                        <li><a href="#porque" className="hover:underline">Beneficios</a></li>
                        <li><a href="#productos" className="hover:underline">Productos</a></li>
                        <li><a href="#testimonios" className="hover:underline">Testimonios</a></li>
                    </ul>
                </div>

                
                <div>
                    <h4 className="font-semibold mb-2">Contacto</h4>
                    <div className="flex justify-center md:justify-start space-x-4 mt-2">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <Instagram className="w-5 h-5 hover:text-green-300" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <Facebook className="w-5 h-5 hover:text-green-300" />
                        </a>
                        <a href="mailto:contacto@matezon.com">
                            <Mail className="w-5 h-5 hover:text-green-300" />
                        </a>
                    </div>
                </div>
            </div>

            <p className="text-center text-sm text-gray-300 mt-10">&copy; {new Date().getFullYear()} Matezon. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
