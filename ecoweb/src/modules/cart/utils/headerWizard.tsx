import classNames from "classnames";

const steps = [
  { label: "Mi carrito" },
  { label: "Dirección de envío" },
  { label: "Método de pago" },
  { label: "Resumen" },
];

const HeaderWizardSteps = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="bg-green-600 py-6 px-4 text-white w-full">
      <div className="relative flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Línea de progreso */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-white z-0" />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div
              key={index}
              className="relative z-10 flex-1 flex flex-col items-center text-center"
            >
              <div
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300",
                  {
                    "bg-white text-green-600 border-white": isActive,
                    "bg-green-400 text-white border-green-400": isCompleted,
                    "bg-white text-gray-400 border-white": !isActive && !isCompleted,
                  }
                )}
              >
                {stepNumber}
              </div>
              <span className="text-xs mt-1">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderWizardSteps;