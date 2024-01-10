const butInstall = document.getElementById("buttonInstall");

butInstall.disabled = true


window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.disabled = false;
    butInstall.textContent = "Install Me!"
  });

butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  promptEvent.prompt();
  
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  
  window.deferredPrompt = null;
}); 


