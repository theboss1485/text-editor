const butInstall = document.getElementById("buttonInstall");

// If the app isn't currently installed, the install button will be displayed.
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("before install");
    window.deferredPrompt = event;
    butInstall.style.display = "inline";
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

// Once the app has been installed, the install button will be hidden.
window.addEventListener('appinstalled', (event) => {
  
  window.deferredPrompt = null;
  butInstall.style.display = "none";
}); 


