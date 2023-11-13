const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

window.onload = function() {
    const navbar = document.querySelector('nav');
    if (typeof window.process != 'undefined') {
      navbar.style.display = 'flex';
    }
    
  }

console.log("Loaded App Functions");

// Close app
closeBtn.addEventListener("click", () => {
  ipc.send("close-window");
});

// Minimize app
minimizeBtn.addEventListener("click", () => {
  ipc.send("minimize-window");
});
// Maximize app
maximizeBtn.addEventListener("click", () => {
  ipc.send("maximize-window");
});
