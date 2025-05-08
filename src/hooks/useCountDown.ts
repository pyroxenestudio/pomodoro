import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InactiveNotification from "../utils/inactive-notification";

dayjs.extend(relativeTime);

// TODO It is using many useState for get the status, try to reduce it and change some of them to useRef
export default function useCountDown(maxMinutes: number, inactiveNotification: InactiveNotification, callback?: (sound: boolean) => void) {
  // STATES
  // check if is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // check if is paused or not
  const [isPause, setIsPause] = useState<boolean>(false);
  // The minutes and seconds
  const [time, setTime] = useState<{minutes: number, seconds: number, percentage: number}>();
  // Hidden
  const [isHidden, setIsHidden] = useState<boolean>(false);

  // REF
  // time in milliseconds when the clock started
  const startTime = useRef<number>(0);
  // default timeout when the clock is running
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Time passed before the clock is paused
  const lastElapsedTime = useRef<number>(null);

  // Check if the pomodoro is already finished when the app start or if is not finished, it restore it.
  useEffect(() => {
    if ('wasDiscarded' in document) {
      inactiveNotification.stopNotification();
      const date = localStorage.getItem('freezeDate');
      let lastElapsedTime: string | number | null = localStorage.getItem('lastElapsedTime');
      // Check if the time after freeze is longer than pomodoro minutes
      if (date && lastElapsedTime) {
        const dateBeforeFreeze = dayjs(Number(date));
        // If it wasn't longer, then restore the time to continue
        lastElapsedTime = dayjs().diff(dateBeforeFreeze) + Number(lastElapsedTime);
        if (lastElapsedTime < (maxMinutes * 60000)) {
          // const lastElapsedTime = localStorage.getItem('lastElapsedTime');
          if (lastElapsedTime) {
            startTime.current = performance.now() - lastElapsedTime;
            start();
          }
        }
      }
      localStorage.removeItem('freezeDate');
      localStorage.removeItem('lastElapsedTime');
    }
  }, []);

  const updateClock = function() {
    if (startTime.current) {
      const elapsedTime = performance.now() - startTime.current;
      const nextInterval = 1000 - (elapsedTime % 1000); // Fix interval to be always 1 seconds (1000)
      let minutes = Math.floor(maxMinutes - (elapsedTime / 60000));
      const seconds = 59 - Math.floor((elapsedTime % 60000) / 1000);
      const percentage = (elapsedTime * 100) / (maxMinutes * 60000);
      
      // If the tab is inactive, it can resume with negative minutes or seconds
      // That is why the minor or equal
      if (minutes <= 0 && seconds <= 0) {
        stop();
        return;
      }

      // This is because at first the minutes maybe is exactly 1
      if (minutes === maxMinutes) {
        minutes -= 1;
      }

      timeout.current = setTimeout(updateClock, nextInterval);
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
      if (inactiveNotification.hasPermissions()) {
        inactiveNotification.createInactiveNotification({
          message: 'Time Up!!',
          time: getRestTime(),
          options: {
            icon: new URL('../../public/icon.svg', import.meta.url).toString()
          }
        });
      }
    } else {
      if (inactiveNotification.hasPermissions()) {
        inactiveNotification.stopNotification();
      }
      localStorage.removeItem('lastElapsedTime');
      localStorage.removeItem('freezeDate');
    }
    setIsHidden(document.hidden);
  }, [isPause, isRunning]);

  const unloadDocument = useCallback((event: Event) => {
    event.preventDefault();
    // Included for legacy support, e.g. Chrome/Edge < 119
    event.returnValue = true;
  }, []);

  // Remove and add event listener visibilitychange for backgroundClock function
  useEffect(() => {
    if (!isPause && isRunning) {
      document.addEventListener('visibilitychange', backgroundClock);
      window.addEventListener('beforeunload', unloadDocument)
    }
    return () => {
      document.removeEventListener('visibilitychange', backgroundClock);
      window.removeEventListener('beforeunload', unloadDocument);
    };
  },[isPause, isRunning]);

  const start = function() {
    if (isRunning) return;
    if (startTime.current === 0) {
      startTime.current = performance.now();
    }
    setIsRunning(true);
    updateClock();
  }

  const pause = function() {
    if (isRunning) {
      if (!isPause) {
        clearInterval(timeout.current);
        lastElapsedTime.current = performance.now() - startTime.current;
      } else {
        if (lastElapsedTime.current) {
          // To get the same elapsed time before it was paused (if it was 20 second, so we get the same 20 seconds now)
          startTime.current = performance.now() - lastElapsedTime.current;
        }
        updateClock();
      }
      setIsPause((oldPause) => !oldPause);
    }
  }

  const getRestTime = () => {
    const elapsedTime = performance.now() - startTime.current;
    return (maxMinutes * 60000) - elapsedTime;
  }

  const stop = function(event?: React.MouseEvent | boolean) {
    const isAnUserEvent: boolean = !!event;
    clearTimeout(timeout.current);
    startTime.current = 0;
    localStorage.removeItem('lastElapsedTime');
    localStorage.removeItem('freezeDate');

    if (!isAnUserEvent) {
      setTime({
        minutes: maxMinutes,
        seconds: 0,
        percentage: 100
      });
      // For the small bar at the top
      setTimeout(() => {
        setTime({
          minutes: maxMinutes,
          seconds: 0,
          percentage: 0
        });
      }, 1000);
    } else {
      setTime({
        minutes: maxMinutes,
        seconds: 0,
        percentage: 0
      });
    }

    setIsRunning(false);
    setIsPause(false);
    setIsHidden(false);
    if (callback) {
      callback(isAnUserEvent);
    }
  }

  // Save the state if is hidden, because it can get freeze
  if (isRunning) {
    localStorage.setItem('lastElapsedTime', (performance.now() - startTime.current).toString());
    localStorage.setItem('freezeDate', dayjs().valueOf().toString());
  }

  return {
    start,
    stop,
    pause,
    time,
    isRunning,
    isPause,
    isHidden,
  };
}