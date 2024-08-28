/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { FaRegMoneyBillAlt } from "react-icons/fa";

import { IoIosTime } from "react-icons/io";
import { BsFillCalendar2DateFill } from "react-icons/bs";

import { useState } from "react";
import {
  useAddBookingsMutation,
  useGetAvailableSlotsQuery,
} from "@/redux/api/booking/bookingApi";
import { useGetUserByEmailQuery } from "@/redux/api/auth/authApi";
import { useGetSingleRoomQuery } from "@/redux/api/room/roomApi";
import { clearBookingData } from "@/redux/features/bookingSlice";

type Slot = {
  startTime: string;
  endTime: string;
};

const Checkout = () => {
  const bookedData = useAppSelector((state) => state.booking);
  const [openDialog, setOpenDialog] = useState(false);
  const [addBookings] = useAddBookingsMutation();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const { data: userData } = useGetUserByEmailQuery(user?.email);

  const roomId = bookedData?.bookingData?.room;

  const { data: singleRoom, isLoading } = useGetSingleRoomQuery(roomId, {
    pollingInterval: 1000,
  });
  console.log("single room inside checkout", singleRoom);

  //  available slots
  const { data: slotData, isLoading: isSlotLoading } =
    useGetAvailableSlotsQuery({
      date: bookedData?.bookingData?.date,
      roomId,
    });

  console.log("slotdata", slotData);

  if (isSlotLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4a53c0]"></div>
      </div>
    );
  }

  // Filter and map the data
  const availableSlots = slotData?.data.filter((room: any) => !room.isBooked);
  console.log(availableSlots);

  const bookedSlots = availableSlots
    ?.filter((slot: any) => bookedData?.bookingData?.slots?.includes(slot._id))
    .map((slot: any) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

  console.log(bookedData?.bookingData?.date, bookedSlots, bookedData);

  const bookingDate = bookedData?.bookingData?.date || "";

  const handleConfirmBooking = async () => {
    try {
      // console.log(bookedData);
      const data = bookedData?.bookingData;

      console.log(data);

      const res = await addBookings(data).unwrap();
      console.log(res);

      if (res?.success) {
        setOpenDialog(true);
      }
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Booking failed:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(clearBookingData());
  };

  // Calculate the total cost
  const totalCost =
    // @ts-expect-error: Unreachable code error
    bookedData?.bookingData?.slots?.length *
    (singleRoom?.data.pricePerSlot || 0);

  return (
    <div className="container mx-auto mt-40 md:mt-0 px-4 py-8">
      {bookedData?.bookingData ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
            Booking Summary
          </h2>
          {/* underline */}
          <div className="flex mb-7  justify-center">
            <div className="w-20 text-center rounded-md  h-[5px] bg-[#7b82ed]"></div>
          </div>
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

          <div className="bg-[#efeff3] md:w-2/12 p-2  mt-5 rounded-lg mb-4">
            <p>
              <strong>Payment Method:</strong>
            </p>
            <select className="border mt-2 p-2 rounded-lg w-full">
              <option value="cod">Cash on Delivery</option>
              <option value="aamarpay">Aamar Pay</option>
            </select>
          </div>

          {/* user infrmation */}
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
              Confirm Booking
            </button>
          </div>
        </div>
      ) : (
        <h2 className="text-3xl mt-5 mb-2 font-medium tracking-wider text-center">
          There is no booking history
        </h2>
      )}

      {/* Shadcn UI Dialog */}
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        {/* <DialogTitle>Booking Confirmation</DialogTitle> */}
        <DialogContent>
          <p>
            "Your slot{bookedSlots?.length > 1 ? "s" : ""} for
            {singleRoom?.data.name} on {bookingDate} at
            {bookedSlots.map((slot: Slot, index: number) => (
              <span key={index}>
                {slot.startTime} - {slot.endTime}
                {index < bookedSlots?.length - 1 ? ", " : ""}
              </span>
            ))}
            has been successfully booked. Thank you for choosing us!"
            <br />
            <button
              className="px-3 mt-1 bg-[#4a53c0] text-white py-1 rounded-2xl "
              onClick={handleCloseDialog}
            >
              Close
            </button>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
