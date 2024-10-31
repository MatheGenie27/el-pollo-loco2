
/**
 * adds a listener for keydown events for control input
 */

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case " ":
      keyboard.SPACE = true; 
      break;
  }
});

/**
 * adds a listener for keyup events for control ionput
 */
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case " ":
      keyboard.SPACE = false;
      break;
  }
});


/**
 * handles the touch begin of the leftButton
 */
leftButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.LEFT = true;
}, { passive: false });

/**
 * handles the touch begin of the rightButton
 */
rightButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.RIGHT = true;
}, { passive: false });

/**
 * handles the touch begin of the upButton
 */
upButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.UP = true;
}, { passive: false });

/**
 * handles the touch begin of the throwButton
 */
throwButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.SPACE = true;
}, { passive: false });

/**
 * handles the touch end of the leftButton
 */
leftButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.LEFT = false;
}, { passive: false });

/**
 * handles the touch end of the rightButton
 */
rightButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.RIGHT = false;
}, { passive: false });

/**
 * handles the touch end of the upButton
 */
upButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.UP = false;
}, { passive: false });

/**
 * handles the touch end of the throwButton
 */
throwButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.SPACE = false;
}, { passive: false });


