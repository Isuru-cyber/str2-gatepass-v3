// Make window.fetch writable to bypass iframe getter-only restrictions
if (typeof window !== 'undefined') {
  try {
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (desc && !desc.writable) {
      const originalFetch = window.fetch;
      Object.defineProperty(window, 'fetch', {
        value: originalFetch,
        writable: true,
        configurable: true,
        enumerable: true
      });
    }
  } catch (e) {
    console.warn("Failed to polyfill fetch descriptor:", e);
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept console.error to filter out benign "react-to-print" resource loading warnings
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const match = args.some(arg => 
    typeof arg === 'string' && 
    (arg.includes('react-to-print') || arg.includes('unable to load a resource'))
  );
  if (match) {
    console.warn('[react-to-print-intercepted]', ...args);
    return;
  }
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

