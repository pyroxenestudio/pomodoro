import { useContext, useEffect, useRef, useState } from "react";
import { DispatchContext, SettingsContext } from "../store/context";
import { ISettings, IStore, soundType } from "../store/reducer";
import LabelInput from "./groups/label-input";
import Button from "./elements/button";
import LabelSelect from "./groups/label-select";
import Sounds from '../sounds';
import { styleTheme } from "../theme";

interface IProps {
  closeCallBackModal?: () => void; 
}

const AppSettings = function ({closeCallBackModal}: IProps) {
  // PROPS

  // CONTEXT
  const settings = useContext(SettingsContext)!;
  const dispatch = useContext(DispatchContext)!;
  const notifications = settings.inactiveNotification.notificationController;
  // STATES
  // It is a state because depends on the user, if either accept the permission for notifications
  const [notificationPermission, setNotificationPermission] = useState(() => notifications.hasPermissions && notifications.canShowNotification);

  // REF
  const selectSoundsRef = useRef<HTMLSelectElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const currentAudio = useRef<HTMLAudioElement>(null);
  const isSaved = useRef<boolean>(false);

  // EFFECTS
  // Save the settings in the localstorage
  useEffect(() => {
    
    const newSettings: ISettings = {
      pomodoro: settings.pomodoro,
      break: settings.break,
      longBreak: settings?.longBreak,
      interval: settings?.interval, // How many breaks between Long breaks. Ej: 1 would mean only one break. 
      sound: settings?.sound,
      volume: settings?.volume,
      notificationPermission: settings?.notificationPermission
    }

    if (isSaved.current) {
      localStorage.setItem('settings', JSON.stringify(newSettings));
    }

    // Close Modal
    if (closeCallBackModal && isSaved.current) {
      closeCallBackModal();
    };
  }, [settings]);

  // METHODS
  function save(formData: FormData) {
    // Get data from the form
    // TODO I am repeating this object two times, join then to use only one
    const newSettingsData: Omit<IStore, 'isRunning' | 'inactiveNotification'> = {
      pomodoro: parseInt(formData.get('pomodoro') as string),
      break: parseInt(formData.get('break') as string),
      longBreak: parseInt(formData.get('longbreak') as string),
      interval: parseInt(formData.get('interval') as string),
      sound: formData.get('sounds') as soundType,
      volume: parseInt(formData.get('volume') as string),
      notificationPermission: (() => {
        const permission = !!formData.get('permission');
        notifications.setCanShowNotification(permission);
        return permission;
      })()
    }

    // Stop Audio
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    dispatch({
      type: 'saveConfig',
      payload: newSettingsData as ISettings
    });

    isSaved.current = true;
  }
  // Try the audio and volume
  const testSound = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectSoundsRef.current?.value && volumeRef.current?.value) {
      if (currentAudio.current) {
        currentAudio.current.pause();
      }
      currentAudio.current = new Audio(Sounds[selectSoundsRef.current.value as soundType]);
      currentAudio.current.volume = parseInt(volumeRef.current.value) / 100;
      currentAudio.current.play();
    }
  }

  const requestNotificationPermission = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (notifications.hasPermissions) {
      setNotificationPermission(e.target.checked );
    } else {
      notifications.requestPermission().then(() => {
        setNotificationPermission(true);
      }).catch(() => {
        setNotificationPermission(false);
      });
    }
  }

  // RENDER
  return (
    <>
      <aside className={`info mb-2 ${styleTheme.padding.normal}`}>
      You can move between browsers' tabs, but If the tab get inactive, the clock will stop.
      </aside>
      <form action={save}>
        <LabelInput name='pomodoro' title={'Pomodoro'} type='number' defaultValue={settings?.pomodoro}/>
        <LabelInput name='break' title={'Break'} type='number' defaultValue={settings?.break}/>
        <LabelInput name='longbreak' title={'Long Break'} type='number' defaultValue={settings?.longBreak}/>
        <LabelInput name='interval' title={'How many breaks before Long Break'} type='number' defaultValue={settings?.interval}/>
        <LabelInput name='volume' title={'Volume'} type='range' defaultValue={settings?.volume} max='100' min='0' ref={volumeRef}/>
        <LabelSelect title='Sounds' options={Object.keys(Sounds)} name='sounds' defaultValue={settings?.sound} ref={selectSoundsRef}/>
        <Button variant='info' onClick={testSound} className='flex flex-col text-left mb-1'>Test Sound</Button>
        <LabelInput row title='Notification Permission' name='permission' type='checkbox' checked={notificationPermission} onChange={requestNotificationPermission}/>
        <Button type='submit' className='w-30 mt-3' variant="success">Save</Button>
      </form>
    </>
  );
}

export default AppSettings;