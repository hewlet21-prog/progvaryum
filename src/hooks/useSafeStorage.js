import { useState, useEffect } from "react";

export function useSafeStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw || raw === "undefined") return defaultValue;
      return JSON.parse(raw);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`localStorage kayıt hatası (${key}):`, error);
    }
  }, [key, value]);

  return [value, setValue];
}