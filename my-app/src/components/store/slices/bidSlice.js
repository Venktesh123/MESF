import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bids: [],
  userBids: [],
  loading: false,
  error: null,
  bidding: false,
};

const bidSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBidding: (state, action) => {
      state.bidding = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.bidding = false;
    },
    setBids: (state, action) => {
      state.bids = action.payload;
      state.loading = false;
    },
    addBid: (state, action) => {
      state.bids.unshift(action.payload);
      state.bidding = false;
    },
    setUserBids: (state, action) => {
      state.userBids = action.payload;
    },
    addUserBid: (state, action) => {
      state.userBids.unshift(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setBidding,
  setError,
  setBids,
  addBid,
  setUserBids,
  addUserBid,
  clearError,
} = bidSlice.actions;

export default bidSlice.reducer;
