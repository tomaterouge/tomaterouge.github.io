import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Buffer as BufferPollyfill} from 'buffer';

// --- POLYFILL & TYPE AUGMENTATION ---

// 1. Extend the global namespace to include Buffer
declare global {
  // eslint-disable-next-line no-var
  var Buffer: typeof BufferPollyfill;
}

// 2. Assign Buffer to globalThis (now strictly typed)
globalThis.Buffer = BufferPollyfill;

// --- APP INITIALIZATION ---

import { routeTree } from './routeTree.gen';
import './index.css';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}