import { PayloadAction } from "@reduxjs/toolkit";
import { WorkStatus } from "./types";

export enum StoreClients {
  Nav = 'nav',
  Dash = 'dashboard'
}

export interface StoreSyncMessage {
  source: StoreClients;
  action: PayloadAction<WorkStatus>;
  timestamp: number;
}

const eventBus = new EventTarget();

export const syncWorkStatusAction = (source: StoreClients, action: any) => {
  const syncMessage: StoreSyncMessage = {
    source,
    action,
    timestamp: Date.now(),
  };
  eventBus.dispatchEvent(new CustomEvent('store-sync', { detail: syncMessage }));
};

export const subscribeToActions = (
  callback: (message: StoreSyncMessage) => void
) => {
  eventBus.addEventListener('store-sync', (e: any) => {
    callback(e.detail as StoreSyncMessage);
  });
};