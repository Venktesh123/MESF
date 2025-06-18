import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memes: [],
  currentMeme: null,
  loading: false,
  error: null,
  filters: {
    tags: [],
    sortBy: "created_at",
    order: "desc",
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
};

const memeSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setMemes: (state, action) => {
      state.memes = action.payload;
      state.loading = false;
      state.error = null;
    },
    addMeme: (state, action) => {
      state.memes.unshift(action.payload);
    },
    updateMeme: (state, action) => {
      const index = state.memes.findIndex(
        (meme) => meme.id === action.payload.id
      );
      if (index !== -1) {
        state.memes[index] = { ...state.memes[index], ...action.payload };
      }
    },
    updateMemeVotes: (state, action) => {
      const { meme_id, vote_type } = action.payload;
      const meme = state.memes.find((m) => m.id === meme_id);
      if (meme) {
        if (vote_type === "up") {
          meme.upvotes = (meme.upvotes || 0) + 1;
        } else {
          meme.downvotes = (meme.downvotes || 0) + 1;
        }
      }
    },
    updateMemeBid: (state, action) => {
      const { meme_id, highest_bid } = action.payload;
      const meme = state.memes.find((m) => m.id === meme_id);
      if (meme) {
        meme.highest_bid = highest_bid;
        meme.bid_count = (meme.bid_count || 0) + 1;
      }
    },
    setCurrentMeme: (state, action) => {
      state.currentMeme = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setMemes,
  addMeme,
  updateMeme,
  updateMemeVotes,
  updateMemeBid,
  setCurrentMeme,
  setFilters,
  setPagination,
  clearError,
} = memeSlice.actions;

export default memeSlice.reducer;
