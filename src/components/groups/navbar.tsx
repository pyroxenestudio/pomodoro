import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { ColorScheme } from "../color-scheme";
import Modal from "../modal";
import AppSettings from "../settings";
import { SettingsContext } from "../../store/context";
import { useContext } from "react";
import { ModeButtons } from "./mode-buttons";

export function NavBar() {
  const settings = useContext(SettingsContext)!;
  return (
    <>
      <div id='navbar' className='min-h-16 flex flex-col relative'>
        <div className="flex justify-end h-16 landscape:absolute landscape:right-0">
          <ColorScheme />
          <Modal
            buttonStyles="p-2 h-full"
            title='Settings'
            icon={<Cog6ToothIcon className='h-full'/>}
            hasCallback
            canOpenModal={!settings.isRunning}>
            <AppSettings />
          </Modal>
        </div>
      <ModeButtons isRunning={settings.isRunning}/>
      </div>
    </>
  )
}