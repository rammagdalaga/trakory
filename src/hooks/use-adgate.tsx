import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import { AdGateModal } from "@/components/AdGateModal";

interface AdGateContextValue {
  /** Open the global ad gate. `onComplete` runs after the user finishes the ad. */
  triggerAdGate: (onComplete: () => void) => void;
}

const AdGateContext = createContext<AdGateContextValue | null>(null);

export function AdGateProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const callbackRef = useRef<(() => void) | null>(null);

  const triggerAdGate = useCallback((onComplete: () => void) => {
    callbackRef.current = onComplete;
    setOpen(true);
  }, []);

  const handleComplete = useCallback(() => {
    setOpen(false);
    callbackRef.current?.();
    callbackRef.current = null;
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    callbackRef.current = null;
  }, []);

  return (
    <AdGateContext.Provider value={{ triggerAdGate }}>
      {children}
      <AdGateModal open={open} onComplete={handleComplete} onClose={handleClose} />
    </AdGateContext.Provider>
  );
}

export function useAdGate(): AdGateContextValue {
  const ctx = useContext(AdGateContext);
  if (!ctx) {
    throw new Error("useAdGate must be used inside <AdGateProvider>");
  }
  return ctx;
}
