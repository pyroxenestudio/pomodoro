import {render, screen} from '@testing-library/react'
// import ComponentToTest from '../components/practice/testing/testing-component';
import {ComputerDesktopIcon} from '@heroicons/react/24/solid'
import Modal from '../components/modal';
import userEvent, { UserEvent } from '@testing-library/user-event'

// let modal: ReturnType<typeof render>;
let user: UserEvent;
beforeEach(() => {
  user = userEvent.setup();
  render(
    <Modal icon={<ComputerDesktopIcon />} title='Modal Testing'>
      <p>Modal Loaded</p>
    </Modal>
  );
});

test('Show Button Modal', async () => {
  const openButton = screen.getByRole('button');
  const iconSVG = openButton.querySelector('[data-slot="icon"]');
  // const modal = screen.getByRole('dialog');
  expect(openButton).toBeInTheDocument();
  expect(iconSVG).toBeInTheDocument();
});

test('Open Modal', async () => {
  // Open Modal
  const openButton = screen.getByRole('button');
  await user.click(openButton);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText('Modal Loaded')).toBeInTheDocument();
  // Close Button
  expect(screen.getByRole('button').querySelector('[data-slot="icon"]')).toBeInTheDocument();
});

test('Close Modal', async () => {
  // Open Modal
  const openButton = screen.getByRole('button');
  await user.click(openButton);
  // Close Modal
  const closeButton = screen.getByRole('button').querySelector('[data-slot="icon"]');
  if (closeButton) {
    await user.click(closeButton);
  }
  // Check open button
  expect(screen.getByRole('button')).toBeInTheDocument();
  // Check it doesn't have modal's container
  expect(screen.queryByText('Modal Loaded')).toBeNull();
});