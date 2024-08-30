/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";
import swal from "sweetalert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllRoomsQuery } from "@/redux/api/room/roomApi";
import { useCreateSlotMutation } from "@/redux/api/slot/slotApi";
import toast from "react-hot-toast";

const slotValidationSchema = z.object({
  room: z.string().min(1, { message: "Room ID is required" }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  startTime: z
    .string()
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Invalid time format",
    }),
  endTime: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: "Invalid time format",
  }),
});

const CreateSlot = ({ isDialogOpen, setIsDialogOpen }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(slotValidationSchema),
  });

  const { data: allRoom, isLoading } = useGetAllRoomsQuery(undefined, {
    pollingInterval: 1000,
  });

  const [createSlot] = useCreateSlotMutation();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <ScaleLoader color="#4a53c0" />
      </div>
    );
  }

  // Filter and map the data
  const availableRooms = allRoom?.data.filter((room: any) => !room.isDeleted);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Reset form after submission
    reset();

    try {
      const res = await createSlot(data).unwrap();

      if (res?.success) {
        swal("Slot added", "", "success");
      }
      if (res?.error) {
        toast.error(res?.error.data.message);
      }
    } catch (err) {
      toast.error("something went wrong.");
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>Create Slot</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#4a53c0]">Create Slot</DialogTitle>
          <DialogDescription className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
              <div>
                <label className="block text-gray-700 mb-2">Room</label>
                <select
                  {...register("room")}
                  className="border input p-1 rounded-md w-full"
                >
                  <option value="" disabled selected>
                    Select a Room
                  </option>
                  {availableRooms?.map((room: any) => (
                    <option key={room._id} value={room._id}>
                      {`${room.name} - $${room.pricePerSlot}`}
                    </option>
                  ))}
                </select>
                {errors.room && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.room.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  {...register("date")}
                  className=" border p-1 py-2 rounded-md w-full"
                />
                {errors.date && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  {...register("startTime")}
                  className="input border py-2 input-bordered p-1 rounded-md w-full"
                />
                {errors.startTime && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.startTime.message}</p>
                )}
              </div>
              <div>
                <label className="block  text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  {...register("endTime")}
                  className="input border input-bordered py-2 p-1 rounded-md w-full"
                />
                {errors.endTime && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.endTime.message}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary text-lg px-6 py-3 bg-[#4a53c0] text-white font-semibold rounded-md hover:bg-[#4a53c0]/90"
                >
                  Create Slot
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSlot;
