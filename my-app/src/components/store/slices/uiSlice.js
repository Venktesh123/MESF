import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "cyberpunk",
  sidebarOpen: false,
  connectedUsers: 0,
  notifications: [],
  modals: {
    bidModal: false,
    createMemeModal: false,
    settingsModal: false,
  },
  loading: {
    global: false,
    memes: false,
    bids: false,
  },
  realTimeUpdates: true,
  soundEnabled: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setConnectedUsers: (state, action) => {
      state.connectedUsers = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10);
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setModal: (state, action) => {
      const { modal, isOpen } = action.payload;
      state.modals[modal] = isOpen;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modal) => {
        state.modals[modal] = false;
      });
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setLoadingState: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    },
    toggleRealTimeUpdates: (state) => {
      state.realTimeUpdates = !state.realTimeUpdates;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setConnectedUsers,
  addNotification,
  removeNotification,
  clearNotifications,
  setModal,
  closeAllModals,
  setGlobalLoading,
  setLoadingState,
  toggleRealTimeUpdates,
  toggleSound,
} = uiSlice.actions;

export default uiSlice.reducer;
