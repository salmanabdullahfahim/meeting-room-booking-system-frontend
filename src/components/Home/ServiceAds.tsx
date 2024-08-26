import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSupportAgent, MdOutlineAccessTime } from "react-icons/md";
import { SiEasyeda } from "react-icons/si";

import Container from "../../utils/Container/Container";

// Define the TypeScript interface for the item prop
interface Item {
  icon: React.ElementType;
  title: string;
  desc?: string;
}

const incentives: Item[] = [
  {
    icon: MdOutlineAccessTime,
    title: "Real-Time Availability",
  },
  {
    icon: FaShippingFast,
    title: "Instant Booking Confirmations",
  },

  {
    icon: SiEasyeda,
    title: "Flexible Scheduling",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "24/7 Support",
  },
];

const IncentiveItem: React.FC<{ item: Item }> = ({ item }) => (
  <div className="bg-white  shadow-xl rounded-lg">
    <div className="p-6 md:p-12 min-h-60 w-64">
      <div className="text-6xl text-gray-700 flex justify-center items-center">
        <item.icon />
      </div>
      <h3 className="my-4 text-xl font-medium text-center">{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  </div>
);

const ServiceAdds: React.FC = () => {
  return (
    <section className="ezy__epincentives3 light py-14 md:py-6 bg-white  text-black  relative overflow-hidden z-10 ">
      <Container>
        <div className="container px-4 mx-auto">
          <div className="flex max-w-3xl justify-center text-center mx-auto">
            <div>
              <h2 className="text-3xl mb-10 font-bold text-center">
                {" "}
                WE ARE COMMITTED TO GIVE YOU
                <span className="text-headerText"> THE BEST</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-x-7 gap-y-3">
            {incentives.map((item, i) => (
              <div key={i}>
                <IncentiveItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceAdds;
