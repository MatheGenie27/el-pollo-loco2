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

  getGamePhase() {
    return this.gamePhase;
  }

  setGameFlowAsRestarted() {
    this.isRestart = true;
  }

  startMenuProcess() {
    if (!this.isRestart) {
      this.enterMenuTimeout = setTimeout(() => {
        this.delayedStartingScreen();
      }, 1200);
    } else {
      this.gamePhase = "inGame";
    }
  }

  delayedStartingScreen() {
    if (!this.isRestart) {
      showStartScreenUI();
      showTopRowUI();
      this.gamePhase = "menuScreen";
    }
  }

  enterGame() {
    this.gamePhase = "inGame";
  }

  enterEndGame() {
    this.gamePhase = "inEndGame";
    this.musicHandler.playEndbossMusic();
  }

  enterAfterGameMenu() {
    this.gamePhase = "afterGame";
    this.musicHandler.stopGameMusic();
  }
}
