import { render, screen, cleanup } from '@testing-library/react';
import SearchResults from '../components/SearchResults.tsx';

afterEach(() => {
  cleanup();
});

it('should render SearchResults component', () => {
  render(<SearchResults results={[]} />);
  const searchResultsElement = screen.getByTestId('search-results');

  expect(searchResultsElement).toBeInTheDocument();
});

it('should properly render search results if they exist', () => {
  const mockData = [
    {
      id: 'abc123',
      description: 'this is the first gist',
      files: [
        {
          testfile1: {
            raw_url: 'http://testfile1.com',
            filename: 'testfileabc1',
            language: 'Python',
          }
        },
        {
          testfile2: {
            raw_url: 'http://testfile2.com',
            filename: 'testfileabc2',
            language: 'HTML',
          }
        },
      ],
    },
    {
      id: 'def456',
      description: 'this is the second gist',
      files: [
        {
          mockfile1: {
            raw_url: 'http://mockfile1.com',
            filename: 'mockfileabc1',
            language: 'CSS',
          }
        },
      ],
    },
  ];
  
  render(<SearchResults results={mockData} />);

  const gistsList = [
    screen.queryByTestId('abc123'),
    screen.queryByTestId('def456'),
  ];

  gistsList.forEach((gist) => {
    expect(gist).toBeInTheDocument();
  });
});
