import { baseApi } from "../baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ date, roomId }) => {
        return {
          url: "/slots/availability",
          method: "GET",
          params: {
            date,
            roomId,
          },
        };
      },
    }),
    addBookings: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/bookings",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["booking"],
    }),
    getAllBookings: builder.query({
      query: () => {
        return {
          url: "/bookings",
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    myBookings: builder.query({
      query: () => {
        return {
          url: "/my-bookings",
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useAddBookingsMutation,
  useGetAllBookingsQuery,
  useMyBookingsQuery,
} = bookingApi;
