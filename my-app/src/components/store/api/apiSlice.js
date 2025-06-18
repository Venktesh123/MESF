import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://your-backend-url.herokuapp.com/api"
      : "/api",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("x-user-id", "cyberpunk420");
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Meme", "Bid", "Vote", "Leaderboard"],
  endpoints: (builder) => ({
    getMemes: builder.query({
      query: ({ limit = 50, offset = 0, tags } = {}) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
        });
        if (tags && tags.length > 0) {
          params.append("tags", tags.join(","));
        }
        return `memes?${params}`;
      },
      providesTags: ["Meme"],
    }),

    getMeme: builder.query({
      query: (id) => `memes/${id}`,
      providesTags: (result, error, id) => [{ type: "Meme", id }],
    }),

    createMeme: builder.mutation({
      query: (memeData) => ({
        url: "memes",
        method: "POST",
        body: memeData,
      }),
      invalidatesTags: ["Meme", "Leaderboard"],
    }),

    generateMemeCaption: builder.mutation({
      query: (id) => ({
        url: `memes/${id}/caption`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Meme", id }],
    }),

    getLeaderboard: builder.query({
      query: (limit = 10) => `memes/leaderboard?limit=${limit}`,
      providesTags: ["Leaderboard"],
    }),

    placeBid: builder.mutation({
      query: (bidData) => ({
        url: "bids",
        method: "POST",
        body: bidData,
      }),
      invalidatesTags: ["Bid", "Meme"],
    }),

    getBidsForMeme: builder.query({
      query: (memeId) => `bids/meme/${memeId}`,
      providesTags: (result, error, memeId) => [{ type: "Bid", id: memeId }],
    }),

    getHighestBid: builder.query({
      query: (memeId) => `bids/highest/${memeId}`,
      providesTags: (result, error, memeId) => [{ type: "Bid", id: memeId }],
    }),

    voteMeme: builder.mutation({
      query: ({ id, type, user_id }) => ({
        url: `votes/${id}`,
        method: "POST",
        body: { type, user_id },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Meme", id },
        "Leaderboard",
      ],
    }),

    generateCaption: builder.mutation({
      query: (tags) => ({
        url: "ai/caption",
        method: "POST",
        body: { tags },
      }),
    }),
  }),
});

export const {
  useGetMemesQuery,
  useGetMemeQuery,
  useCreateMemeMutation,
  useGenerateMemeCaptionMutation,
  useGetLeaderboardQuery,
  usePlaceBidMutation,
  useGetBidsForMemeQuery,
  useGetHighestBidQuery,
  useVoteMemeMutation,
  useGenerateCaptionMutation,
} = apiSlice;
