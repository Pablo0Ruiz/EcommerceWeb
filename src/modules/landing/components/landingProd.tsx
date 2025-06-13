const ProductList = () => {
    return (
        <section id="productos" className="relative py-16 px-4 overflow-hidden">
            {/* Fondo blanco translúcido */}
            <div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
                    🎁 Kits materos perfectos para regalar… o para regalarte
                </h2>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
                    🎁Amplia variedad de marcas para acompañarte en los mejores momentos
                </h2>
            </div>
        </section>
    );
};

export default ProductList;
