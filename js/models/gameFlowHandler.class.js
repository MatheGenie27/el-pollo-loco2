/**
 * this class handles the states the game is in
 */

class GameflowHandler {
  isRestart;
  musicHandler;
  gamePhase = null;
  enterMenuTimeout = null;
  startMenuStartTime;

  constructor(musicHandler) {
    this.startMenuStartTime = Date.now();
    this.gamePhase = "startScreen";
    this.musicHandler = musicHandler;
  }
/**
 * returns the state of the game if asked
 * @returns {string}
 */
  getGamePhase() {
    return this.gamePhase;
  }
/**
 * marks the game as restarted, when it is restarted
 */
  setGameFlowAsRestarted() {
    this.isRestart = true;
  }

  /**
   * handles the gameflow for being in the menu
   */
  startMenuProcess() {
    if (!this.isRestart) {
      this.enterMenuTimeout = setTimeout(() => {
        this.delayedStartingScreen();
      }, 1200);
    } else {
      this.gamePhase = "inGame";
    }
  }

  /**
   * handles the showing of the menuScreen
   */
  delayedStartingScreen() {
    if (!this.isRestart) {
      showStartScreenUI();
      showTopRowUI();
      this.gamePhase = "menuScreen";
    }
  }

  /**
   * sets game to being inGame
   */
  enterGame() {
    this.gamePhase = "inGame";
  }

  /**
   * sets game to being in the endgame
   */
  enterEndGame() {
    this.gamePhase = "inEndGame";
    this.musicHandler.playEndbossMusic();
  }

  /**
   * sets game to being in the aftergame phase
   */
  enterAfterGameMenu() {
    this.gamePhase = "afterGame";
    this.musicHandler.stopGameMusic();
  }
}
