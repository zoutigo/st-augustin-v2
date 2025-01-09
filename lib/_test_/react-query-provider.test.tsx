import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryProvider } from '../react-query-provider';

describe('ReactQueryProvider', () => {
  it('should render children within QueryClientProvider', () => {
    const TestComponent = () => <div>Test Component</div>;

    render(
      <ReactQueryProvider>
        <TestComponent />
      </ReactQueryProvider>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  //   it('should render ReactQueryDevtools', () => {
  //     const TestComponent = () => <div>Test Component</div>;

  //     render(
  //       <ReactQueryProvider>
  //         <TestComponent />
  //       </ReactQueryProvider>
  //     );

  //     // Vérifiez si le bouton "Open React Query Devtools" est rendu
  //     expect(
  //       screen.getByRole('button', { name: /Open React Query Devtools/i })
  //     ).toBeInTheDocument();
  //   });
});
