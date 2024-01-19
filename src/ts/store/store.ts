import { createContext, useContext } from "react";
import MeetingStore from "./MeetingStore";

interface Store {
  meetingStore: MeetingStore;
}

export const store: Store = {
  meetingStore: new MeetingStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
