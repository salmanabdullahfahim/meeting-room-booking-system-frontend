import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-18 xl:col-span-6">
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Book Your Ideal Meeting Room with Ease.
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Efficient, hassle-free room booking for all your meeting needs.
          </p>

          <div className="mt-8 flex items-start space-x-2">
            <Link
              to="/meetings-rooms"
              className="rounded-md bg-[#4a53c0] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4a53c0]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Book Now
            </Link>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            className="aspect-[3/2] object-cover lg:aspect-[6/8] lg:h-[600px] xl:aspect-[16/9]"
            src="/meetingHero.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
