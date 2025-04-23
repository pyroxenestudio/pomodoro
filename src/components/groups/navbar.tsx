import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { ColorScheme } from "../color-scheme";
import Modal from "../modal";
import AppSettings from "../settings";
import { SettingsContext } from "../../store/context";
import { useContext } from "react";
import { ModeButtons } from "./mode-buttons";

// interface Props {
//   children: React.JSX.Element[];
// }

export function NavBar() {
  const settings = useContext(SettingsContext)!;
  return (
    <>
      <div id='navbar' className='min-h-16 flex flex-col landscape:flex-row'>
        <div className="flex justify-end landscape:order-1">
          <ColorScheme />
          <Modal
            buttonStyles="p-2"
            title='Settings'
            icon={<Cog6ToothIcon className='size-10'/>}
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