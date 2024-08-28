import { baseApi } from "../baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useAddBookingsMutation,
  useGetAllBookingsQuery,
  useMyBookingsQuery,
} = bookingApi;
