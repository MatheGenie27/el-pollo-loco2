/**
 * handles the object related methods from the objects in the world
 * @constructor @param {object} world receives the world
 */
class ObjectHandler {
  world;

  constructor(world) {
    this.world = world;
  }

  /**
   * checks the different types of collisions
   */
  checkCollisions() {
    this.checkCollisionsEnemies();
    this.checkCollisionsCollectables();
    this.checkCollisionsThrowables();
  }

  /**checks if enemies are in soundrange to the character */
  checkSoundRange() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.checkDistance(enemy, this.world.character)) {
        enemy.soundRange = true;
      } else {
        enemy.soundRange = false;
      }
    });
  }

  /**
   * returns true if an enemy is at an distance to the character which means its visible on screen
   * @param {Object} enemy
   * @param {Pbject} character
   * @returns {booolean}
   */
  checkDistance(enemy, character) {
    if (enemy) {
      let distance = enemy.x - character.x;
      return -150 < distance && distance < 600;
    }
  }

  /**
   * handles the collision of throwables with enemies
   */
  checkCollisionsThrowables() {
    for (let i = this.world.throwableObjects.length - 1; i >= 0; i--) {
      let throwable = this.world.throwableObjects[i];

      for (let j = 0; j < this.world.level.enemies.length; j++) {
        let enemy = this.world.level.enemies[j];
        if (enemy.isColliding(throwable)) {
          this.throwableSplashing(throwable);
          this.throwableHittingEnemy(throwable, enemy);
        }
      }
    }
  }

  /**
   * handles the act of splashing which occurs when a throwable hits an enemy.
   * @param {Object} throwable
   */
  throwableSplashing(throwable) {
    if (throwable.landed === false && throwable.splashed === false) {
      let id = throwable.id;
      throwable.splash();
      setTimeout(() => {
        let index = this.searchBottleWithID(id);
        this.world.throwableObjects.splice(index, 1);
      }, 500);
    }
  }
  /**
   * handles the hitting, when a throwable hits an enemy
   * @param {Object} throwable
   * @param {Object} enemy
   */
  throwableHittingEnemy(throwable, enemy) {
    if (enemy instanceof Chicken || enemy instanceof Chick) {
      if (throwable.landed === false) {
        enemy.kill();
      }
    } else if (
      enemy instanceof Endboss &&
      throwable.hasHit === false &&
      throwable.landed === false
    ) {
      throwable.hasHit = true;
      enemy.hit();
      this.world.statusBarEndboss.setPercentage(enemy.energy);
    }
  }

  /**
   * each throwable has an individual id. this methods searches for the id in the array of all throwables and returns its index
   * @param {int} id
   * @returns {int} -1 for not found and 0...* for the acutal ID when found.
   */
  searchBottleWithID(id) {
    let foundIndex = -1;
    this.world.throwableObjects.forEach((object, index) => {
      if (object.id === id) {
        foundIndex = index;
      }
    });

    if (foundIndex === -1) {
      console.err("Flasche nicht gefunden. ID:" + id);
    }
    return foundIndex;
  }

  /**
   * handles the collision between a character and en enemy.
   * @returns
   */
  checkCollisionsEnemies() {
    for (let element of this.world.level.enemies) {
      if (
        this.world.character.isColliding(element) &&
        this.world.character.speedY > 0 &&
        !(element instanceof Endboss)
      ) {
        this.characterKillsEnemy(element);
        return;
      } else if (this.world.character.isColliding(element)) {
        this.endBossAttackMode(element);
        this.characterIsBeingHit();
        return;
      }
    }
  }

  /**
   * handles the process when the character kills an enemy.
   * @param {Object} enemy
   */
  characterKillsEnemy(enemy) {
    this.world.character.activateInvulnerability();
    enemy.kill();
  }

  /**
   * handles to set the Enemy to attack mode, when the enemy is the endboss
   * @param {Object} element
   */
  endBossAttackMode(element) {
    if (element instanceof Endboss) element.attacking();
  }

  /**
   * hanndles the character being hit.
   */
  characterIsBeingHit() {
    if (!this.world.character.isInvulnerable) {
      this.world.character.hit();
      this.world.statusBarHealth.setPercentage(this.world.character.energy);
    }
  }

  /**
   * handles the collision between character and collectables
   */
  checkCollisionsCollectables() {
    for (let i = this.world.level.collectables.length - 1; i >= 0; i--) {
      let element = this.world.level.collectables[i];
      if (this.world.character.isColliding(element)) {
        this.collideCoin(element, i);
        this.collideBottle(element, i);
      }
    }
  }

  /**
   * handles the coin after collision with the character, removes it from the world and to the characters inventory
   * @param {Object} element
   * @param {int} i
   */
  collideCoin(element, i) {
    if (element instanceof Coin) {
      this.world.level.collectables.splice(i, 1);
      this.addCoin();
    }
  }

  /**
   * handles the bottle after collision with the chracter, removes it from the world and to the chracters inventory,
   * when he has the space for it
   * @param {Object} element
   * @param {int} i
   */
  collideBottle(element, i) {
    if (element instanceof Bottle) {
      if (this.world.character.bottles < 5) {
        this.world.level.collectables.splice(i, 1);
        this.addBottle();
      }
    }
  }

  /**
   * handles the adding of a coin to the characters inventory
   */
  addCoin() {
    if (!this.world.totalCoins) {
      this.world.totalCoins = this.countCollectable(Coin);
    }
    this.world.musicHandler.playCoinSound();
    this.world.character.coins++;
    this.updateStatusBarCoins();
    this.checkCoinCompletion();
  }

  /**
   * checks if the character has collected all Coins to play the special allCollected-Sound
   */
  checkCoinCompletion() {
    if (
      this.world.character.coins == this.world.totalCoins &&
      !this.world.coinComplete
    ) {
      this.world.coinComplete = true;
      this.world.musicHandler.playCoinsCompleted();
    }
  }

  /**
   * handles the adding of a bottle to the characters inventory
   */
  addBottle() {
    this.world.musicHandler.playBottleSound();
    this.world.character.bottles++;
    this.updateStatusBarBottle();
  }

  /**
   * counts all elelements of the specified type in the collectables-Array
   * @param {Object} type
   * @returns {int}
   */
  countCollectable(type) {
    let count = 1;
    for (let element of this.world.level.collectables) {
      if (element instanceof type) {
        count++;
      }
    }

    return count;
  }

  /**
   * waiting for the keyboard Info to then throw a bottle from the inventory
   */
  checkThrowables() {
    let currentTime = new Date().getTime();
    if (
      this.world.keyboard.SPACE &&
      currentTime - this.world.lastThrow > 300 &&
      this.world.character.bottles > 0
    ) {
      let bottle;
      bottle = this.checkThrowSide();
      this.throwBottle(bottle);
      this.world.lastThrow = currentTime;
      this.world.character.resetLongIdleTime();
    }
  }
  /**
   * checks the side the character is facing and then returning a throwable-Object with the appropaite properties of coordinates
   * @returns {Object}
   */
  checkThrowSide() {
    let bottle;

    if (this.world.character.otherDirection) {
      bottle = this.leftSideBottle();
    } else {
      bottle = this.rightSideBottle();
    }
    return bottle;
  }

  /**
   * makes bottle appear on left side of character
   * @returns {object}
   */
  leftSideBottle() {
    let bottle = new ThrowableObject(
      this.world.character.x + 10,
      this.world.character.y + 120,
      -10
    );
    return bottle;
  }

  /**
   * makes bottle appear on right side of character
   * @returns {object}
   */
  rightSideBottle() {
    let bottle = new ThrowableObject(
      this.world.character.x + 40,
      this.world.character.y + 120,
      10
    );
    return bottle;
  }

  /**
   * throwing a bottle, moving it from the inventory of the character into the world
   * @param {Object} bottle
   */
  throwBottle(bottle) {
    this.world.throwableObjects.push(bottle);
    this.world.character.bottles--;
    this.updateStatusBarBottle();
  }

  /**
   * updates the statusbar of bottles
   */
  updateStatusBarBottle() {
    this.world.statusBarBottle.setPercentage(
      (this.world.character.bottles / this.world.maxBottles) * 100
    );
  }

  /**
   * updates the statusbar of Coins
   */
  updateStatusBarCoins() {
    this.world.statusBarCoin.setPercentage(
      Math.round((this.world.character.coins / this.world.totalCoins) * 100)
    );
  }
}
