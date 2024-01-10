// I took this code from activity 20 of module 19.

// This code registers the service worker so that it can be used.
export const registerSW = () => {
    
  if ('serviceWorker' in navigator) {
      
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  };
  