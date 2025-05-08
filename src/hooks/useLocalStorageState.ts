import { useState } from "react"

export default function<T>(name: string) {
  const [state, setStateDefault] = useState<T | null>(() => {
    const value =  localStorage.getItem(name);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  });
  
  function setState(value: T | null) {
    if (value !== null && value !== undefined) {
      localStorage.setItem(name, JSON.stringify(value));
    } else {
      localStorage.removeItem(name)
    }
    setStateDefault(value);
  }

  return {
    setState,
    value: state
  };
}