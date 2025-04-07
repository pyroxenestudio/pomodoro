import { useCallback, useEffect, useRef, useState } from "react";
const DEV = import.meta.env.DEV

// TODO It is using many useState for get the status, try to reduce it and change some of them to useRef
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
  const hiddenTimer = useRef<ReturnType<typeof setTimeout> | number>(undefined);
  // time in milliseconds when the clock started
  const startTime = useRef<number>(0);
  // default timeout when the clock is running
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  // last time by performance.now() before the tab is in the background
  const lastTimeVisible = useRef<number>(null);
  // Time passed before the clock is paused
  const lastElapsedTime = useRef<number>(null);

  const updateClock = function() {
    if (startTime.current) {
      const elapsedTime = performance.now() - startTime.current;
      const nextInterval = 1000 - (elapsedTime % 1000); // Fix interval to be always 1 seconds (1000)
      let minutes = Math.floor(maxMinutes - (elapsedTime / 60000));
      const seconds = 59 - Math.floor((elapsedTime % 60000) / 1000);
      const percentage = Math.floor((elapsedTime * 100) / (maxMinutes * 60000));

      // This is because at first the minutes maybe is exactly 1
      if (minutes === maxMinutes) {
        minutes -= 1;
      }

      if (minutes > 0 || seconds > 0) {
        timeout.current = setTimeout(updateClock, nextInterval);
        setTime({
          minutes,
          seconds,
          percentage
        });
      } else {
        stopByInterval();
      }
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
        clearTimeout(hiddenTimer.current ? hiddenTimer.current as number - 1 : hiddenTimer.current);
      }
      // Check if the clock is finished
      const elapsedTime = performance.now() - startTime.current;
      const minutes = maxMinutes - Math.floor(elapsedTime / 60000);
      const seconds = 59 - Math.floor((elapsedTime % 60000) / 1000);
      if (minutes > 0 || seconds > 0) {
        updateClock();
      }
    }
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

  // TODO use only one stopInterval
  // TODO Eliminar el intervalo
  const stopByInterval = function() {
    clearTimeout(timeout.current);
    startTime.current = 0;
    setTime({
      minutes: maxMinutes,
      seconds: 0,
      percentage: 100
    });
    setIsRunning(false);
    setIsPause(false);
    // Remove the percentage after 1 second
    setTimeout(() => {
      setTime({
        minutes: maxMinutes,
        seconds: 0,
        percentage: 0
      });
    }, 1000);
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