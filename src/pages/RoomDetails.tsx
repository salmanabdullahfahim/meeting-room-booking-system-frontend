import { useGetSingleRoomQuery } from "@/redux/api/room/roomApi";
import { Link, useParams } from "react-router-dom";

export function RoomDetails() {
  const { id } = useParams();

  const { data } = useGetSingleRoomQuery(id as string);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link to="/">Home</Link>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link to="/meetings-rooms" className="capitalize">
                Meeting Rooms
              </Link>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="#">
                {data?.data.name}
              </a>
            </li>
          </ol>
        </div>
      </div>
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {data?.data.images.map((image: string, i: number) => (
            <div
              key={i}
              className="col-span-1 transition duration-150 ease-in hover:opacity-90"
            >
              <img
                src={image} // Assuming your image URLs are in the 'url' field of each image object
                alt={`Image ${i}`}
                className="w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {data?.data.name}
            </h2>

            <div className="mt-5 flex items-center ">
              <div className="text-xl pr-2 text-gray-600 font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-lg 2xl:pr-0 2xl:text-4xl">
                Price Per Slot: ${data?.data.pricePerSlot}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-3  ">
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Meeting Room Details
              </h3>
              <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7 flex justify-between items-center">
                <p>Room No: {data?.data.roomNo}</p>
                <p>Floor No: {data?.data.floorNo}</p>
                <p>Capacity: {data?.data.capacity}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Amenities
              </h3>
              <ul className="colors -mr-3 flex items-center gap-x-4">
                {data?.data.amenities.map((text: string) => (
                  <li
                    key={text}
                    className="cursor-pointer rounded  p-1 text-sm font-semibold  transition duration-200 ease-in-out border border-gray-300 bg-gray-50 w-24 h-9 flex justify-center items-center"
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2  py-8  md:pr-32 lg:pr-12 2xl:pr-32">
            <Link
              to={`/booking/${id}`}
              className="h-11 w-full rounded-md bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
