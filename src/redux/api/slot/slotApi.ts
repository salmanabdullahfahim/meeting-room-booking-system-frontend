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
  }),
});

export const { useGetAvailableSlotsQuery } = slotApi;
