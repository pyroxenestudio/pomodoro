import { createContext } from "react";
import { ACTIONTYPE, IStore } from "./reducer";

export const SettingsContext = createContext<IStore | null>(null);
export const DispatchContext = createContext<React.Dispatch<ACTIONTYPE> | null>(null);