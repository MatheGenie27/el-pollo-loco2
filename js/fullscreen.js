
let fullscreen = document.getElementById('fullscreen');


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


  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Für Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Für Chrome, Safari und Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // Für Internet Explorer/Edge
      document.msExitFullscreen();
    }
  } 