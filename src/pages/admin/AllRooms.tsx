/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";

import { useState } from "react";
import swal from "sweetalert";
import {
  useDeleteRoomMutation,
  useGetAllTypesRoomsQuery,
} from "@/redux/api/room/roomApi";
import UpdateRoom from "@/components/Dashboard/UpdateRoom/UpdateRoom";
import CreateRoom from "@/components/Dashboard/CreateRoom/CreateRoom";

const AllRooms = () => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const { data, isLoading } = useGetAllTypesRoomsQuery(undefined, {
    pollingInterval: 1000,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [deleteRoom] = useDeleteRoomMutation();

  const [alertShown, setAlertShown] = useState(false); // State to control alert visibility

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  const handleUpdate = (roomId: any) => {
    setSelectedRoomId(roomId);
    setIsDialogOpen(true);
  };
  const handleAdd = () => {
    setCreateDialogOpen(true);
  };

  function handleDelete(id: string, deleted: boolean) {
    console.log(deleted);

    //deleted room will not be delete twice
    if (deleted && !alertShown) {
      swal({
        title: "Delete Failed",
        text: "You can't delete this room as it has already been deleted.",
        icon: "error",
        //@ts-expect-error :'buttons' is generated error
        buttons: "Okay",
      }).then(() => {
        setAlertShown(false);
      });

      // Set the alert
      setAlertShown(true);

      return;
    }
    swal({
      title: "Are you sure to delete?",
      text: "Once deleted, you will not be able to recover this room!",
      icon: "warning",
      // @ts-expect-error: Unreachable code error
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteRoom(id)
          .then((response) => {
            if (response?.data) {
              swal("Deleted!", "The room has been deleted.", "success");
            } else {
              swal("Error", "There was a problem deleting the room.", "error");
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            swal("Error", "There was a problem deleting the room.", "error");
          });
      } else {
        swal("Cancelled", "The room is safe!", "info");
      }
    });
  }

  return (
    <div className="w-full px-8">
      <div className="flex justify-start">
        <button
          type="submit"
          onClick={() => handleAdd()}
          className="btn btn-primary text-lg px-4 mt-4 py-2 bg-[#4a53c0] text-white font-medium rounded-md hover:bg-[#4a53c0]/90"
        >
          Add Room
        </button>
      </div>
      <Table className="mt-12">
        <TableHeader>
          <TableRow className=" border-[3px] border-[#9697a1] rounded-full">
            <TableHead className="font-medium text-base"> Name</TableHead>
            <TableHead className="font-medium text-base"> Image</TableHead>
            <TableHead className="font-medium text-base">Floor</TableHead>
            <TableHead className="font-medium text-base">Room No</TableHead>
            <TableHead className=" font-medium text-base">Capacity</TableHead>
            <TableHead className=" font-medium text-base">Price</TableHead>
            <TableHead className="font-medium text-base">Delete</TableHead>
            <TableHead className="font-medium text-base">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((room: any) => {
            return (
              <TableRow key={room._id}>
                <TableCell>{room?.name}</TableCell>
                <TableCell>
                  <img
                    src={room?.images[0]}
                    className="w-12 h-12 rounded-2xl"
                    alt=""
                  />
                </TableCell>

                <TableCell> {room?.roomNo}</TableCell>
                <TableCell> {room?.floorNo}</TableCell>
                <TableCell>{room?.capacity}</TableCell>
                <TableCell>{room?.pricePerSlot}</TableCell>
                <TableCell>{room?.isDeleted ? "Yes" : "No"}</TableCell>
                <TableCell className="flex gap-3 mt-3 items-center">
                  <button onClick={() => handleUpdate(room?._id)}>
                    <FaPenToSquare className="text-[#4a53c0] text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(room?._id, room?.isDeleted)}
                  >
                    <RiDeleteBack2Fill className="text-red-600 text-2xl" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isDialogOpen && (
        <UpdateRoom
          roomId={selectedRoomId}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
      {createDialogOpen && (
        <CreateRoom
          isDialogOpen={createDialogOpen}
          setIsDialogOpen={setCreateDialogOpen}
        />
      )}
    </div>
  );
};

export default AllRooms;
