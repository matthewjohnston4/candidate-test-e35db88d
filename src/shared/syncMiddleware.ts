import { Middleware } from "@reduxjs/toolkit";
import {
  syncWorkStatusAction,
  subscribeToActions,
  StoreClients,
} from "./eventSync";
import { updateWorkStatus as updateDashboardWorkStatus } from "../dashboard/store/userSlice";
import { updateWorkStatus as updateNavWorkStatus } from "../navigation/store/userSlice";

export const createSyncMiddleware =
  (storeName: StoreClients): Middleware =>
  (_store) =>
  (next) =>
  (action: any) => {
    const result = next(action);

    // Broadcast changes to work status to any other subscribers
    // Skip broadcasting if this action was synced from another store
    if (action.type.endsWith("updateWorkStatus") && !action._synced) {
      syncWorkStatusAction(storeName, action);
    }

    return result;
  };

export const initializeSyncListener = (store: any, storeName: StoreClients) => {
  subscribeToActions((message) => {
    // Each store shouldn't process its own state updates
    if (message.source === storeName) return;
    // Get the relevant reducer function from the store for this component
    let updateWorkStatus = null;
    switch (storeName) {
      case StoreClients.Dash:
        updateWorkStatus = updateDashboardWorkStatus;
        break;
      case StoreClients.Nav:
        updateWorkStatus = updateNavWorkStatus;
        break;
    }
    if (message.action.type.endsWith("updateWorkStatus") && updateWorkStatus) {
      store.dispatch({
        ...updateWorkStatus(message.action.payload),
        // Mark action as synced so middleware won't re-broadcast it
        _synced: true,
      });
    }
  });
};
