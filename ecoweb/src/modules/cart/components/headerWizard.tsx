
import React from "react";
import classNames from "classnames";

const steps = [
    { label: "Mi carrito" },
    { label: "Dirección de envío" },
    { label: "Método de pago" },
    { label: "Resumen" }
];

const HeaderWizardSteps = ({ currentStep }: { currentStep: number }) => {
    return (
        <div className="bg-green-600 py-4 px-2 md:px-6 text-white">
            <div className="flex justify-between items-center max-w-5xl mx-auto">
                {steps.map((step, index) => {
                    const isActive = currentStep === index + 1;
                    const isCompleted = currentStep > index + 1;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center text-center relative">
                            <div
                                className={classNames(
                                    "w-8 h-8 rounded-full flex items-center justify-center font-bold z-10",
                                    {
                                        "bg-white text-green-600 border-2 border-white": isActive,
                                        "bg-white text-gray-400": !isActive && !isCompleted,
                                        "bg-green-400 text-white": isCompleted,
                                    }
                                )}
                            >
                                {index + 1}
                            </div>
                            <span className="text-xs mt-1">{step.label}</span>

                            {index !== steps.length - 1 && (
                                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-white z-0 transform translate-x-1/2" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeaderWizardSteps;
