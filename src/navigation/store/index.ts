import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { StoreClients } from "../../shared/eventSync";
import { createSyncMiddleware, initializeSyncListener } from "../../shared/syncMiddleware";

export const navStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createSyncMiddleware(StoreClients.Nav))
});

initializeSyncListener(navStore, StoreClients.Nav);

export type NavRootState = ReturnType<typeof navStore.getState>;
export type NavDispatch = typeof navStore.dispatch;
