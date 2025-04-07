import Modal from "../modal";

export function Footer() {
  return (
    <footer className='h-12 flex justify-center items-center'>
      <Modal title='About' icon={<span>About</span>} buttonStyles='p-2'>
        <section>
          <h2 className='text-2xl'>Features</h2>
          <ul>
            <li>Dark / Light Mode</li>
            <li>Set your time (Pomodoro, Break, Long Break)</li>
            <li>Sound Alert</li>
            <li>Stop render in the background</li>
          </ul>
          <h2 className='text-2xl mt-2'>Sounds</h2>
          <ul>
            <li><a href='https://pixabay.com/sound-effects/dog-bark-type-01-293298/'>Dog by RibhavAgrawal</a></li>
            <li><a href='https://pixabay.com/sound-effects/dog-bark-type-01-293298/'>Cat by RibhavAgrawal</a></li>
            <li><a href='https://pixabay.com/sound-effects/rocket-launch-306441/'>Rocket by SonixFXSounds</a></li>
          </ul>
        </section>
      </Modal>
      <Modal title='Changelog' icon={<span>Changelog</span>} buttonStyles='p-2'>
        <section>
          <h2 className='text-2xl'>Version: 1.0</h2>
          <ul>
            <li>Initial Release</li>
            <li>Sounds Dog, Car, Rocket</li>
            <li>Countdown with Pomodoro, Break, Long Break</li>
            <li>Dark/Light themes</li>
            <li>Settings and saved in the localstore</li>
          </ul>
        </section>
      </Modal>
      {/* <Button variant='transparent' className='!font-normal'><a href='#'>Pyroxene</a></Button> */}
    </footer>
  )
}