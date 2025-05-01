import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Alert from "../components/alert";

dayjs.extend(relativeTime);

// TODO It is using many useState for get the status, try to reduce it and change some of them to useRef
export default function useCountDown(maxMinutes: number, callback?: (sound: boolean) => void) {
  // STATES
  // check if is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // check if is paused or not
  const [isPause, setIsPause] = useState<boolean>(false);
  // The minutes and seconds
  const [time, setTime] = useState<{minutes: number, seconds: number, percentage: number}>();
  // Hidden
  const [isHidden, setIsHidden] = useState<boolean>(false);
  // Alert when tab is from resume information
  const [freezeTime, setFreezeTime] = useState<string | null>(null);

  // REF
  // time in milliseconds when the clock started
  const startTime = useRef<number>(0);
  // default timeout when the clock is running
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Time passed before the clock is paused
  const lastElapsedTime = useRef<number>(null);

  const updateClock = function() {
    if (startTime.current) {
      const elapsedTime = performance.now() - startTime.current;
      const nextInterval = 1000 - (elapsedTime % 1000); // Fix interval to be always 1 seconds (1000)
      let minutes = Math.floor(maxMinutes - (elapsedTime / 60000));
      const seconds = 59 - Math.floor((elapsedTime % 60000) / 1000);
      const percentage = (elapsedTime * 100) / (maxMinutes * 60000);

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
        stop();
      }
    }
  }

  // is called when the tab is in the background
  const backgroundClock = useCallback(function() {
    if (isPause) return;
    setIsHidden(document.hidden);
  }, [isPause, isRunning]);

  const backgroundFreeze = useCallback(function () {
    localStorage.setItem('frozenTime', Date.now().toString());
  }, [isPause, isRunning]);

  const backgroundResume = useCallback(function () {
    let localstorageTime: string | number | null = localStorage.getItem('frozenTime');
    if (localstorageTime) {
      localstorageTime = parseFloat(localstorageTime);
      setFreezeTime(dayjs(localstorageTime).fromNow());
    }
    
  }, [isPause, isRunning]);

  // Remove and add event listener visibilitychange for backgroundClock function
  useEffect(() => {
    if (!isPause && isRunning) {
      document.addEventListener('visibilitychange', backgroundClock);
      document.addEventListener('freeze', backgroundFreeze);
      document.addEventListener('resume', backgroundResume);
    }
    return () => {
      document.removeEventListener('visibilitychange', backgroundClock);
      document.removeEventListener('freeze', backgroundFreeze);
      document.removeEventListener('resume', backgroundResume);
    };
  },[isPause, isRunning]);

  const start = function() {
    if (isRunning) return;
    startTime.current = performance.now();
    setIsRunning(true);
    // setWasStopped(false);
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

  const stop = function(event?: React.MouseEvent | false) {
    const isAnUserEvent: boolean = !!event;
    clearTimeout(timeout.current);
    startTime.current = 0;

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
    if (callback) {
      callback(isAnUserEvent);
    }
  }

  return {
    start,
    stop,
    pause,
    time,
    isRunning,
    isPause,
    isHidden,
    freezeTime: {
      message: freezeTime,
      callback: () => setFreezeTime(null)
    }
  };
}