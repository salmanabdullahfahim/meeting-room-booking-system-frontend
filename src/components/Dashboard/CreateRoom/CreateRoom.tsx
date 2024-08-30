/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TiDelete } from "react-icons/ti";

import swal from "sweetalert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddRoomsMutation } from "@/redux/api/room/roomApi";
import toast from "react-hot-toast";

// Define Zod schema for room validation
const meetingRoomValidationSchema = z.object({
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(2, "At least two images are required"),
  name: z.string().min(1, "Name is required"),

  roomNo: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Room number is required")
  ),
  floorNo: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Floor number is required")
  ),
  capacity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Capacity is required")
  ),
  pricePerSlot: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price per slot is required")
  ),
  amenities: z
    .array(
      z
        .string()
        .min(1)
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
          message: "Amenities must only contain alphabetic characters",
        })
    )
    .min(1, "At least one amenity is required"),
});

const CreateRoom = ({ isDialogOpen, setIsDialogOpen }: any) => {
  const [addRooms] = useAddRoomsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(meetingRoomValidationSchema),
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
  const [newImage, setNewImage] = useState(""); // New state for new image URL

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Reset form after submission
    reset();

    setRoomDetails({
      name: "",
      roomNo: "",
      floorNo: "",
      capacity: "",
      pricePerSlot: "",
      amenities: [],
      images: [],
    });
    try {
      const res = await addRooms(data).unwrap();

      if (res?.success) {
        toast.success(res?.data?.message);
        swal("Room added", "", "success");
      }
      if (res?.error) {
        toast.error(res?.error.data.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // Function to add new image URL
  const handleAddImage = () => {
    if (newImage.trim() !== "") {
      setValue("images", [...roomDetails?.images, newImage.trim()]); // Update form state
      setRoomDetails({
        ...roomDetails,

        images: [...roomDetails?.images, newImage.trim()],
      });

      setNewImage("");
    }
  };

  // Function to remove image URL
  const handleRemoveImage = (index: any) => {
    const updatedImages = roomDetails?.images.filter((_, i) => i !== index);
    setValue("images", updatedImages); // Update form state
    setRoomDetails({ ...roomDetails, images: updatedImages });
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() !== "") {
      setValue("amenities", [...roomDetails.amenities, newAmenity.trim()]);
      setRoomDetails({
        ...roomDetails,

        amenities: [...roomDetails.amenities, newAmenity.trim()],
      });
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index: any) => {
    const updatedAmenities = roomDetails.amenities.filter(
      (_, i) => i !== index
    );
    setValue("amenities", updatedAmenities);
    setRoomDetails({ ...roomDetails, amenities: updatedAmenities });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>Create Meeting Room</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#557856]">
            Create Meeting Room
          </DialogTitle>
          <DialogDescription className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Newly added: Handle multiple image URLs */}
              <div className="mb-4 mt-4">
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
                    className="ml-2 bg-[#4a53c0] hover:bg-[#4a53c0]/90 text-white font-[500]"
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
                        className="ml-2 cursor-pointer"
                      >
                        <TiDelete className="text-3xl text-[#7AAC7B]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <label className="block mb-2">Name</label>
                <Input type="text" {...register("name")} className="w-full" />
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

              <div className="mb-2">
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
                    className="ml-2 bg-[#4a53c0] hover:bg-[#4a53c0]/90 text-white font-[500] "
                  >
                    Add
                  </Button>
                </div>

                {errors?.amenities && (
                  <p className="text-red-500">
                    Amenities must only contain alphabetic characters
                  </p>
                )}
                <ul className="mt-1">
                  {roomDetails.amenities.map((amenity, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mt-2"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                        className="ml-2 cursor-pointer"
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
                  className="btn btn-primary text-lg px-6 mt-1 py-3 bg-[#4a53c0] text-white font-semibold rounded-md hover:bg-[#4a53c0]/90"
                >
                  Create Room
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
