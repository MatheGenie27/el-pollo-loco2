/**
 * represents the world the game takes place in
 */
class World {
  canvas;
  ctx;
  keyboard;
  character;
  musicHandler;
  debug = false;
  camera_x = 0;
  level;
  statusBarHealth;
  statusBarCoin;
  statusBarBottle;
  statusBarEndboss;
  throwableObjects = [];
  lastThrow = 0;
  totalCoins;
  maxBottles = 5;
  inEndgame;
  afterGame = false;
  gameOver;
  won;
  notStartet = true;
  hasWon = false;
  hastLost = false;
  coinComplete = false;
  menuScreen;
  inMenu = false;
  restart = false;
  enterMenuTimeout;
  hasLostTimeout;
  afterGameTimeout;
  intervalRun;
  intervalDraw;

  constructor(canvas, keyboard, restart) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.gameOver = new GameOver();
    this.won = new Won();
    this.startScreen = new StartScreen();
    this.menuScreen = new MenuScreen();
    this.musicHandler = new MusicHandler();
    this.statusBarHealth = new StatusBarHealth();
    this.statusBarBottle = new StatusBarBottle();
    this.statusBarCoin = new StatusBarCoin();
    this.statusBarEndboss = new StatusBarEndboss();
    this.gameFlowHandler = new GameflowHandler(this.musicHandler);
    this.objectHandler = new ObjectHandler(this);
    this.drawHandler = new DrawHandler(this);
    this.checkRestart(restart);
    this.level = level1;
    this.drawHandler.draw();
    this.startGameFlow();
  }

  /**
   * sets world as restarted when it is
   * @param {boolean} restart
   */
  checkRestart(restart) {
    if (restart) {
      this.setWorldAsRestart();
    }
  }

  /**
   * starting the gameFlow
   */
  startGameFlow() {
    this.gameFlowHandler.startMenuProcess();
    initLevelStructure();
  }

  /**
   * stopping the game
   */
  stopGame() {
    this.clearMusicHandler();
    this.clearIntervals();
    this.stopMovingObjects();
    this.clearEnemiesArray();
    this.stopCollectables();
    this.clearCoinPositionArray();
    this.clearCollectablesArray();
    this.clearLevel();
  }

  /**
   * clearing the level
   */
  clearLevel() {
    this.level = null;
  }

  /**
   * clearing the static array where all coin positions are stored
   */
  clearCoinPositionArray() {
    Coin.clearStartPositionArray();
  }

  /**
   * clears the array of collectables
   */
  clearCollectablesArray() {
    if (this.level && this.level.collectables) this.level.collectables = null;
  }

  /**
   * stops every collectable
   */
  stopCollectables() {
    if (this.level && this.level.collectables)
      this.level.collectables.forEach((collectable) => {
        collectable.stopCollectable();
      });
  }

  /**
   * clears the enemy array of the level
   */
  clearEnemiesArray() {
    if (this.level && this.level.enemies) this.level.enemies = null;
  }

  /**
   * clears the intervals of the running world
   */
  clearIntervals() {
    cancelAnimationFrame(this.intervalDraw);
    clearInterval(this.intervalRun);
    clearInterval(this.hasLostTimeout);
    clearInterval(this.afterGameTimeout);
  }

  /**
   * clears the musicHandler
   */
  clearMusicHandler() {
    this.musicHandler.stopAllMusic();
    this.musicHandler.stopMusicHandler();
  }

  /**
   * stops all moving Objects
   */
  stopMovingObjects() {
    this.stopCharacterIntervals();
    this.stopThrowablesIntervals();
    this.stopEnemyIntervals();
  }

  /**
   * stops intervals of all enemies
   */
  stopEnemyIntervals() {
    if (this.level && this.level.enemies && this.level.enemies.length > 0) {
      this.level.enemies.forEach((enemy) => {
        enemy.stopEnemy();
      });
    }
  }

  /**
   * stops intervals of all throwables
   */
  stopThrowablesIntervals() {
    this.throwableObjects.forEach((throwable) => {
      throwable.stopThrowables();
    });
  }

  /**
   * stops intervals of the character
   */
  stopCharacterIntervals() {
    if (this.character) this.character.stopCharacter();
  }

  /** sets world as restart */
  setWorldAsRestart() {
    this.gameFlowHandler.setGameFlowAsRestarted();
  }

  /**
   * clearing the timeout of the enter menu
   */
  stopEnterMenu() {
    clearInterval(this.enterMenuTimeout);
  }

  /**
   * clearing the run interval of the world
   */
  stopIntervalRun() {
    clearInterval(this.intervalRun);
  }

  /**
   * preparing to start the world
   */
  async start() {
    let loading = document.getElementById("loadingImage");
    loading.classList.remove("noDisplay");
    this.character = new Character();
    this.setWorld();
    await initEnemies();
    setTimeout(() => {
      this.actualStart(loading);
    }, 200);
  }

  /**
   * starting the game and finishing loading
   * @param {Object} loading
   */
  actualStart(loading) {
    this.musicHandler.playGameMusic();
    this.musicHandler.playStartVoice();
    this.gameFlowHandler.enterGame();
    this.run();
    loading.classList.add("noDisplay");
    this.checkMobileUI();
  }

  /**
   * showing the mobile input when the display is mobile
   */
  checkMobileUI() {
    if (isMobile()) {
      showBottomRow();
    } else {
      hideBottomRow();
    }
  }

  /**
   * giving the character a reference to this world
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * start all processes
   */
  run() {
    this.intervalRun = setInterval(() => {
      this.objectHandler.checkCollisions();
      this.objectHandler.checkThrowables();
      this.checkOutcome();
      this.character.checkInvulnerability();
      this.checkEndgame();
      this.objectHandler.checkSoundRange();
    }, 1000 / 60);
  }

  /**
   * checks if the character is in distance to the endboss to start the endgame
   */
  checkEndgame() {
    let endboss = this.level.enemies.find(
      (element) => element instanceof Endboss
    );

    if (
      this.objectHandler.checkDistance(endboss, this.character) &&
      !endboss.dead &&
      !this.character.dead
    ) {
      this.gameFlowHandler.enterEndGame();
    }
  }

  /**
   * checks if the endboss is dead
   * @returns {boolean}
   */
  checkIfEndbossDead() {
    let endboss = this.level.enemies.find(
      (element) => element instanceof Endboss
    );
    return endboss.dead;
  }

  /**
   * checks if the character has played its dead animation
   * @returns {boolean}
   */
  checkIfChracterPlayedDeadAnimation() {
    if (this.character.playedDeadAnimation) {
      return true;
    }
  }

  /**
   * checks the outcome of the game
   */
  checkOutcome() {
    if (this.checkIfEndbossDead()) {
      this.playerWins();
    }

    if (this.character.dead) {
      this.playerLoses();
    }
  }

  /**
   * handles the win of the player
   */
  playerWins() {
    this.musicHandler.stopGameMusic();
    this.character.stopControl();
    this.character.won = true;
    this.hasWon = true;
    this.enterAfterGameMenu();
    setTimeout(() => {
      this.musicHandler.playVictoryMusic();
      this.musicHandler.playVictoryVoice();
    }, 1000);
  }

  /**
   * handles the defeat of the player
   */
  playerLoses() {
    this.musicHandler.stopGameMusic();
    this.musicHandler.playLostVoice();
    this.hasLostTimeout = setTimeout(() => {
      this.musicHandler.playDefeatMusic();
      this.hastLost = true;
      this.enterAfterGameMenu();
    }, 1000);
  }

  /**
   * entering the afterGame Menu after the player has lost or won
   */
  enterAfterGameMenu() {
    if (!this.afterGame) {
      this.stopIntervalRun();
      this.afterGame = true;
      this.afterGameTimeout = setTimeout(() => {
        showAfterGameUI();
        this.stopEnemyIntervals();
      }, 2000);
    }
  }

  
}
