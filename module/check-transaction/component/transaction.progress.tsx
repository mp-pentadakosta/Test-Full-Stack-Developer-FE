import {FaCheck, FaCog, FaCreditCard, FaShoppingBag} from "react-icons/fa";

const steps = [
  {
    title: "Create Transaction",
    description: "Successfully created transaction",
    icon: FaShoppingBag,
  },
  {
    title: "Payment",
    description: "Make payment using the selected payment method.",
    icon: FaCreditCard,
  },
  {
    title: "In Progress",
    description: "Transaction is being processed.",
    icon: FaCog,
  },
  {
    title: "Transaction Success",
    description: "Transaction completed successfully.",
    icon: FaCheck,
  },
];

export const TransactionProgress = ({
  activeStep = 0,
}: {
  activeStep: number;
}) => {
  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-white text-lg font-semibold mb-6">
        Transaction Progress
      </h2>

      <div className="flex justify-between items-start relative">
        <div className="absolute top-5 left-5 right-5 h-[2px] bg-gray-700 z-0" />

        {steps.map((step, index) => {
          const isActive = index <= activeStep;
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center z-10 w-1/4"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${isActive ? "bg-green-500 text-white" : "bg-gray-800 text-gray-500"}`}
              >
                <Icon size={20} />
              </div>
              <div
                className={`font-semibold ${isActive ? "text-green-500" : "text-gray-400"}`}
              >
                {step.title}
              </div>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
