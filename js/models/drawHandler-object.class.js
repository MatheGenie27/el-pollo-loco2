/**
 * handles the drawing on the canvas
 */
class DrawHandler {
  world;

  constructor(world) {
    this.world = world;
  }

  /**
   * drawing everything on the canvas
   */
  draw() {
    this.world.ctx.clearRect(
      0,
      0,
      this.world.canvas.width,
      this.world.canvas.height
    );
    this.drawStartScreen();
    this.drawMenuScreen();
    this.drawInGame();

    //function draw executes again and again
    self = this;
    this.intervalDraw = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * draws the StartScreen
   */
  drawStartScreen() {
    if (this.world.gameFlowHandler.getGamePhase() == "startScreen") {
      this.addToMap(this.world.startScreen);
    }
  }

  /**
   * draws the MenuScreen
   */
  drawMenuScreen() {
    if (this.world.gameFlowHandler.getGamePhase() == "menuScreen") {
      this.addToMap(this.world.menuScreen);
    }
  }

  /**
   * draws all InGameObjects
   */
  drawInGame() {
    if (
      this.world.gameFlowHandler.getGamePhase() == "inGame" ||
      this.world.gameFlowHandler.getGamePhase() == "inEndGame"
    ) {
      this.world.ctx.translate(this.world.camera_x, 0); //forward
      this.drawMovableObjects();
      this.world.ctx.translate(-this.world.camera_x, 0); //back
      // ----------  Space for fixed Objects -------
      this.drawFixedObjects();
      this.world.ctx.translate(this.world.camera_x, 0); //forward
      this.world.ctx.translate(-this.world.camera_x, 0); //backward
    }
  }

  /**
   * draws fixed IngameObjects
   */
  drawFixedObjects() {
    this.addToMap(this.world.statusBarHealth);
    this.addToMap(this.world.statusBarCoin);
    this.addToMap(this.world.statusBarBottle);
    if (this.world.gameFlowHandler.getGamePhase() == "inEndGame") {
      this.addToMap(this.world.statusBarEndboss);
    }
    if (this.world.checkIfChracterPlayedDeadAnimation()) {
      this.addToMap(this.world.gameOver);
    } else if (this.world.hasWon) {
      this.addToMap(this.world.won);
    }
  }

  /**
   * draws movable ingame Objects
   */
  drawMovableObjects() {
    this.addObjectsToMap(this.world.level.backgroundObjects);
    this.addObjectsToMap(this.world.level.clouds);
    this.addObjectsToMap(this.world.throwableObjects);
    this.addToMap(this.world.character);
    this.addObjectsToMap(this.world.level.collectables);
    this.addObjectsToMap(this.world.level.enemies);
  }

  /**
   * adding arrays of objects to draw on the canvas
   * @param {Object} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * adding a single object to draw on the canvas
   * @param {Object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.world.ctx);
    if (this.debug) mo.drawBorder(this.world.ctx);
    if (this.debug) mo.drawCollisionBox(this.world.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * flip a image to draw
   * @param {Object} mo
   */
  flipImage(mo) {
    this.world.ctx.save();
    this.world.ctx.translate(mo.width, 0);
    this.world.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
    if (mo instanceof Character) {
      mo.coll_x = (mo.coll_x - 30) * -1;
    }
  }

  /**
   * flip a image back to draw
   * @param {Object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    if (mo instanceof Character) {
      mo.coll_x = mo.coll_x * -1;
    }
    this.world.ctx.restore();
  }
}
