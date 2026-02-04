import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { createSyncMiddleware, initializeSyncListener } from "../../shared/syncMiddleware";
import { StoreClients } from "../../shared/broadcastSync";

export const dashboardStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createSyncMiddleware(StoreClients.Dash))
});

initializeSyncListener(dashboardStore, StoreClients.Dash);

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch;
