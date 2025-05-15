

const CheckoutSteps = ({ currentStep = 1 }: { currentStep: number }) => {
    const steps = ['Carrito', 'Envio', 'Pago'];

    return (
        <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => (
                <div key={step} className="flex-1 text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold ${currentStep > index ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                        {index + 1}
                    </div>
                    <p className={`mt-2 text-sm ${currentStep > index ? 'text-green-700 font-medium' : 'text-gray-500'}`}>{step}</p>
                </div>
            ))}
        </div>
    );
};

export default CheckoutSteps;
