/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMyBookingsQuery } from "@/redux/api/booking/bookingApi";

const MyBooking = () => {
  const { data, isLoading } = useMyBookingsQuery(undefined, {
    pollingInterval: 1000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-40 md:mt-0 py-10">
      <h2 className="text-3xl mb-4 font-medium tracking-widest text-center">
        My Bookings
      </h2>

      <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {data?.data.map((booking: any) => (
          <div key={booking._id} className="rounded-md border-2 w-80">
            <img
              src={booking.room.images[0]}
              alt={booking.room.name}
              className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] duration-200 cursor-pointer"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {booking.room.name}
              </h3>
              <p className="text-gray-600">Room No: {booking.room.roomNo}</p>
              <p className="text-gray-600">Floor No: {booking.room.floorNo}</p>
              <p className="text-gray-600">
                Capacity: {booking.room.capacity} people
              </p>
              <p className="text-gray-600">
                Amenities: {booking.room.amenities.join(", ")}
              </p>
              <p className="text-gray-600 mt-2">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Time:{" "}
                {booking.slots
                  .map((slot: any) => `${slot.startTime} - ${slot.endTime}`)
                  .join(", ")}
              </p>
              <p className={`mt-4 text-lg font-bold`}>
                Status:{" "}
                <span
                  className={`${
                    booking.isConfirmed === "confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.isConfirmed}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
