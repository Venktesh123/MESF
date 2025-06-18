import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./slices/memeSlice";
import bidReducer from "./slices/bidSlice";
import uiReducer from "./slices/uiSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    memes: memeReducer,
    bids: bidReducer,
    ui: uiReducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// frontend/src/store/slices/memeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memes: [],
  currentMeme: null,
  leaderboard: [],
  loading: false,
  error: null,
  filters: {
    tags: [],
    sortBy: "newest",
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
      if (state.currentMeme && state.currentMeme.id === action.payload.id) {
        state.currentMeme = { ...state.currentMeme, ...action.payload };
      }
    },
    setCurrentMeme: (state, action) => {
      state.currentMeme = action.payload;
    },
    updateMemeVotes: (state, action) => {
      const { meme_id, upvotes, downvotes } = action.payload;
      const meme = state.memes.find((m) => m.id === meme_id);
      if (meme) {
        meme.upvotes = upvotes;
        meme.downvotes = downvotes;
      }
      if (state.currentMeme && state.currentMeme.id === meme_id) {
        state.currentMeme.upvotes = upvotes;
        state.currentMeme.downvotes = downvotes;
      }
    },
    updateMemeBid: (state, action) => {
      const { meme_id, highest_bid } = action.payload;
      const meme = state.memes.find((m) => m.id === meme_id);
      if (meme) {
        meme.highest_bid = highest_bid;
      }
      if (state.currentMeme && state.currentMeme.id === meme_id) {
        state.currentMeme.highest_bid = highest_bid;
      }
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
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
  setCurrentMeme,
  updateMemeVotes,
  updateMemeBid,
  setLeaderboard,
  setFilters,
  setPagination,
  clearError,
} = memeSlice.actions;

export default memeSlice.reducer;
