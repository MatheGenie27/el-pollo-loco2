
/**
 * enter fullsceen mode for an given HTML Element
 * @param {HTMLElement} element 
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * exits fullscreen mode for an given HTML Element
 * @param {HTMLElement} element 
 */
function exitFullscreen(element) {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  } else if (element.webkitExitFullscreen) {
    element.webkitExitFullscreen();
  } else if (element.msExitFullscreen) {
    element.msExitFullscreen();
  }
}

/**
 * toggles given Element between fullscreen and not fullscreen
 * @param {HTMLElement} element 
 */
function ToggleFullscreen(element) {
  if (
    document.fullscreenElement === element ||
    document.mozFullScreenElement === element ||
    document.webkitFullscreenElement === element ||
    document.msFullscreenElement === element
  ) {
    exitFullscreen(document);
  } else {
    enterFullscreen(element);
  }
}
