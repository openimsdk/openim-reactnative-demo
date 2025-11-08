import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimeCountOptions = {
  autoStart?: boolean;
};

/**
 * Countdown Hook
 * @param count Initial seconds for the countdown
 * @param options Configuration options, supports auto-starting the countdown
 */
export function useTimeCount(count: number, options: UseTimeCountOptions = {}) {
  const { autoStart = false } = options;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timeCount, setTimeCount] = useState(count);
  const [isCounting, setIsCounting] = useState(autoStart);

  /**
   * Clear the timer to avoid memory leaks
   */
  const clearTimer = useCallback(() => {
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  /**
   * Start the countdown
   */
  const startCountdown = useCallback(() => {
    clearTimer();
    setTimeCount(count);
    setIsCounting(true);

    timerRef.current = setInterval(() => {
      setTimeCount(prev => {
        if (prev <= 1) {
          clearTimer();
          setIsCounting(false);
          return count;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, count]);

  const stopCountdown = useCallback(() => {
    clearTimer();
    setIsCounting(false);
  }, [clearTimer]);

  /**
   * Automatically starts the countdown and cleans up the timer on component unmount
   */
  useEffect(() => {
    if (autoStart) {
      startCountdown();
    }

    return () => {
      clearTimer();
    };
  }, [autoStart, startCountdown, clearTimer]);

  return {
    isCounting,
    timeCount,
    startCountdown,
    stopCountdown
  };
}

