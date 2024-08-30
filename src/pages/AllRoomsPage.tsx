import { BsSearch } from "react-icons/bs";
import { CardSkeleton } from "@/components/Skeleton/CardSkeleton";

import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useGetAllRoomsQuery } from "@/redux/api/room/roomApi";
import { TRoom } from "@/utils/Types/RoomType";
import { RoomCard } from "@/components/Room/RoomCard";
import { useMemo, useState } from "react";
import useDebounce from "@/utils/Debounce/useDebunce";

const AllRoomsPage = () => {
  const { data, isLoading } = useGetAllRoomsQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCapacityRange, setSelectedCapacityRange] =
    useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

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

    if (selectedCapacityRange) {
      rooms = rooms.filter((room: any) => {
        const [min, max] = selectedCapacityRange.split("-").map(Number);
        return room.capacity >= min && room.capacity <= max;
      });
    }

    if (selectedPriceRange) {
      rooms = rooms.filter((room: any) => {
        const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
        return room.pricePerSlot >= minPrice && room.pricePerSlot <= maxPrice;
      });
    }

    if (sortOption === "priceLowToHigh") {
      rooms = [...rooms].sort(
        (a: any, b: any) => a.pricePerSlot - b.pricePerSlot
      );
    } else if (sortOption === "priceHighToLow") {
      rooms = [...rooms].sort(
        (a: any, b: any) => b.pricePerSlot - a.pricePerSlot
      );
    }

    return rooms;
  }, [
    availableRooms,
    debouncedSearchQuery,
    selectedCapacityRange,
    selectedPriceRange,
    sortOption,
  ]);

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
        {/* filter by price range and capacity */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-x-2 mt-3 md:mt-12 ml-6 md:ml-12">
          <p className="font-semibold whitespace-nowrap">Filter By</p>

          <select
            value={selectedCapacityRange}
            onChange={(e) => setSelectedCapacityRange(e.target.value)}
            className="p-2 border rounded-md mb-2 md:mb-0"
          >
            <option value="">Select Capacity</option>
            <option value="10-50">10-50</option>
            <option value="60-90">60-90</option>
            <option value="100-500">100-500</option>
          </select>

          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="p-2 border rounded-md mb-2 md:mb-0"
          >
            <option value="">Select Price Range</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-900">$500 - $900</option>
            <option value="1000-2000">$1000 - $2000</option>
          </select>

          {/* clear filter and sort */}
          <button
            className="border hover:border-black px-4 py-2  rounded-lg  text-sm font-medium flex items-center gap-x-2 whitespace-nowrap"
            onClick={() => {
              setSearchTerm("");
              setSelectedCapacityRange("");
              setSelectedPriceRange("");
              setSortOption("");

              toast.success("Filter cleared!");
            }}
          >
            <RxCross2 />
            Reset Filter
          </button>
        </div>

        {/* sort by price */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-y-0 justify-end gap-x-2 mt-3 md:mt-8 mr-6 md:mr-12">
          <p className="font-semibold">Sort By</p>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-md mb-2 md:mb-0"
          >
            <option value="">Price</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="mx-12 grid items-center justify-center space-y-4 px-2 py-8 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="flex flex-col gap-y-6 items-center justify-center bg-white h-96 px-4">
          <p className="border-[1px] border-darkText w-3/4 p-2 text-center rounded-md font-semibold">
            No Rooms found
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
