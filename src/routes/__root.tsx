import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../client';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

/**
 * Root Route Definition
 * This component wraps the entire application, providing the TanStack Query context
 * and the main layout structure (Header, Main Content, Footer).
 */
export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen selection:bg-teal-500/30">
        <Header />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
        
        {/* 
            TanStack Router Devtools: 
            Only rendered in development mode to assist with debugging 
            file-based routing and navigation states.
        */}
        { (
          <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
        )}
      </div>
    </QueryClientProvider>
  ),
});