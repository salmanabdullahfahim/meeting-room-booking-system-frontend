import { baseApi } from "../baseApi";

const slotApi = baseApi.injectEndpoints({
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
      providesTags: ["slots"],
    }),
    getAllSlotFromDb: builder.query({
      query: () => {
        return {
          url: "/slots/full-slots",
          method: "GET",
        };
      },
      providesTags: ["slots"],
    }),

    getSingleSlot: builder.query({
      query: (id) => {
        return {
          url: `/slots/${id}`,
          method: "GET",
        };
      },
      providesTags: ["slots"],
    }),

    createSlot: builder.mutation({
      query: (slot) => {
        return {
          url: "/slots",
          method: "POST",
          body: slot,
        };
      },
      invalidatesTags: ["slots"],
    }),

    updateSlot: builder.mutation({
      query: (data) => {
        return {
          url: `/slots/${data?.sId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["slots"],
    }),

    deleteSlot: builder.mutation({
      query: (slotId) => {
        return {
          url: `/slots/${slotId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useGetAllSlotFromDbQuery,
  useGetSingleSlotQuery,
  useCreateSlotMutation,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
} = slotApi;
