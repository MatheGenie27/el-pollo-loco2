
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



// adding listeners for touch events for mobile controls

leftButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.LEFT = true;
}, { passive: false });

rightButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.RIGHT = true;
}, { passive: false });

upButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.UP = true;
}, { passive: false });

throwButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  keyboard.SPACE = true;
}, { passive: false });

leftButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.LEFT = false;
}, { passive: false });

rightButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.RIGHT = false;
}, { passive: false });

upButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.UP = false;
}, { passive: false });

throwButton.addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.SPACE = false;
}, { passive: false });