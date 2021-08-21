import { render, screen, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import GistForks from '../components/GistForks.tsx';

jest.mock('axios');

afterEach(() => {
  cleanup();
});

it('should render GistForks component', async () => {
  axios.get.mockResolvedValue({ data: [] });
  render(<GistForks />);
  const gistForksElement = screen.queryByTestId('gist-forks');
  
  // with no gists, this element should not render
  await waitFor(() => {
    expect(gistForksElement).not.toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
  });
});

it('properly renders forks of a given gist', async () => {
  const mockData = [
    {
      id: 'test-gist1',
      html_url: 'http://www.gist_url.com',
      owner: {
        login: 'testuser1',
        avatar: 'http://www.gist_url.com/avatar1',
      },
    }
  ];
  axios.get.mockResolvedValue({ data: mockData });
  render(<GistForks gistId={'test-id'} />);
  
  await waitFor(() => {
    const gistForksElement = screen.queryByTestId('gist-forks');
    const gistForkElement = screen.queryByTestId('test-gist1');

    expect(axios.get).toHaveBeenCalled();
    // check the gistsForks block exists
    expect(gistForksElement).toBeInTheDocument();
    // check if the given gist exists
    expect(gistForkElement).toBeInTheDocument();
  });
});

it('renders only the top 3 gists', async () => {
  const mockData = [
    {
      id: 'test-gist1',
      html_url: 'http://www.gist_url.com',
      owner: {
        login: 'testuser1',
        avatar: 'http://www.gist_url.com/avatar1',
      },
    },
    {
      id: 'test-gist2',
      html_url: 'http://www.gist_url.com',
      owner: {
        login: 'testuser2',
        avatar: 'http://www.gist_url.com/avatar2',
      },
    },
    {
      id: 'test-gist3',
      html_url: 'http://www.gist_url.com',
      owner: {
        login: 'testuser3',
        avatar: 'http://www.gist_url.com/avatar3',
      },
    },
    {
      id: 'test-gist4',
      html_url: 'http://www.gist_url.com',
      owner: {
        login: 'testuser4',
        avatar: 'http://www.gist_url.com/avatar4',
      },
    }, 
  ];
  axios.get.mockResolvedValue({ data: mockData });
  render(<GistForks gistId={'test-id'} />);

  await waitFor(() => {
    const gistForksElement = screen.queryByTestId('gist-forks');
    const gistForksList = [
      screen.queryByTestId('test-gist1'),
      screen.queryByTestId('test-gist2'),
      screen.queryByTestId('test-gist3'),
      screen.queryByTestId('test-gist4'),
    ];

    expect(axios.get).toHaveBeenCalled();
    // check the gistForks block exists
    expect(gistForksElement).toBeInTheDocument();
    // only top 3 gists forks should exist
    expect(gistForksList[0]).toBeInTheDocument();
    expect(gistForksList[1]).toBeInTheDocument();
    expect(gistForksList[2]).toBeInTheDocument();
    expect(gistForksList[3]).not.toBeInTheDocument();
  });
});
