import { useMyBookingsQuery } from "@/redux/api/booking/bookingApi";

const MyBookings = () => {
  const { data, error, isLoading } = useMyBookingsQuery(undefined);
  console.log(data);
  return <div>Mybookings</div>;
};

export default MyBookings;
