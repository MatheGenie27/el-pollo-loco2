let music = true;
let sound = true;

let canvas;
let keyboard = new Keyboard();

let world;

function init(restart) {
  canvas = document.getElementById("myCanvas");
  hint = document.getElementById("hint");
  const orientation = screen.orientation.type;
  hideUI();

  if (orientation.startsWith("landscape")) {
    canvas.classList.remove("noDisplay");
    hint.classList.add("noDisplay");
    world = new World(canvas, keyboard, restart);
  } else if (orientation.startsWith("portrait")) {
    canvas.classList.add("noDisplay");
    hint.classList.remove("noDisplay");
  }
}
