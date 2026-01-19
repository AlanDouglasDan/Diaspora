import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export const useTimer = (initialTime: number, onTimerEnd: () => void) => {
  const [displayTime, setDisplayTime] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const onTimerEndRef = useRef(onTimerEnd);

  // Keep onTimerEnd ref in sync
  useEffect(() => {
    onTimerEndRef.current = onTimerEnd;
  }, [onTimerEnd]);

  const calculateRemaining = () => {
    if (!endTimeRef.current) return 0;
    const now = Date.now();
    const remaining = Math.max(
      0,
      Math.round((endTimeRef.current - now) / 1000)
    );
    return remaining;
  };

  const start = (remainingSeconds?: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const secondsToUse =
      remainingSeconds !== undefined ? remainingSeconds : initialTime;
    endTimeRef.current = Date.now() + secondsToUse * 1000;
    setDisplayTime(secondsToUse);

    timerRef.current = setInterval(() => {
      const remaining = calculateRemaining();
      setDisplayTime(remaining);

      if (remaining <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        onTimerEndRef.current();
      }
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    endTimeRef.current = null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active" && endTimeRef.current) {
        const remaining = calculateRemaining();
        setDisplayTime(remaining);
        if (remaining <= 0) {
          stop();
          onTimerEndRef.current();
        }
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    displayTime: formatTime(displayTime),
    start,
    stop,
    remainingSeconds: calculateRemaining(),
  };
};
