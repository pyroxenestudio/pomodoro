import { useContext, useEffect } from "react";
import { DispatchContext, SettingsContext } from "../store/context";
import { IStore } from "../store/reducer";
import LabelInput from "./groups/label-input";
import Button from "./elements/button";

interface IProps {
  closeCallBackModal?: () => void; 
}

const AppSettings = function (props: IProps) {
  // PROPS
  const {closeCallBackModal} = props;

  // CONTEXT
  const settings = useContext(SettingsContext);
  const dispatch = useContext(DispatchContext)!;

  // STATES

  // REF

  // EFFECTS

  // CONSTRUCTOR EFFECT
  useEffect(() => {

  }, []);

  // METHODS
  function save(formData: FormData) {
    const newSettingsData: IStore = {
      pomodoro: parseInt(formData.get('pomodoro') as string),
      break: parseInt(formData.get('break') as string),
      longBreak: parseInt(formData.get('longbreak') as string),
      interval: parseInt(formData.get('interval') as string),
      volume: parseInt(formData.get('volume') as string)
    }
    const stringSettings = localStorage.getItem('settings');
    const oldSettings = stringSettings ? JSON.parse(stringSettings) : {};
    const newSettings = Object.assign({}, oldSettings, newSettingsData);

    localStorage.setItem('settings', JSON.stringify(newSettings));

    if (closeCallBackModal) closeCallBackModal();

    dispatch({
      type: 'saveConfig',
      payload: newSettingsData
    })
  }

  // RENDER
  return (
    <form action={save}>
      <LabelInput name='pomodoro' title={'Pomodoro'} type='number' defaultValue={settings?.pomodoro}/>
      <LabelInput name='break' title={'Break'} type='number' defaultValue={settings?.break}/>
      <LabelInput name='longbreak' title={'Long Break'} type='number' defaultValue={settings?.longBreak}/>
      <LabelInput name='interval' title={'How many breaks before Long Break'} type='number' defaultValue={settings?.interval}/>
      <LabelInput name='volume' title={'Volume'} type='range' defaultValue={settings?.volume} max='100' min='0'/>
      <Button type='submit' className='w-30 mt-3'>Save</Button>
    </form>
  );
}

export default AppSettings;