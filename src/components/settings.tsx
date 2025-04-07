import { useContext, useRef } from "react";
import { DispatchContext, SettingsContext } from "../store/context";
import { IStore, soundType } from "../store/reducer";
import LabelInput from "./groups/label-input";
import Button from "./elements/button";
import LabelSelect from "./groups/label-select";
import Sounds from '../sounds';

interface IProps {
  closeCallBackModal?: () => void; 
}

const AppSettings = function ({closeCallBackModal}: IProps) {
  // PROPS

  // CONTEXT
  const settings = useContext(SettingsContext);
  const dispatch = useContext(DispatchContext)!;

  // STATES

  // REF
  const selectSoundsRef = useRef<HTMLSelectElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const currentAudio = useRef<HTMLAudioElement>(null);

  // EFFECTS

  // METHODS
  function save(formData: FormData) {
    // Get data from the form
    const newSettingsData: IStore = {
      pomodoro: parseInt(formData.get('pomodoro') as string),
      break: parseInt(formData.get('break') as string),
      longBreak: parseInt(formData.get('longbreak') as string),
      interval: parseInt(formData.get('interval') as string),
      sound: formData.get('sounds') as soundType,
      volume: parseInt(formData.get('volume') as string)
    }
    // Join old settings width new Settings and save it in the localstore
    const stringSettings = localStorage.getItem('settings');
    const oldSettings = stringSettings ? JSON.parse(stringSettings) : {};
    const newSettings = Object.assign({}, oldSettings, newSettingsData);

    localStorage.setItem('settings', JSON.stringify(newSettings));

    // Close Modal
    if (closeCallBackModal) {
      closeCallBackModal()
    };

    // Stop Audio
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    dispatch({
      type: 'saveConfig',
      payload: newSettingsData
    });
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

  // RENDER
  return (
    <form action={save}>
      <LabelInput name='pomodoro' title={'Pomodoro'} type='number' defaultValue={settings?.pomodoro}/>
      <LabelInput name='break' title={'Break'} type='number' defaultValue={settings?.break}/>
      <LabelInput name='longbreak' title={'Long Break'} type='number' defaultValue={settings?.longBreak}/>
      <LabelInput name='interval' title={'How many breaks before Long Break'} type='number' defaultValue={settings?.interval}/>
      <LabelInput name='volume' title={'Volume'} type='range' defaultValue={settings?.volume} max='100' min='0' ref={volumeRef}/>
      <LabelSelect title='Sounds' options={Object.keys(Sounds)} name='sounds' defaultValue={settings?.sound} ref={selectSoundsRef}/>
      <Button variant='info' onClick={testSound} className='flex flex-col text-left mb-1'>Test Sound</Button>
      <Button type='submit' className='w-30 mt-3' variant="success">Save</Button>
    </form>
  );
}

export default AppSettings;