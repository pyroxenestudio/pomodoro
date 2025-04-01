import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { ColorScheme } from "../elements/color-scheme";
import Modal from "../modal";
import AppSettings from "../settings";

// interface Props {
//   children: React.JSX.Element[];
// }

export function NavBar() {
  return (
    <div id='navbar' className='min-h-12 pt-2 flex justify-end'>
      <ColorScheme />
      <Modal
        title='Settings'
        icon={<Cog6ToothIcon className='size-10'/>}
        hasCallback>
        <AppSettings />
      </Modal>
    </div>
  )
}