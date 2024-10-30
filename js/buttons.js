let startButton = document.getElementById("startButton");
let infoButton = document.getElementById("infoButton");
let restartButton = document.getElementById("restartButton");
let exitButton = document.getElementById("exitButton");
let soundButton = document.getElementById("soundButton");
let musicButton = document.getElementById("musicButton");
let fullscreenButton = document.getElementById("fullscreenButton");
let throwButton = document.getElementById("throwButton");
let upButton = document.getElementById("upButton");
let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let pepeStart = document.getElementById("pepeStart");
let controlExplanation = document.getElementById("controlExplanation");

/**
 * handles the click on the startbutton
 */
function startButtonClick() {
  hideStartScreenUI();
  fullscreenButton.classList.remove('noDisplay');
  world.start();
}

/**
 * shows the explanation overlay
 */
function showExplanation() {
  controlExplanation.classList.remove("noDisplay");
}

/**
 * hides the explanation overlay
 */
function hideExplanation() {
  controlExplanation.classList.add("noDisplay");
}

/**
 * hide the User Interface
 */
function hideUI() {
  hideTopRowUI();
  hideStartScreenUI();
  hideAfterGameUI();
  hideBottomRow();
}

/**
 * shows the optionsRow
 */
function showTopRowUI() {
  soundButton.classList.remove("noDisplay");
  musicButton.classList.remove("noDisplay");
  
}

/**
 * hides the optionsRow
 */
function hideTopRowUI() {
  soundButton.classList.add("noDisplay");
  musicButton.classList.add("noDisplay");
  fullscreenButton.classList.add("noDisplay");
}

/**
 * hides the menuScreenUI where u can start a game
 */
function hideStartScreenUI() {
  startButton.classList.add("noDisplay");
  pepeStart.classList.add("noDisplay");
  infoButton.classList.add("noDisplay");
}

/**
 * shows the menuScreenUI where u can start a game
 */
function showStartScreenUI() {
  startButton.classList.remove("noDisplay");
  pepeStart.classList.remove("noDisplay");
  infoButton.classList.remove("noDisplay");
}

/**
 * handles a click on the restart menu
 */
function restartButtonClick() {
  world.stopGame();
  world = null;
  level1 = null;
  level1 = new Level;
  init(true);
  hideAfterGameUI();
  showTopRowUI();
  startButtonClick();
}

/**
 * handles the click 
 */
function exitButtonClick() {
  world.stopGame();
  world = null;
  level1 = null;
  level1 = new Level;
  init();
  hideAfterGameUI();
}

/**
 * handles the click on the sound button
 */
function soundButtonClick() {
  if (sound) {
    sound = false;
    soundButton.src = "Icons/no-sound.png";
  } else {
    sound = true;
    soundButton.src = "Icons/sound.png";
  }
}

/**
 * handles the click on the music button
 */
function musicButtonClick() {
  if (music) {
    music = false;
    musicButton.src = "Icons/no-music.png";
  } else {
    music = true;
    musicButton.src = "Icons/music.png";
  }
}

/**
 * handles the click on the fullscreen button
 */
function fullscreenButtonClick() {
  ToggleFullscreen(canvas);
}

/**
 * handles the click on the info-button
 */
function infoButtonClick() {
  hideStartScreenUI();
  showExplanation();
}

/**
 * handles the click on the close button to close the explanation overlay
 */
function closeButtonClick() {
  hideExplanation();
  showStartScreenUI();
}

/**
 * shows the bottom row for mobile controls
 */
function showBottomRow() {
  throwButton.classList.remove("noDisplay");
  upButton.classList.remove("noDisplay");
  leftButton.classList.remove("noDisplay");
  rightButton.classList.remove("noDisplay");
}

/**
 * hides the bottom row for mobile controls
 */
function hideBottomRow() {
  throwButton.classList.add("noDisplay");
  upButton.classList.add("noDisplay");
  leftButton.classList.add("noDisplay");
  rightButton.classList.add("noDisplay");
}

/**
 * shows the UI for afterGame to restart or exit
 */
function showAfterGameUI() {
  exitButton.classList.remove("noDisplay");
  restartButton.classList.remove("noDisplay");
}

/**
 * hides the UI for afterGame 
 */
function hideAfterGameUI() {
  exitButton.classList.add("noDisplay");
  restartButton.classList.add("noDisplay");
  fullscreenButton.classList.add('noDisplay');
}
