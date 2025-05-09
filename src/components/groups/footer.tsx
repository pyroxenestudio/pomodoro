import Modal from "../modal";

export function Footer() {
  return (
    <footer className='min-h-16 flex justify-center items-center'>
      <Modal title='About' icon={<span>About</span>} buttonStyles='p-2'>
        <section>
          <h2 className='text-2xl'>Features</h2>
          <ul>
            <li>Dark / Light Mode</li>
            <li>Set your time (Pomodoro, Break, Long Break)</li>
            <li>Sound Alert</li>
          </ul>
          <h2 className='text-2xl mt-2'>Sounds</h2>
          <ul>
            <li><a href='https://pixabay.com/sound-effects/dog-bark-type-01-293298/'>Dog by RibhavAgrawal</a></li>
            <li><a href='https://pixabay.com/sound-effects/cat-meowing-type-02-293290/'>Cat by RibhavAgrawal</a></li>
            <li><a href='https://pixabay.com/sound-effects/rocket-launch-306441/'>Rocket by SonixFXSounds</a></li>
          </ul>
        </section>
      </Modal>
      <Modal title='Changelog' icon={<span>Changelog</span>} buttonStyles='p-2'>
        <section>
          <h2 className='text-2xl'>Version: 1.1</h2>
          <ul className='mb-2'>
            <li>Save state so if the countdown is running and the tab get inactive or close, you can resume it</li>
            <li>Show a notification when the tab become inactive and your time is up in any mode (Pomodoro, break, long break)</li>
            <li>Show then countdown in the title tab when the tab is not focused</li>
          </ul>
          <h2 className='text-2xl'>Version: 1.0</h2>
          <ul>
            <li>Initial Release</li>
            <li>Sounds Dog, Car, Rocket</li>
            <li>Countdown with Pomodoro, Break, Long Break</li>
            <li>Dark/Light themes</li>
            <li>The information is saved in the localStorage</li>
          </ul>
        </section>
      </Modal>
    </footer>
  )
}