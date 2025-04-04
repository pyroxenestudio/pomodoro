import Modal from "../modal";

export function Footer() {
  return (
    <footer className='h-12 flex justify-center items-center'>
      <Modal title='About' icon={<span>About</span>} buttonStyles='p-2'>
        <section>
          This is an open source pomodoro
          <h2 className='text-2xl'>Features</h2>
          <ul className=''>
            <li>Dark / Light Mode</li>
            <li>Set your time (Pomodoro, Break, Long Break)</li>
            <li>Working in the background using minimal resources</li>
          </ul>
        </section>
      </Modal>
      <Modal title='Changelog' icon={<span>Changelog</span>} buttonStyles='p-2'>
        <section>
        </section>
      </Modal>
      {/* <Button variant='transparent' className='!font-normal'><a href='#'>Pyroxene</a></Button> */}
    </footer>
  )
}