import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import { createBlogPost } from '@/actions/blogposts/post';
import { getAllEntities } from '@/actions/entity/get';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import CreateBlogpostPage from '@/app/espace-prive/dashboard/blogposts/create/page';

// Mock the necessary modules
// jest.mock('@/actions/blogposts/post');
// jest.mock('@/actions/entity/get');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockCreateBlogPost = createBlogPost as jest.Mock;
const mockGetAllEntities = getAllEntities as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const queryClient = createTestQueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={null}>{children}</SessionProvider>
  </QueryClientProvider>
);

describe('CreateBlogpostPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('should render the form with initial values', async () => {
    mockGetAllEntities.mockResolvedValueOnce([]); // Mock resolved value for getAllEntities

    await act(async () => {
      render(<CreateBlogpostPage />, { wrapper });
    });

    expect(screen.getByLabelText(/Titre du post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Entité liée/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Publier le post/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Le post doit il etre public/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/contenu du post/i)).toBeInTheDocument();
  });

  it('should display entities in the select dropdown', async () => {
    mockGetAllEntities.mockResolvedValueOnce([
      {
        id: '1',
        name: 'Entity 1',
        description: 'Description 1',
        slug: 'entity-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Entity 2',
        description: 'Description 2',
        slug: 'entity-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    await act(async () => {
      render(<CreateBlogpostPage />, { wrapper });
    });

    await waitFor(() => {
      expect(screen.getByText(/Entity 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Entity 2/i)).toBeInTheDocument();
    });
  });

  it('should handle form submission successfully', async () => {
    mockCreateBlogPost.mockResolvedValueOnce({
      success: 'Blog post created successfully',
    });

    mockGetAllEntities.mockResolvedValueOnce([]); // Ensure entities are loaded

    await act(async () => {
      render(<CreateBlogpostPage />, { wrapper });
    });

    fireEvent.change(screen.getByLabelText(/Titre du post/i), {
      target: { value: 'New Blog Post' },
    });
    fireEvent.change(screen.getByLabelText(/Entité liée/i), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByLabelText(/contenu du post/i), {
      target: { value: 'This is the content of the blog post' },
    });

    fireEvent.click(screen.getByText(/Soumettre/i));

    await waitFor(() => {
      expect(mockCreateBlogPost).toHaveBeenCalledWith({
        title: 'New Blog Post',
        content: 'This is the content of the blog post',
        entityId: '1',
        isPublic: false,
        isReleased: false,
      });
      expect(
        screen.getByText(/Blog post created successfully/i)
      ).toBeInTheDocument();
    });
  });

  it('should handle form submission error', async () => {
    mockCreateBlogPost.mockResolvedValueOnce({
      error: 'Failed to create blog post',
    });

    mockGetAllEntities.mockResolvedValueOnce([]); // Ensure entities are loaded

    await act(async () => {
      render(<CreateBlogpostPage />, { wrapper });
    });

    fireEvent.change(screen.getByLabelText(/Titre du post/i), {
      target: { value: 'New Blog Post' },
    });
    fireEvent.change(screen.getByLabelText(/Entité liée/i), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByLabelText(/contenu du post/i), {
      target: { value: 'This is the content of the blog post' },
    });

    fireEvent.click(screen.getByText(/Soumettre/i));

    await waitFor(() => {
      expect(mockCreateBlogPost).toHaveBeenCalledWith({
        title: 'New Blog Post',
        content: 'This is the content of the blog post',
        entityId: '1',
        isPublic: false,
        isReleased: false,
      });
      expect(
        screen.getByText(/Failed to create blog post/i)
      ).toBeInTheDocument();
    });
  });

  it('should display loading message while fetching entities', async () => {
    mockGetAllEntities.mockReturnValueOnce(new Promise(() => {})); // Mock a pending promise

    await act(async () => {
      render(<CreateBlogpostPage />, { wrapper });
    });

    expect(screen.getByText(/Loading entities.../i)).toBeInTheDocument();
  });

  it('should display error message if fetching entities fails', async () => {
    mockGetAllEntities.mockRejectedValueOnce(
      new Error('Failed to load entities')
    );

    await act(async () => {
      render(<CreateBlogpostPage />, { wrapper });
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to load entities: Failed to load entities/i)
      ).toBeInTheDocument();
    });
  });
});
