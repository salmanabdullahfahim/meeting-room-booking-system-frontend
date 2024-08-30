import React from "react";

const abc = () => {
  return (
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
  );
};

export default abc;
