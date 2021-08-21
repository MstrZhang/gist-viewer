import { render, screen, cleanup } from '@testing-library/react';
import App from '../App.tsx';

afterEach(() => {
  cleanup();
});

it('should render App component', () => {
  render(<App />);
  const appElement = screen.getByTestId('app');

  expect(appElement).toBeInTheDocument();
});
