




function enterFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Für Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Für Chrome, Safari und Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // Für Internet Explorer/Edge
      element.msRequestFullscreen();
    }
  }


  function exitFullscreen(element) {
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.mozCancelFullScreen) { // Für Firefox
      element.mozCancelFullScreen();
    } else if (element.webkitExitFullscreen) { // Für Chrome, Safari und Opera
      element.webkitExitFullscreen();
    } else if (element.msExitFullscreen) { // Für Internet Explorer/Edge
      element.msExitFullscreen();
    }
}

function ToggleFullscreen(element){
  if (
    document.fullscreenElement === element || // Standard-API
    document.mozFullScreenElement === element || // Firefox
    document.webkitFullscreenElement === element || // Chrome, Safari, Opera
    document.msFullscreenElement === element // Internet Explorer/Edge
  ) {
    // Element ist im Vollbildmodus, also beenden
    exitFullscreen(document);
  } else {
    // Element ist nicht im Vollbildmodus, also starten
    enterFullscreen(element);
  }
}
   