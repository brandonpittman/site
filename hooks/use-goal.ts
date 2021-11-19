import { useCallback, useDebugValue } from "react";

export default function useGoal(id: string, cents = 0) {
  useDebugValue(id);

  return useCallback(() => {
    if (window.fathom !== undefined) {
      (window.fathom as any)("trackGoal", id, cents);
    }
  }, [id, cents]);
}
