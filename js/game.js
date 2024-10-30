let music = true;
let sound = true;

let canvas;
let keyboard = new Keyboard();

let world;

/**
 * initiates world when correct orientation is given
 * @param {boolean} restart 
 */
function init(restart) {
  canvas = document.getElementById("myCanvas");
  hint = document.getElementById("hint");
  const orientation = screen.orientation.type;
  hideUI();

  if (orientation.startsWith("landscape")) {
      startGame(restart);
  } else if (orientation.startsWith("portrait")) {
      showOrientationHint();
  }
}

/**
 * shows canvas and starts game
 * @param {boolean} restart 
 */
function startGame(restart){

  canvas.classList.remove("noDisplay");
    hint.classList.add("noDisplay");
    world = new World(canvas, keyboard, restart);
  
}

/**
 * hides canvas and shows orientation hint
 */
function showOrientationHint(){
    canvas.classList.add("noDisplay");
    hint.classList.remove("noDisplay");
}
