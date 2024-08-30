/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import swal from "sweetalert";

import { ImCheckboxChecked } from "react-icons/im";

import { TiDelete } from "react-icons/ti";
import { MdAutoDelete } from "react-icons/md";
import {
  useDeleteBookingsMutation,
  useGetAllBookingsQuery,
  useUpdateBookingsMutation,
} from "@/redux/api/booking/bookingApi";
import toast from "react-hot-toast";

const AllBookings = () => {
  const { data: allBookings, isLoading } = useGetAllBookingsQuery(undefined, {
    pollingInterval: 1000,
  });

  const [deleteBooking] = useDeleteBookingsMutation();
  const [updateBooking] = useUpdateBookingsMutation();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  const handleApprove = async (bookingId: string) => {
    const data = {
      data: {
        isConfirmed: "confirmed",
        paymentStatus: "Paid",
      },
      bId: bookingId,
    };

    try {
      await updateBooking(data).unwrap();
      toast.success("Booking approved successfully");
    } catch (err) {
      toast.error("Failed to approve booking");
      console.log(err);
    }
  };

  const handleReject = async (bookingId: string) => {
    const data = {
      data: {
        isConfirmed: "unconfirmed",
        paymentStatus: "pending",
      },
      bId: bookingId,
    };

    try {
      await updateBooking(data).unwrap();
      toast.success("Booking rejected successfully");
    } catch (err) {
      toast.error("Failed to reject booking");
      console.log(err);
    }
  };

  const handleDelete = (id: string) => {
    swal({
      title: "Are you sure to delete?",
      text: "Once deleted, you will not be able to recover this bookings!",

      icon: "warning",
      //@ts-expect-error :'no error found'
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteBooking({ rId: id })
          .then((response) => {
            if (response?.data) {
              swal("Deleted!", "The room has been deleted.", "success");
            } else {
              swal(
                "Error",
                "There was a problem deleting the bookings.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            swal(
              "Error",
              "There was a problem deleting the bookings.",
              "error"
            );
          });
      } else {
        swal("Cancelled", "The bookings is safe!", "info");
      }
    });
  };

  return (
    <div className="w-full px-8">
      <h2 className="text-center text-3xl my-6">All Bookings</h2>
      <Table className="mt-12">
        <TableHeader>
          <TableRow className=" border-[3px] border-[#9697a1] rounded-full">
            <TableHead className="text-[#557856]  font-medium text-base">
              Room Name
            </TableHead>
            <TableHead className="text-[#557856]  font-medium text-base">
              User Name
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Date & Time
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Status
            </TableHead>
            <TableHead className="text-[#557856]  text-center font-medium text-base">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBookings?.data.map((booking: any) => (
            <TableRow key={booking._id}>
              <TableCell className="text-lg">{booking.room.name}</TableCell>
              <TableCell className="text-lg">{booking.user.name}</TableCell>
              <TableCell className="text-base">
                {new Date(booking.date).toLocaleDateString()}{" "}
                {booking.slots.map((slot: any) => (
                  <div key={slot._id}>
                    {slot.startTime} - {slot.endTime}
                  </div>
                ))}
              </TableCell>
              <TableCell
                className={`font-medium text-lg ${
                  booking.isConfirmed === "confirmed"
                    ? "text-[#557856]"
                    : "text-red-600"
                }`}
              >
                {booking.isConfirmed}
              </TableCell>
              <TableCell className="flex justify-center gap-2 items-center mt-3">
                {booking.isConfirmed === "confirmed" ? (
                  <Button
                    // @ts-expect-error: Variant type mismatch is expected, custom variant in use

                    variant="danger"
                    onClick={() => handleReject(booking._id)}
                  >
                    <TiDelete className="text-red-600 text-3xl" />
                  </Button>
                ) : (
                  <Button
                    // @ts-expect-error: Variant type mismatch is expected, custom variant in use

                    variant="success"
                    onClick={() => handleApprove(booking._id)}
                  >
                    <ImCheckboxChecked className="text-green-600 w-6 h-6" />
                  </Button>
                )}

                <button onClick={() => handleDelete(booking._id)}>
                  <MdAutoDelete className="text-red-600 text-2xl w-6 h-6 " />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllBookings;
