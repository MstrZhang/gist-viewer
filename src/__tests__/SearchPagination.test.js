import { render, screen, cleanup } from '@testing-library/react';
import SearchPagination from '../components/SearchPagination.tsx';

afterEach(() => {
  cleanup();
});

it('should render SearchPagination component', () => {
  render(<SearchPagination />);
  const searchPaginationElement = screen.getByTestId('search-pagination');

  expect(searchPaginationElement).toBeInTheDocument();
});
