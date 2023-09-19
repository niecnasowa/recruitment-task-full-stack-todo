import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TasksList } from './TasksList';

import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
}));

describe('TasksList', () => {
  it('Should show tasks', async () => {
    // @ts-ignore
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            content: 'content 1',
            done: false,
            id: 1,
          },
        ],
      })
    );

    await act(async () => {
      render(<TasksList />);
    });

    expect(screen.getByText(/content 1/i)).toBeInTheDocument();
  });

  it('Should add task', async () => {
    axios.get
      // @ts-ignore
      .mockImplementationOnce(() => Promise.resolve({ data: [] }))
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            {
              content: 'New Task',
              done: false,
              id: 1,
            },
          ],
        })
      );

    // @ts-ignore
    axios.post.mockImplementation(() => Promise.resolve({ data: [] }));

    await act(async () => {
      render(<TasksList />);
    });

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox'), 'New Task');
      await userEvent.click(screen.getByRole('button'));
    });

    // Check if endpoint was called with correct data
    expect(axios.post).toHaveBeenCalledWith('/tasks', {
      content: 'New Task',
    });

    // Check if task is displayed to user
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });

  it('Should remove task', async () => {
    axios.get
      // @ts-ignore
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            {
              content: 'content 1',
              done: false,
              id: 1,
            },
          ],
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: [],
        })
      );

    // @ts-ignore
    axios.delete.mockImplementation(() => Promise.resolve({ data: {} }));

    await act(async () => {
      render(<TasksList />);
    });

    expect(screen.getByText(/content 1/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(screen.getByText(/Delete/i));
    });

    // Check if endpoint was called with correct data
    expect(axios.delete).toHaveBeenCalledWith('/tasks/1');

    // Check if task is no longer displayed
    expect(screen.queryByText(/content 1/i)).not.toBeInTheDocument();
  });

  it('Should mark task as done', async () => {
    axios.get
      // @ts-ignore
      .mockImplementation(() =>
        Promise.resolve({
          data: [
            {
              content: 'content 1',
              done: false,
              id: 1,
            },
          ],
        })
      );

    // @ts-ignore
    axios.patch.mockImplementation(() => Promise.resolve({ data: {} }));

    await act(async () => {
      render(<TasksList />);
    });

    // @ts-ignore
    expect(screen.getByRole('checkbox').checked).toBe(false);

    await act(async () => {
      await userEvent.click(screen.getByRole('checkbox'));
    });

    // Check if endpoint was called with correct data
    expect(axios.patch).toHaveBeenCalledWith('/tasks/1', { done: true });

    // Check if task is checked
    // @ts-ignore
    expect(screen.getByRole('checkbox').checked).toBe(true);
  });
});
