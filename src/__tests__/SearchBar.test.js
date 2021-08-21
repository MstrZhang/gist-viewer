import { render, screen, cleanup } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

afterEach(() => {
  cleanup();
});

it('should render SearchBar component', () => {
  render(<SearchBar />);
  const searchBarElement = screen.getByTestId('searchBar');
  const searchMessageElement = screen.getByTestId('searchMessage');

  expect(searchBarElement).toBeInTheDocument();
  expect(searchMessageElement).toHaveTextContent('No gists found ...');
});
