import { BsSearch } from "react-icons/bs";
import { CardSkeleton } from "@/components/Skeleton/CardSkeleton";

// import { RxCross2 } from "react-icons/rx";
// import toast from "react-hot-toast";
import { useGetAllRoomsQuery } from "@/redux/api/room/roomApi";
import { TRoom } from "@/utils/Types/RoomType";
import { RoomCard } from "@/components/Room/RoomCard";
import { useMemo, useState } from "react";
import useDebounce from "@/utils/Debounce/useDebunce";

const AllRoomsPage = () => {
  const { data, isLoading } = useGetAllRoomsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchQuery = useDebounce(searchTerm, 700);

  const availableRooms = data?.data;

  const filteredRooms = useMemo(() => {
    let rooms = availableRooms || [];

    if (debouncedSearchQuery) {
      rooms = rooms.filter(
        (room: TRoom) =>
          room.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          room.amenities.some(
            (amenity: string) =>
              amenity
                .toLowerCase()
                .includes(debouncedSearchQuery.toLowerCase()) ||
              room.pricePerSlot.toString().includes(debouncedSearchQuery) ||
              room.roomNo.toString().includes(debouncedSearchQuery)
          )
      );
    }

    return rooms;
  }, [availableRooms, debouncedSearchQuery]);

  return (
    <div>
      {/* Search box */}
      <div className="w-3/5 hidden md:flex items-center gap-x-2 border-[1px] border-darkText/90 rounded-full px-4 py-1.5 border-gray-600 group mx-auto mt-8">
        <BsSearch className="text-gray-500 group-focus-within:text-darkText duration-200" />
        <input
          type="text"
          placeholder="Search any Meeting Room"
          className="placeholder:text-sm flex-1 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        {/* filter by price range */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-x-2 mt-3 md:mt-8 ml-6 md:ml-12">
          <p className="font-semibold whitespace-nowrap">Filter By</p>

          {/* <FilterByPriceProduct onFilterChange={setFilterPrice} />
          <button
            className="border hover:border-black px-4 py-2 mt-3 rounded-lg  text-sm font-medium flex items-center gap-x-2 whitespace-nowrap"
            onClick={() => {
              setSearchTerm("");
              setFilterPrice("");
              setSort("");

              toast.success("Filter cleared!", {
                duration: 1500,
                style: {
                  background: "#333",
                  color: "#fff",
                },
              });
            }}
          >
            <RxCross2 />
            Reset Filter
          </button> */}
        </div>

        {/* sort by price */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-y-0 justify-end gap-x-2 mt-3 md:mt-8 mr-6 md:mr-12">
          <p className="font-semibold">Sort By Price</p>
          {/* <SortByPrice setSort={setSort} /> */}
        </div>
      </div>

      {isLoading ? (
        <div className="mx-12 grid items-center justify-center space-y-4 px-2 py-8 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="flex flex-col gap-y-6 items-center justify-center bg-white h-96 px-4">
          <p className="border-[1px] border-darkText w-3/4 p-2 text-center rounded-md font-semibold">
            No product found
          </p>
        </div>
      ) : (
        <div className="mx-12 grid items-center justify-center space-y-4 px-2 py-8 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {filteredRooms.map((room: TRoom) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRoomsPage;
