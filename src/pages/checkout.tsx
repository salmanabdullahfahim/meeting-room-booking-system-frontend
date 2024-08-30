/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppSelector } from "@/redux/hooks";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";

import { IoIosTime } from "react-icons/io";
import { BsFillCalendar2DateFill } from "react-icons/bs";

import { useAddBookingsMutation } from "@/redux/api/booking/bookingApi";
import { useGetUserByEmailQuery } from "@/redux/api/auth/authApi";
import { useGetSingleRoomQuery } from "@/redux/api/room/roomApi";

import { useGetAvailableSlotsQuery } from "@/redux/api/slot/slotApi";

type Slot = {
  startTime: string;
  endTime: string;
};

const Checkout = () => {
  const bookedData = useAppSelector((state) => state.booking);

  const [addBookings] = useAddBookingsMutation();

  const user = useAppSelector((state) => state.auth.user);
  const { data: userData } = useGetUserByEmailQuery(user?.email);

  const roomId = bookedData?.bookingData?.room;

  const { data: singleRoom, isLoading } = useGetSingleRoomQuery(roomId, {
    pollingInterval: 1000,
  });

  //  available slots
  const { data: slotData, isLoading: isSlotLoading } =
    useGetAvailableSlotsQuery({
      date: bookedData?.bookingData?.date,
      roomId,
    });

  if (isSlotLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#4a53c0" />
      </div>
    );
  }

  // Filter and map the data
  const availableSlots = slotData?.data.filter((room: any) => !room.isBooked);

  const bookedSlots = availableSlots
    ?.filter((slot: any) => bookedData?.bookingData?.slots?.includes(slot._id))
    .map((slot: any) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

  const handleConfirmBooking = async () => {
    try {
      const data = bookedData?.bookingData;

      const res = await addBookings(data).unwrap();

      if (res?.success) {
        // setOpenDialog(true);
        window.location.href = res.data.payment_url;
      }
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Booking failed:", error);
    }
  };

  // Calculate the total cost
  const totalCost =
    // @ts-expect-error: Unreachable code error
    bookedData?.bookingData?.slots?.length *
    (singleRoom?.data.pricePerSlot || 0);

  return (
    <div className="container mx-auto mt-40 md:mt-0 md:mb-12 px-4 py-8">
      {bookedData?.bookingData ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl  md:mt-4 mb-12 font-bold text-center tracking-wider">
            {" "}
            Booking <span className="text-headerText"> Summary</span>
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <img
                src={singleRoom?.data.images[0]}
                alt={singleRoom?.data.name}
                className="w-ful h-full md:w-8/12 md:h-[500px] rounded-lg mb-4"
              />

              <div className="flex items-center gap-4">
                <p className="font-medium text-[#4a53c0]">
                  <>{singleRoom?.data.name}</>
                </p>
                <p className="flex items-center gap-2">
                  <BsFillCalendar2DateFill className="text-xl text-[#4a53c0]" />{" "}
                  {bookedData?.bookingData?.date}
                </p>
              </div>
              <p className="flex items-center gap-2">
                <IoIosTime className="text-2xl text-[#4a53c0]" /> <h2>Time:</h2>{" "}
                {bookedSlots?.map((slot: Slot, index: number) => (
                  <span key={index}>
                    {slot.startTime} - {slot.endTime}
                    {index < bookedSlots?.length - 1 ? " & " : ""}
                  </span>
                ))}
              </p>

              <p className="font-medium mt-3 mb-2 flex items-center gap-2 text-[#455e45]">
                <FaRegMoneyBillAlt className="text-2xl text-[#4a53c0]" />
                Per Slot: ${singleRoom?.data.pricePerSlot}
              </p>
              <p className="font-medium flex items-center gap-2 text-[#4a53c0]">
                <FaRegMoneyBillAlt className="text-2xl text-[#4a53c0]" />
                Total Cost: ${totalCost}
              </p>
            </div>
          )}

          {/* user infomation */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Your Details</h2>
          {userData ? (
            <div className="bg-[#efeff3] p-4 rounded-lg">
              <p>
                <strong>Name:</strong> {userData.data.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.data.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.data.phone}
              </p>
              <p>
                <strong>Address:</strong> {userData.data.address}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">User information not available.</p>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleConfirmBooking}
              className="bg-[#4a53c0] mt-5 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#5761ca] transition "
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <h2 className="text-3xl mt-5 mb-2 font-medium tracking-wider text-center">
          There is no booking history
        </h2>
      )}
    </div>
  );
};

export default Checkout;
