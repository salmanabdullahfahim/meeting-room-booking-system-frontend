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
    deleteBookings: builder.mutation({
      query: (data) => {
        console.log("sending bookings==>", data);
        return {
          url: `bookings/${data?.rId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["booking"],
    }),
    updateBookings: builder.mutation({
      query: (data) => {
        console.log("sending bookings==>", data);
        return {
          url: `bookings/${data?.bId}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useAddBookingsMutation,
  useGetAllBookingsQuery,
  useMyBookingsQuery,
  useDeleteBookingsMutation,
  useUpdateBookingsMutation,
} = bookingApi;
