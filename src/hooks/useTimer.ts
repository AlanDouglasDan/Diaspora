import { useEffect, useRef, useState } from "react";

export const useTimer = (initialTime: number, onTimerEnd: () => void) => {
  const [displayTime, setDisplayTime] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeLeftRef = useRef(initialTime);

  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;

      // Only update state every second to minimize re-renders
      setDisplayTime(timeLeftRef.current);

      if (timeLeftRef.current <= 0) {
        clearInterval(timerRef.current!);
        onTimerEnd();
      }
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { displayTime: formatTime(displayTime), start, stop };
};
