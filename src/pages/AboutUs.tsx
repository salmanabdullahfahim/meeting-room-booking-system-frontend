/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaAward, FaGraduationCap } from "react-icons/fa";
import PropTypes from "prop-types";
import Teams from "../components/Teams/Teams";

const stories = [
  {
    icon: FaAward,
    title: "Top Rank On All over the Country",
  },
  {
    icon: FaGraduationCap,
    title: "2000+ 5 star Review",
  },
];

// @ts-ignore

const StoryItem = ({ item }) => {
  const { title, icon: Icon } = item;
  return (
    <div className="flex items-center justify-center md:justify-start">
      <Icon className="text-5xl text-gray-700 mr-4" />
      <h6 className="font-bold">{title}</h6>
    </div>
  );
};

// @ts-ignore
StoryItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const ShapeOne = () => (
  <>
    <svg
      className="absolute -top-[10%] -left-[10%] -z-[1] text-gray-50 "
      width="499"
      height="499"
      viewBox="0 0 600 600"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="249.5"
        cy="249.5"
        r="249.5"
        fill="currentColor"
        fillOpacity="1"
      />
    </svg>
    <img
      src="/logo.png"
      alt=""
      className="h-80 w-80 ml-6"
      data-aos="fade-right"
      data-aos-duration="1500"
    />
  </>
);

const ShapeTwo = () => (
  <svg
    className="absolute top-[75%] right-[0 -z-[1] text-gray-50 "
    width="134"
    height="133"
    viewBox="0 0 134 133"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M66.9999 133C104.003 133 134 103.227 134 66.5C134 29.773 104.003 0 66.9999 0C29.9968 0 0 29.773 0 66.5C0 103.227 29.9968 133 66.9999 133Z"
      fill="currentColor"
      fillOpacity="1"
    />
  </svg>
);

const ShapeThree = () => (
  <svg
    className="absolute top-[15%] right-[10%] -z-[1] text-gray-50 "
    width="223"
    height="262"
    viewBox="0 0 223 262"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M212.555 100.254C224.477 169.763 239.522 246.47 170.132 258.373C100.741 270.275 36.3657 251.51 24.443 182C12.5203 112.491 -30.8157 14.839 38.5748 2.93669C107.965 -8.96565 200.632 30.7447 212.555 100.254Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

const ShapeFour = () => (
  <svg
    className="absolute bottom-[22%] right-[15%] -z-[1] text-gray-50 "
    width="155"
    height="166"
    viewBox="0 0 155 166"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M141.003 54.264C153.758 98.3055 169.054 146.771 125.088 159.504C81.1214 172.237 38.1659 164.793 25.4108 120.751C12.6556 76.7097 -22.4405 16.769 21.5258 4.03561C65.4921 -8.69781 128.248 10.2226 141.003 54.264Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

const AboutUs: React.FC = () => {
  return (
    <section className="ezy__about17 light pt-14 md:pt-16 pb-14 lg:pb-8 bg-white  text-zinc-900  relative overflow-hidden z-[1]">
      <ShapeThree />
      <ShapeFour />

      <div className="container px-4">
        <div className="grid grid-cols-12 justify-between">
          <div className="col-span-12 md:col-span-5">
            <div className="relative">
              <ShapeOne />
              <ShapeTwo />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:mr-4">
            <div data-aos="fade-left" data-aos-duration="1700">
              <h2 className="text-2xl leading-tight font-bold md:text-3xl mt-4">
                T. <span className="text-headerText">Meeting's</span> Story
              </h2>
              <p className="text-base sm:text-lg md:text-[18px] leading-relaxed opacity-80 my-6 mt-4 lg:pr-12">
                At T. Meetings, we believe that every meeting deserves to be
                seamless, efficient, and productive. Our meeting booking
                platform is designed to simplify the scheduling process, whether
                you're organizing a quick catch-up, a team brainstorm, or a
                client presentation. With a focus on user-friendly design,
                advanced features, and exceptional reliability, our platform
                ensures that your meetings run smoothly from start to finish.
                Join countless satisfied users who have streamlined their
                scheduling with us, and experience the difference that [Your
                Company Name] can make in your productivity.
              </p>

              <div className="grid grid-cols-12 gap-8 mt-10">
                {stories.map((item, i) => (
                  <div className="col-span-12 sm:col-span-6" key={i}>
                    <StoryItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Teams />
      </div>
    </section>
  );
};

export default AboutUs;
