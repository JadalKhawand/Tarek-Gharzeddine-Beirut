import { useState } from "react";

export function useLocked(storageKey: string) {
  const [locked, setLocked] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });

  const lock = (id: string) => {
    setLocked(prev => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const isLocked = (id: string) => !!locked[id];

  return { locked, lock, isLocked };
}