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
    this.checkRestart(restart);
    this.level = level1;
    this.draw();
    this.startGameFlow();
  }

  checkRestart(restart) {
    if (restart) {
      this.setWorldAsRestart();
    }
  }

  startGameFlow() {
    this.gameFlowHandler.startMenuProcess();
    initLevelStructure();
  }

  stopGame() {
    this.clearMusicHandler();
    this.clearIntervals();
    this.stopMovingObjects;
    this.clearEnemiesArray();
    this.stopCollectables();
    this.clearCoinPositionArray();
    this.clearCollectablesArray();
    this.clearLevel();
  }

  clearLevel() {
    this.level = null;
  }

  clearCoinPositionArray() {
    Coin.clearStartPositionArray();
  }

  clearCollectablesArray() {
    if (this.level && this.level.collectables) this.level.collectables = null;
  }

  stopCollectables() {
    if (this.level && this.level.collectables)
      this.level.collectables.forEach((collectable) => {
        collectable.stopCollectable();
      });
  }

  clearEnemiesArray() {
    if (this.level && this.level.enemies) this.level.enemies = null;
  }

  clearIntervals() {
    cancelAnimationFrame(this.intervalDraw);
    clearInterval(this.intervalRun);
    clearInterval(this.hasLostTimeout);
    clearInterval(this.afterGameTimeout);
  }

  clearMusicHandler() {
    this.musicHandler.stopAllMusic();
    this.musicHandler.stopMusicHandler();
  }

  stopMovingObjects() {
    this.stopCharacterIntervals();
    this.stopThrowablesIntervals();
    this.stopEnemyIntervals();
  }

  stopEnemyIntervals() {
    if (this.level && this.level.enemies && this.level.enemies.length > 0) {
      this.level.enemies.forEach((enemy) => {
        enemy.stopEnemy();
      });
    }
  }

  stopThrowablesIntervals() {
    this.throwableObjects.forEach((throwable) => {
      throwable.stopThrowables();
    });
  }

  stopCharacterIntervals() {
    if (this.character) this.character.stopCharacter();
  }

  setWorldAsRestart() {
    this.gameFlowHandler.setGameFlowAsRestarted();
  }

  stopEnterMenu() {
    clearInterval(this.enterMenuTimeout);
  }

  stopIntervalRun() {
    clearInterval(this.intervalRun);
  }

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

  actualStart(loading) {
    this.musicHandler.playGameMusic();
    this.musicHandler.playStartVoice();
    this.gameFlowHandler.enterGame();
    this.run();
    loading.classList.add("noDisplay");
    this.checkMobileUI();
  }

  checkMobileUI() {
    if (isMobile()) {
      showBottomRow();
    } else {
      hideBottomRow();
    }
  }

  setWorld() {
    this.character.world = this;
  }

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

  checkIfEndbossDead() {
    let endboss = this.level.enemies.find(
      (element) => element instanceof Endboss
    );
    return endboss.dead;
  }

  checkIfChracterPlayedDeadAnimation() {
    if (this.character.playedDeadAnimation) {
      return true;
    }
  }

  checkOutcome() {
    if (this.checkIfEndbossDead()) {
      this.playerWins();
    }

    if (this.character.dead) {
      this.playerLoses();
    }
  }

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

  playerLoses() {
    this.musicHandler.stopGameMusic();
    this.musicHandler.playLostVoice();
    this.hasLostTimeout = setTimeout(() => {
      this.musicHandler.playDefeatMusic();
      this.hastLost = true;
      this.enterAfterGameMenu();
    }, 1000);
  }

  enterAfterGameMenu() {
    if (!this.afterGame) {
      this.stopIntervalRun();
      this.afterGame = true;
      this.afterGameTimeout = setTimeout(() => {
        showAfterGameUI();
      }, 2000);
    }
  }

  afterPlayerDeadAnimation() {
    return this.character.playedDeadAnimation;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.gameFlowHandler.getGamePhase() == "startScreen") {
      this.addToMap(this.startScreen);
    }
    if (this.gameFlowHandler.getGamePhase() == "menuScreen") {
      this.addToMap(this.menuScreen);
    }
    if (
      this.gameFlowHandler.getGamePhase() == "inGame" ||
      this.gameFlowHandler.getGamePhase() == "inEndGame"
    ) {
      this.ctx.translate(this.camera_x, 0); //forward
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.throwableObjects);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.collectables);
      this.addObjectsToMap(this.level.enemies);
      this.ctx.translate(-this.camera_x, 0); //back
      // ----------  Space for fixed Objects -------
      this.addToMap(this.statusBarHealth);
      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarBottle);
      if (this.gameFlowHandler.getGamePhase() == "inEndGame") {
        this.addToMap(this.statusBarEndboss);
      }
      if (this.afterPlayerDeadAnimation()) {
        this.addToMap(this.gameOver);
      } else if (this.hasWon) {
        this.addToMap(this.won);
      }
      this.ctx.translate(this.camera_x, 0); //forward
      this.ctx.translate(-this.camera_x, 0); //backward
    }

    //function draw executes again and again
    self = this;
    this.intervalDraw = requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (this.debug) mo.drawBorder(this.ctx);
    if (this.debug) mo.drawCollisionBox(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
    if (mo instanceof Character) {
      mo.coll_x = (mo.coll_x - 30) * -1;
    }
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    if (mo instanceof Character) {
      mo.coll_x = mo.coll_x * -1;
    }
    this.ctx.restore();
  }
}
