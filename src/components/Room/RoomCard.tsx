import { TRoom } from "@/utils/Types/RoomType";

import { Link } from "react-router-dom";

export function RoomCard({ room }: { room: TRoom }) {
  return (
    <div className="rounded-md border">
      <img
        src={room.images[0]}
        alt={room.name}
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] hover:scale-110 duration-200 cursor-pointer"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {room.name}{" "}
        </h1>

        <div className="mt-5 flex items-center justify-between space-x-2">
          <div className="flex gap-x-2 items-center">
            <span className="block text-sm font-semibold">
              Price Per Slot :{" "}
            </span>
            <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
              ${room.pricePerSlot}
            </span>
          </div>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            Capacity: {room.capacity}
          </span>
        </div>

        <Link to={`/meetings-rooms/${room._id}`}>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
}
