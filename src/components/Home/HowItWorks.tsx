import {
  FaDoorOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaDoorOpen className="text-4xl text-[#4d594d]" />,
    title: "Select a Room",
    description: "Choose the perfect room for your meeting or event.",
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-[#4d594d]" />,
    title: "Choose Date & Time",
    description: "Pick a convenient date and time for your booking.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-[#4d594d]" />,
    title: "Confirm Booking",
    description: "Review and confirm your booking details.",
  },
  {
    icon: <FaMoneyCheckAlt className="text-4xl text-[#4d594d]" />,
    title: "Done with Payment",
    description: "Complete the payment to finalize your booking.",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 md:mt-8  px-12">
      <h2 className="text-3xl  md:mt-6 mb-2 font-bold text-center tracking-wider">
        {" "}
        HOW IT <span className="text-headerText"> WORKS</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex bg-gray-100 p-5 rounded-xl flex-col items-center"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-[#4a53c0]">
              {step.title}
            </h3>
            <p className="text-center text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
