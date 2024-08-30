/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useGetUserByEmailQuery } from "@/redux/api/auth/authApi";

import { setBookingData, TBooking } from "@/redux/features/bookingSlice";
import { useGetAvailableSlotsQuery } from "@/redux/api/slot/slotApi";

const Booking = () => {
  const { id: roomId } = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const user = useAppSelector((state) => state.auth.user);
  const { data: userData } = useGetUserByEmailQuery(user?.email);
  const {
    data: slotData,
    isLoading,
    refetch,
  } = useGetAvailableSlotsQuery(
    {
      date: selectedDate.toISOString().split("T")[0],
      roomId,
    },
    { skip: !selectedDate || !roomId }
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // Refetch slots whenever the selectedDate changes
  useEffect(() => {
    if (selectedDate && roomId) {
      refetch();
    }
  }, [selectedDate, roomId, refetch]);

  const handleSlotSelection = (slotId: any) => {
    setSelectedSlots((prevSlots: any) =>
      prevSlots.includes(slotId)
        ? prevSlots.filter((id: any) => id !== slotId)
        : [...prevSlots, slotId]
    );
  };

  const handleBookingConfirmation = () => {
    const payload: TBooking = {
      date: selectedDate.toISOString().split("T")[0],
      slots: selectedSlots,
      room: roomId as string,
      user: userData?.data?._id,
    };

    dispatch(setBookingData(payload));
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#4a53c0" />
      </div>
    );
  }
  return (
    <div className="container mt-40 md:mt-0 md:mb-12 mx-auto px-4 py-8">
      <h2 className="text-3xl  md:mt-8 mb-8 font-bold text-center tracking-wider">
        {" "}
        Book Your Meeting <span className="text-headerText"> Room</span>
      </h2>

      <div className="border mt-5 border-[#7b82ed] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select Booking Date</h2>
        <DatePicker
          key={selectedDate.toString()}
          selected={selectedDate}
          //@ts-expect-error :'date' is possibly 'null'
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
          className="border border-gray-400 p-2 rounded-lg cursor-pointer"
        />

        <h2 className="text-xl font-semibold mt-6 mb-4">
          Available Time Slots
        </h2>
        {slotData?.data && slotData?.data.length > 0 ? (
          <ul className="list-disc pl-5">
            {slotData?.data.map((slot: any) => (
              <li key={slot._id} className="mb-2">
                <input
                  type="checkbox"
                  id={slot._id}
                  //@ts-expect-error :'slot_id' is string
                  checked={selectedSlots.includes(slot._id)}
                  onChange={() => handleSlotSelection(slot._id)}
                />
                <label htmlFor={slot._id} className="ml-2">
                  {slot.startTime} - {slot.endTime}
                </label>
                {slot.isBooked ? (
                  <span className="text-red-500 ml-4">(Booked)</span>
                ) : (
                  <span className="text-green-500 ml-4">(Available)</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No available slots for this date.</p>
        )}

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

        <div className="mt-6 gap-2 flex justify-between">
          <button
            onClick={handleBookingConfirmation}
            disabled={selectedSlots?.length === 0}
            className={`bg-[#4a53c0] text-white px-6 py-2 rounded-lg text-base md:text-lg font-semibold transition ${
              selectedSlots?.length === 0
                ? "opacity-80 text-gray-500 cursor-not-allowed"
                : ""
            }`}
          >
            Checkout
          </button>
          <Link
            to={`/meetings-rooms/${roomId}`}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-base md:text-lg  font-semibold hover:bg-gray-300 transition"
          >
            Back to Room Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;
