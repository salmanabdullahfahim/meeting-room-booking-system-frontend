/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import swal from "sweetalert";
import {
  useGetSingleRoomQuery,
  useUpdateRoomMutation,
} from "@/redux/api/room/roomApi";
import toast from "react-hot-toast";

const updateMeetingRoomValidationSchema = z.object({
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  name: z.string().min(1, "Name is required"),
  roomNo: z.preprocess((val) => Number(val), z.number().optional()),
  floorNo: z.preprocess((val) => Number(val), z.number().optional()),
  capacity: z.preprocess((val) => Number(val), z.number().optional()),
  pricePerSlot: z.preprocess((val) => Number(val), z.number().optional()),
  amenities: z
    .array(
      z
        .string()
        .min(1)
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
          message: "Amenities must only contain alphabetic characters",
        })
    )
    .optional(),
});

const UpdateRoom = ({ roomId, isDialogOpen, setIsDialogOpen }: any) => {
  const [alertShown, setAlertShown] = useState(false);

  const [updateRoom] = useUpdateRoomMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(updateMeetingRoomValidationSchema),
  });

  const [roomDetails, setRoomDetails] = useState<{
    name: string;
    roomNo: string;
    floorNo: string;
    capacity: string;
    pricePerSlot: string;
    amenities: string[];
    images: string[];
  }>({
    name: "",
    roomNo: "",
    floorNo: "",
    capacity: "",
    pricePerSlot: "",
    amenities: [],
    images: [],
  });

  const [newAmenity, setNewAmenity] = useState("");
  const [newImage, setNewImage] = useState("");

  const {
    data: roomData,

    isLoading,
  } = useGetSingleRoomQuery(roomId);

  if (isLoading) {
    return (
      <div className=" w-full flex justify-center items-center h-screen z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  if (roomData?.data?.isDeleted && !alertShown) {
    // Show the alert only if it hasn't been shown before
    swal({
      title: "Update Failed",
      text: "You can't update this room as it has already been deleted.",
      icon: "error",
      //@ts-expect-error :'buttons' is generated error
      buttons: "Okay",
    }).then(() => {
      setAlertShown(false); // Reset the alert state after user acknowledges
    });

    // Set the alert as shown
    setAlertShown(true);

    // Exit the function to prevent further actions
    return;
  }

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Reset form after submission
    reset();
    // const toastId = toast.loading("updating room...");
    setRoomDetails({
      name: "",
      roomNo: "",
      floorNo: "",
      capacity: "",
      pricePerSlot: "",
      amenities: [],
      images: [],
    });

    const updatedData = {
      rId: roomId,
      data: {
        ...data,
        amenities:
          newAmenity?.length > 0 && roomData?.data?.amenities?.length > 0
            ? [...roomData.data.amenities, newAmenity]
            : [...(roomData?.data?.amenities || [])],
        // Handle images
        images:
          newImage?.length > 0 && roomData?.data?.images?.length > 0
            ? [...roomData.data.images, newImage]
            : [...(roomData?.data?.images || [])],
      },
    };

    try {
      //call addAcademicSemester for data saving
      const res = await updateRoom(updatedData).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      }
      if (res?.error) {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() !== "") {
      setValue("amenities", [...roomDetails.amenities, newAmenity.trim()]);
      setRoomDetails({
        ...roomDetails,

        amenities: [...roomDetails.amenities, newAmenity.trim()],
      });
    }
  };

  const handleRemoveAmenity = (index: any) => {
    const updatedAmenities = roomDetails.amenities.filter(
      (_, i) => i !== index
    );
    setValue("amenities", updatedAmenities);
    setRoomDetails({ ...roomDetails, amenities: updatedAmenities });
  };

  // Function to add new image URL
  const handleAddImage = () => {
    if (newImage.trim() !== "") {
      // eslint-disable-next-line no-unsafe-optional-chaining
      setValue("images", [...roomDetails?.images, newImage.trim()]); // Update form state
      setRoomDetails({
        ...roomDetails,
        images: [...roomDetails?.images, newImage.trim()],
      });
    }
  };

  // Function to remove image URL
  const handleRemoveImage = (index: any) => {
    const updatedImages = roomDetails?.images.filter((_, i) => i !== index);
    setValue("images", updatedImages); // Update form state
    setRoomDetails({ ...roomDetails, images: updatedImages });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>Update</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#4a53c0]">
            Update Meeting Room
          </DialogTitle>
          <DialogDescription className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2 mt-4">
                <label className="block mb-2">Image URL</label>
                <div className="flex">
                  <Input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    onClick={handleAddImage}
                    className="ml-2 bg-[#4a53c0] hover:bg-[#4a53c0]/90 text-white"
                  >
                    Add
                  </Button>
                </div>
                {errors.images && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors?.images?.message}</p>
                )}
                <ul className="">
                  {roomDetails?.images?.map((image, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mt-2"
                    >
                      <img
                        src={image}
                        className="w-10 h-10 rounded-3xl"
                        alt=""
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="ml-2"
                      >
                        <TiDelete className="text-3xl text-[#7AAC7B]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <label className="block mb-1 mt-8">Name</label>
                <Input
                  type="text"
                  {...register("name")}
                  defaultValue={roomData?.data?.name}
                  className="w-full"
                />
                {errors.name && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors?.name?.message}</p>
                )}
              </div>
              <div className="md:flex justify-between">
                <div className="mb-2">
                  <label className="block mb-2">room No</label>
                  <Input
                    type="text"
                    {...register("roomNo")}
                    defaultValue={roomData?.data?.roomNo}
                    className="w-full"
                  />
                  {errors.roomNo && (
                    // @ts-expect-error: Unreachable code error
                    <p className="text-red-500">{errors?.roomNo?.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Floor Number</label>
                  <Input
                    type="text"
                    {...register("floorNo")}
                    defaultValue={roomData?.data?.floorNo}
                    className="w-full"
                  />
                  {errors.floorNo && (
                    // @ts-expect-error: Unreachable code error
                    <p className="text-red-500">{errors?.floorNo?.message}</p>
                  )}
                </div>
              </div>
              <div className="md:flex justify-between">
                <div className="mb-2">
                  <label className="block mb-2">Capacity</label>
                  <Input
                    type="text"
                    {...register("capacity")}
                    defaultValue={roomData?.data?.capacity}
                    className="w-full"
                  />
                  {errors.capacity && (
                    // @ts-expect-error: Unreachable code error
                    <p className="text-red-500">{errors?.capacity?.message}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block mb-2">Price Per Slot</label>
                  <Input
                    type="text"
                    {...register("pricePerSlot")}
                    defaultValue={roomData?.data?.pricePerSlot}
                    className="w-full"
                  />
                  {errors.pricePerSlot &&
                    typeof errors.pricePerSlot.message === "string" && (
                      <p className="text-red-500">
                        {errors.pricePerSlot.message}
                      </p>
                    )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Amenities</label>
                <div className="flex">
                  <Input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    onClick={handleAddAmenity}
                    className="ml-2  bg-[#4a53c0] hover:bg-[#4a53c0]/90 text-white"
                  >
                    Add
                  </Button>
                </div>

                {errors?.amenities && (
                  <p className="text-red-500">
                    Amenities must only contain alphabetic characters
                  </p>
                )}
                <ul className="mt-2">
                  {roomDetails.amenities.map((amenity, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mt-2"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                        className="ml-2"
                      >
                        <TiDelete className=" text-3xl  text-[#7AAC7B] " />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary text-lg px-6 mt-4 py-3 bg-[#4a53c0] text-white font-semibold rounded-md hover:bg-[#4a53c0]/90"
                >
                  Update Room
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoom;
