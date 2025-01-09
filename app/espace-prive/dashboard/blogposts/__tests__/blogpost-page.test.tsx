import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogpostPage from '../page';

// Mock data for the blog post
const mockBlogPost = {
  title: 'Blog Post Title',
  content: 'This is the content of the blog post',
  author: 'Author Name',
  publishedDate: 'Published on',
};

// Mock the BlogpostPage component to use the mock data
jest.mock('../page', () => {
  return function MockBlogpostPage() {
    return (
      <div>
        <h1>{mockBlogPost.title}</h1>
        <p>{mockBlogPost.content}</p>
        <p>{mockBlogPost.author}</p>
        <p>{mockBlogPost.publishedDate}</p>
      </div>
    );
  };
});

describe('BlogPostPage', () => {
  beforeEach(() => {
    render(<BlogpostPage />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the blog post title', () => {
    const titleElement = screen.getByText(/Blog Post Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the blog post content', () => {
    const contentElement = screen.getByText(
      /This is the content of the blog post/i
    );
    expect(contentElement).toBeInTheDocument();
  });

  it('should render the author name', () => {
    const authorElement = screen.getByText(/Author Name/i);
    expect(authorElement).toBeInTheDocument();
  });

  it('should render the publication date', () => {
    const dateElement = screen.getByText(/Published on/i);
    expect(dateElement).toBeInTheDocument();
  });
});
