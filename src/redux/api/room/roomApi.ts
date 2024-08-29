import { baseApi } from "../baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
      providesTags: ["room"],
    }),
    getAllTypesRooms: builder.query({
      query: () => ({
        url: "/rooms/all-types-room",
        method: "GET",
      }),
      providesTags: ["room"],
    }),
    getSingleRoom: builder.query({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
      providesTags: ["room"],
    }),
    updateRoom: builder.mutation({
      query: (data) => {
        console.log("sending rooms==>", data);
        return {
          url: `rooms/${data?.rId}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["room"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetAllTypesRoomsQuery,
  useGetSingleRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
