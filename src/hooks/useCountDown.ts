import { useCallback, useEffect, useRef, useState } from "react";
const DEV = import.meta.env.DEV

export default function useCountDown(maxMinutes: number, callback?: () => void) {
  // STATES
  // check if is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // Check if was stopped
  // It start as true, because if it is false call the callback and change the mode
  const [wasStopped, setWasStopped] = useState<boolean>(true);
  // check if is paused or not
  const [isPause, setIsPause] = useState<boolean>(false);
  // The minutes and seconds
  const [time, setTime] = useState<{minutes: number, seconds: number, percentage: number}>();

  // REF
  // timeout when the tab is in the background
  const hiddenTimer = useRef<any>(null);
  // time in milliseconds when the clock started
  const startTime = useRef<number>(0);
  // default timeout when the clock is running
  const timeout = useRef<any>(null);
  // last time by performance.now() before the tab is in the background
  const lastTimeVisible = useRef<any>(null);
  // Time passed before the clock is paused
  const lastElapsedTime = useRef<number>(null);

  const updateClock = function() {
    if (startTime.current) {
      const elapsedTime = performance.now() - startTime.current;

      // Fix interval to be always 1 seconds (1000)
      const nextInterval = 1000 - (elapsedTime % 1000);
      const minutes = Math.floor(maxMinutes - (elapsedTime / 60000));
      let seconds = 59 - Math.floor((elapsedTime % 60000) / 1000);
      const percentage = Math.floor((elapsedTime * 100) / (maxMinutes * 60000));
      if (minutes > 0 || seconds > 0) {
        timeout.current = setTimeout(updateClock, nextInterval);
      } else {
        stopByInterval();
      }

      setTime({
        minutes,
        seconds,
        percentage
      });
    }
  }

  // is called when the tab is in the background
  const backgroundClock = useCallback(function() {
    if (isPause) return;
    if (document.hidden) {
      if (startTime.current) {
        clearTimeout(timeout.current);

        lastTimeVisible.current = performance.now();
        const elapsedTime = lastTimeVisible.current - startTime.current;
        hiddenTimer.current = setTimeout(() => {
          stopByInterval();
        }, maxMinutes * 60000 - elapsedTime);
      }
    } else {
      clearTimeout(hiddenTimer.current);
      // ONLY FOR DEVELOP
      if (DEV) {
        clearTimeout(hiddenTimer.current - 1);
      }
      // Check if the clock is finished
      const elapsedTime = performance.now() - startTime.current;
      const minutes = maxMinutes - Math.floor(elapsedTime / 60000);
      let seconds = 59 - Math.floor((elapsedTime % 60000) / 1000);
      if (minutes > 0 || seconds > 0) {
        updateClock();
      }
    }
    // TODO Check if I can remove the isRunning or isPause, the problem is the maxMiunte, becuase it doesn't get update after getting the information from localStore
  }, [isPause, isRunning]);

  // Remove and add event listener visibilitychange for backgroundClock function
  useEffect(() => {
    if (!isPause && isRunning) {
      document.addEventListener('visibilitychange', backgroundClock);
    }
    // This when the countdown finish
    if (!isRunning && callback && !wasStopped) {
      callback();
    }
    return () => document.removeEventListener('visibilitychange', backgroundClock);
  },[isPause, isRunning]);

  const start = function() {
    if (isRunning) return;
    startTime.current = performance.now();
    setIsRunning(true);
    setWasStopped(false);
    updateClock();
  }

  const pause = function() {
    if (isRunning) {
      if (!isPause) {
        clearInterval(timeout.current);
        lastElapsedTime.current = performance.now() - startTime.current;
      } else {
        if (lastElapsedTime.current) {
          startTime.current = performance.now() - lastElapsedTime.current;
        }
        updateClock();
      }
      setIsPause((oldPause) => !oldPause);
    }
  }

  const stopByInterval = function() {
    clearTimeout(timeout.current);
    startTime.current = 0;
    setTime({
      minutes: maxMinutes,
      seconds: 0,
      percentage: 0
    });
    setIsRunning(false);
    setIsPause(false);
  }

  const stop = function() {
    clearTimeout(timeout.current);
    startTime.current = 0;
    setTime({
      minutes: maxMinutes,
      seconds: 0,
      percentage: 0
    });
    setIsRunning(false);
    setIsPause(false);
    setWasStopped(true);
  }

  return {
    start,
    stop,
    pause,
    time,
    isRunning,
    isPause
  };
}