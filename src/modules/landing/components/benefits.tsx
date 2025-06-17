import { benefits } from "../utils/icons";

const Benefits = () => {
    return (
        <section id="porque" className="py-16 bg-white px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10">
                    ¿Por qué elegir Matezon?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition">
                            <div className="flex items-center justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-green-700 mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Benefits