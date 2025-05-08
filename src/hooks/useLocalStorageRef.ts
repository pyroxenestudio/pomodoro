import { useRef } from "react"
import useLocalStorage from "./useLocalStorage";

export default function<T>(name: string, initialValue: T | null = null) {
  const localStorageHook = useLocalStorage();
  const loaded = useRef<boolean>(false);
  const state = useRef<T | null>(initialValue);

  if (!loaded.current) {
    const value = localStorageHook.getValue<T>(name);
    if (value) {
      state.current = value;
    }
    loaded.current = true;
  }

  function setRef(value: T | null, expireDate?: Date) {
    state.current = value;
    if (value !== null && value !== undefined && value !== '') {
      return localStorageHook.save(name, value, expireDate);
    } else {
      return localStorageHook.remove(name);
    }
  }

  return {
    setRef,
    current: state.current
  };
}