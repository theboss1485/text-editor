// I took this code from activity 20 of module 19.

export const registerSW = () => {
    
  if ('serviceWorker' in navigator) {
      
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  };
  