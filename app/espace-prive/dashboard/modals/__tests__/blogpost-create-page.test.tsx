// Mocks des modules nécessaires
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/actions/blogposts/post', () => ({
  createBlogPost: jest.fn(),
}));

jest.mock('@/actions/entity/get', () => ({
  getAllEntities: jest.fn(),
}));

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createBlogPost } from '@/actions/blogposts/post';
import { getAllEntities } from '@/actions/entity/get';
import CreateBlogpostPage from '../create/page';

describe('CreateBlogpostPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    });

    // Mock useQuery pour simuler le chargement des entités
    (useQuery as jest.Mock).mockReturnValue({
      data: [
        { id: '1', name: 'Entity 1' },
        { id: '2', name: 'Entity 2' },
      ],
      isLoading: false,
      error: null,
    });

    // Mock de la fonction createBlogPost pour simuler une création réussie
    (createBlogPost as jest.Mock).mockResolvedValue({
      success: 'Blog post created successfully!',
    });

    // Mock de la fonction getAllEntities pour fournir une liste d'entités
    (getAllEntities as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Entity 1' },
      { id: '2', name: 'Entity 2' },
    ]);
  });

  it('renders the loading state initially', async () => {
    render(<CreateBlogpostPage />);
    expect(screen.getByText(/loading entities.../i)).toBeInTheDocument();
  });

  it('renders the form after loading', async () => {
    render(<CreateBlogpostPage />);
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  it('submits the form and redirects on success', async () => {
    render(<CreateBlogpostPage />);

    // Simuler la soumission
    fireEvent.submit(screen.getByRole('form'));
    expect(createBlogPost).toHaveBeenCalled();
  });
});
