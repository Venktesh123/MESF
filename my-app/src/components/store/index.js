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

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
