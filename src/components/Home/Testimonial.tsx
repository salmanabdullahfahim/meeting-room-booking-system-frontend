import { useState } from "react";

const testimonials = [
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "Elias Hossain",
    role: "UI/IX Designer",
    review:
      "The meeting room was spacious and well-equipped. It made our team meeting productive.",
  },
  {
    image: "https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg",
    name: "Hasanat Abdullah",
    role: "Product Lead",
    review:
      "Excellent facilities and very professional staff. Highly recommend!",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "Yeasin Ali",
    role: "Graphic Designer",
    review:
      "Great atmosphere and amenities. The meeting room exceeded our expectations.",
  },
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "Tahla Siddiqui",
    role: "Software Engineer",
    review:
      "The room was perfect for our needs. Very satisfied with the service.",
  },
  {
    image: "https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg",
    name: "Rashedul Islam",
    role: "Data Analyst",
    review:
      "Comfortable and quiet environment. It was ideal for our meeting and discussions.",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "Jamilul Islam",
    role: "Web Developer",
    review:
      "Top-notch meeting room service. Everything was set up perfectly for our meeting.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="md:px-12 w-full p-4 mt-8 rounded-md md:mb-12">
      <div className="container mx-auto">
        <h2 className="text-3xl  md:mt-6 mb-2 font-bold text-center tracking-wider">
          {" "}
          CUSTOMER <span className="text-headerText"> TESTIMONIALS</span>
        </h2>

        <div className="relative mt-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform ease-out duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials?.map((testimonial, index) => (
                <div key={index} className="min-w-full flex justify-center p-4">
                  <div className="bg-[#6c72c2] rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <p className="text-xl text-white font-medium mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-sm  text-white mb-3">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-200 text-center mb-4">
                      {testimonial.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#6c72c2] text-white rounded-full px-5 py-3"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#6c72c2] text-white rounded-full px-5 py-3"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
