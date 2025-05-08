const testimonials = [
    {
        name: 'Lucía G.',
        comment: 'El kit llegó rapidísimo y es hermoso. ¡Amo el mate de calabaza!',
    },
    {
        name: 'Diego M.',
        comment: 'Muy buena atención, me ayudaron a elegir el regalo perfecto.',
    },
    {
        name: 'Sofía R.',
        comment: 'Productos de calidad, se nota que están hechos con amor.',
    },
];

const Testimonials = () => {
    return (
        <section id="testimonios" className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10">
                    Lo que dicen nuestros clientes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-green-50 rounded-lg p-6 shadow hover:shadow-md transition">
                            <p className="text-gray-700 italic mb-4">“{testimonial.comment}”</p>
                            <p className="font-semibold text-green-800">— {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;