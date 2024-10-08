import { Button } from "@/components/ui/button";
import { useGetAllRoomsQuery } from "@/redux/api/room/roomApi";
import { TRoom } from "@/utils/Types/RoomType";
import { Link } from "react-router-dom";
import { RoomCard } from "../Room/RoomCard";
import ScaleLoader from "react-spinners/ScaleLoader";

const FeaturedRoom = () => {
  const { data, isLoading } = useGetAllRoomsQuery(undefined);
  return (
    <div className="w-full">
      <h2 className="text-3xl  md:mt-12 mb-2 font-bold text-center tracking-wider">
        {" "}
        FEATURED <span className="text-headerText"> ROOMS</span>
      </h2>

      <div className=" mx-12 grid items-center justify-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <ScaleLoader color="#4a53c0" />
          </div>
        ) : (
          data?.data
            .slice(0, 6)
            .map((room: TRoom) => <RoomCard key={room._id} room={room} />)
        )}
      </div>

      <div className="text-center my-6">
        <Link to="/meetings-rooms">
          <Button
            type="button"
            className="text-sm font-medium bg-[#4a53c0] hover:bg-[#4a53c0]/90 px-12"
          >
            See All Rooms
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedRoom;
