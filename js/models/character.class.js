/**
 * describes the figure the player can control in the game.
 */
class Character extends MovableObject {
  x = 100;
  y = 175;
  width = 100;
  height = 250;
  coll_x;
  coll_y;
  coll_width;
  coll_height;
  coins = 0;
  bottles = 0;
  speed = 2;
  ground_y = 180;
  speedY = 0;
  accelerationY = 1;
  controlInterval;
  isInvulnerable = false;
  invulnerableStartTime = 0;
  playedDeadAnimation = false;
  dead = false;
  run = false;
  idle = false;
  longIdle = false;
  hurt = false;
  jumping = false;
  lastInput;
  longIdleTime = 0;
  won = false;
  lastImage = false;
  deadSound = false;
  intervalAnimate;
  intervalFlag;
  controlInterval;
  characterResources;

  constructor() {
    super();
    this.characterResources = new CharacterRessources();
    super.loadImage(this.characterResources.lastImage);
    super.loadImages(this.characterResources.IMAGES_WALKING);
    super.loadImages(this.characterResources.IMAGES_IDLE);
    super.loadImages(this.characterResources.IMAGES_LONGIDLE);
    super.loadImages(this.characterResources.IMAGES_DEAD);
    super.loadImages(this.characterResources.IMAGES_HURT);
    super.loadImages(this.characterResources.IMAGES_JUMPING);
    super.loadImages(this.characterResources.IMAGES_FALLING);
    this.y = 480 - this.height - this.ground_y;
    this.characterHandling();
    this.applyGravity();
    this.checkIfSound();
    this.characterResources.SNORING_SOUND.volume = 0.5;
    this.characterResources.WALKING_SOUND.volume = 1;
  }

  /**
   * constantly checks if sound is being deactivated in the game. and then aborts playing sounds if so.
   */
  checkIfSound() {
    this.checkSoundInterval = setInterval(() => {
      if (sound === false) {
        this.abortLongSounds();
      }
    }, 1000 / 10);
  }

  /**
   * aborts all sounds that could be playing
   */
  abortLongSounds() {
    this.characterResources.HURT_SOUND.pause();
    this.characterResources.DEAD_SOUND.pause();
    this.characterResources.SNORING_SOUND.pause();
    this.characterResources.JUMPING_SOUND.pause();
  }

  /**
   * stops the movement,control and intervals of the character
   */
  stopCharacter() {
    this.stopControl();
    clearInterval(this.intervalAnimate);
    clearInterval(this.intervalFlag);
    clearInterval(this.checkSoundInterval);
  }

  /**
   * stops the control interval
   */
  stopControl() {
    clearInterval(this.controlInterval);
  }

  /**
   * activates the invulnerability of the character, is used after being hurt once, so the character does not
   * suffer hits every 60 times per second due to the collision checking.
   */
  activateInvulnerability() {
    this.isInvulnerable = true;
    this.invulnerableStartTime = Date.now();
  }

  /**
   * checks the state of the invulnerability and deactivates it, if the state already exists longer than 800ms.
   */
  checkInvulnerability() {
    if (this.isInvulnerable && Date.now() - this.invulnerableStartTime > 800) {
      this.isInvulnerable = false;
    }
  }

  /**
   * resets all state flags
   */
  resetFlag() {
    this.dead = false;
    this.run = false;
    this.idle = false;
    this.longIdle = false;
    this.hurt = false;
    this.jumping = false;
  }

  /**
   * resets the LongIdleTime. It is used after the character receives a new player input
   */
  resetLongIdleTime() {
    this.longIdleTime = new Date().getTime();
    this.stopLongIdleSound();
  }
  /**
   * deactivates the longIdle-Sound.
   */
  stopLongIdleSound() {
    this.characterResources.SNORING_SOUND.pause();
  }

  /**
   * updates the coordinates of the collisionbox relative to the coordinates of the character
   */
  updateCollisionBox() {
    this.coll_x = this.x + 15;
    this.coll_y = this.y + 100;
    this.coll_width = this.width - 40;
    this.coll_height = this.height - 110;
  }

  /**
   * deactivates the playerControl after the player died
   */
  checkDead() {
    if (this.dead) {
      this.stopControl();
    }
  }

  /**
   * handles the elements of the character control and animation
   */
  characterHandling() {
    this.processInput();
    this.animate();
    this.updateFlag();
  }

  /**
   * handles the processes arounf the Input
   */
  processInput() {
    this.controlInterval = setInterval(() => {
      this.handlingProcessesRegardingTheInput();
      this.handlingActualInput();
    }, 1000 / 60);
  }

  /**
   * handles the processes around the Input
   */
  handlingProcessesRegardingTheInput() {
    this.characterResources.WALKING_SOUND.pause();
    this.world.camera_x = -this.x + 100;
    this.updateCollisionBox();
    this.checkDead();
  }

  /**
   * handles the actualInput
   */
  handlingActualInput() {
    if (this.world.keyboard.RIGHT && this.x <= 7 * 719) {
      this.inputRight();
    }

    if (this.world.keyboard.LEFT && this.x >= -200) {
      this.inputLeft();
    }

    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.inputJump();
    }
  }

  /**
   * handles the input of going right
   */
  inputRight() {
    this.moveRight();
    this.otherDirection = false;
    if (sound && !this.isAboveGround())
      this.characterResources.WALKING_SOUND.play();
  }

  /**
   * handles the input of going left
   */
  inputLeft() {
    this.moveLeft();
    this.otherDirection = true;
    if (sound && !this.isAboveGround())
      this.characterResources.WALKING_SOUND.play();
  }

  /**
   * handles the input of jumping
   */
  inputJump() {
    const now = Date.now();
    if (!this.lastJump || now - this.lastJump >= 900) {
      this.jump();
      this.jumping = true;
      this.lastJump = now;
    }
  }

  /**
   * handles animation regarding to the state the character is in
   */
  animate() {
    this.intervalAnimate = setInterval(() => {
      if (!this.won) {
        switch (true) {
          case this.dead:
            this.animateDead();
            break;
          case this.hurt:
            this.animateHurt();
            break;
          case this.jumping:
            this.animateJump();
            break;
          case this.falling:
            this.animateFall();
            break;
          case this.run:
            this.animateRun();
            break;
          default:
            this.animateIdle();
            break;
        }
      } else {
        this.showLastImage();
      }
    }, 1000 / 10);
  }

  /**
   * used after the character died, this continuisly shows the last Image of the dead-Animation.
   */
  showLastImage() {
    if (!this.lastImage) {
      super.loadImage(this.characterResources.lastImage);
      this.lastImage = true;
    }
  }

  /**
   * handles to show the correct idleAnimation
   */
  animateIdle() {
    if (!this.longIdleTime) {
      this.resetLongIdleTime();
    }
    let currentTime = new Date().getTime();

    if (currentTime - this.longIdleTime > 5000) {
      this.playAnimation(this.characterResources.IMAGES_LONGIDLE);
      if (sound) this.characterResources.SNORING_SOUND.play();
    } else {
      this.playAnimation(this.characterResources.IMAGES_IDLE);
    }
  }

  /**
   * handles the walking-Animation
   */
  animateRun() {
    this.playAnimation(this.characterResources.IMAGES_WALKING);
    this.resetLongIdleTime();
  }

  /**
   * handles the falling-animation
   */
  animateFall() {
    this.playAnimation(this.characterResources.IMAGES_FALLING);
    this.resetLongIdleTime();
  }

  /**
   * handles the jumping-animation
   */
  animateJump() {
    this.playAnimation(this.characterResources.IMAGES_JUMPING);
    if (sound) this.characterResources.JUMPING_SOUND.play();
    this.resetLongIdleTime();
  }

  /**
   * handles the hurt-animation
   */
  animateHurt() {
    this.playAnimation(this.characterResources.IMAGES_HURT);
    if (sound) this.characterResources.HURT_SOUND.play();
    this.resetLongIdleTime();
  }

  /**
   * handles the dying animation
   */
  animateDead() {
    if (!this.playedDeadAnimation) {
      this.playAnimation(this.characterResources.IMAGES_DEAD);
      if (sound) this.characterResources.HURT_SOUND.play();
      setTimeout(() => {
        this.playedDeadAnimation = true;
        this.characterResources.HURT_SOUND.pause();
      }, 500);
    } else {
      super.loadImage(this.characterResources.IMAGES_DEAD[5]);
    }
  }

  /**
   * handles the flagUpdating
   */
  updateFlag() {
    this.intervalFlag = setInterval(() => {
      this.resetFlag();
      this.updateRun();
      this.updateDead();
      this.updateFalling();
      this.updateHurt();
    }, 1000 / 10);
  }

  /**
   * updating dead Flag
   */
  updateDead() {
    if (this.isDead()) this.dead = true;
  }

  /**
   * updating run Flag
   */
  updateRun() {
    if (
      (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) &&
      !this.isAboveGround()
    )
      this.run = true;
  }

  /**
   * updating Falling flag
   */
  updateFalling() {
    if (this.isAboveGround()) {
      this.falling = true;
    } else {
      this.falling = false;
    }
  }

  /**
   * updating Hurt Flag
   */
  updateHurt() {
    if (this.isHurt()) this.hurt = true;
  }
}
