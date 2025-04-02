import {render, screen} from '@testing-library/react'
import Button from '../../components/elements/button'
// import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom'
// import Fetch from './fetch'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Button>This is the button</Button>)

  expect(screen.getByText(/This is the button/i)).toBeInTheDocument();
})