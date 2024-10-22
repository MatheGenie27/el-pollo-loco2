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

leftButton.addEventListener("touchstart", () => {
  keyboard.LEFT = true;
});

rightButton.addEventListener("touchstart", () => {
  keyboard.RIGHT = true;
});

upButton.addEventListener("touchstart", () => {
  keyboard.UP = true;
});

throwButton.addEventListener("touchstart", () => {
  keyboard.SPACE = true;
});

leftButton.addEventListener("touchend", () => {
  keyboard.LEFT = false;
});

rightButton.addEventListener("touchend", () => {
  keyboard.RIGHT = false;
});

upButton.addEventListener("touchend", () => {
  keyboard.UP = false;
});

throwButton.addEventListener("touchend", () => {
  keyboard.SPACE = false;
});
