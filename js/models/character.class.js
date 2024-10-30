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

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_FALLING = [
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  WALKING_SOUND = new Audio("audio/sfx/footsteps_of_someone0.mp3");
  HURT_SOUND = new Audio("audio/sfx/Someone_moans_becaus.mp3");
  DEAD_SOUND = new Audio("audio/sfx/Someone_curses_on_sp.mp3");
  JUMPING_SOUND = new Audio("audio/sfx/someone_jumps_in_the.mp3");
  SNORING_SOUND = new Audio("audio/sfx/spanish_man_snores.mp3");

  lastImage = "img/2_character_pepe/2_walk/W-21.png";

  constructor() {
    super();

    super.loadImage(this.lastImage);
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_IDLE);
    super.loadImages(this.IMAGES_LONGIDLE);
    super.loadImages(this.IMAGES_DEAD);
    super.loadImages(this.IMAGES_HURT);
    super.loadImages(this.IMAGES_JUMPING);
    super.loadImages(this.IMAGES_FALLING);
    this.y = 480 - this.height - this.ground_y;

    this.characterHandling();
    this.applyGravity();
    this.checkIfSound();

    this.SNORING_SOUND.volume = 0.5;
    this.WALKING_SOUND.volume = 1;
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
    this.HURT_SOUND.pause();
    this.DEAD_SOUND.pause();
    this.SNORING_SOUND.pause();
    this.JUMPING_SOUND.pause();
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
    this.SNORING_SOUND.pause();
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
   * handles the Input the character receives
   */
  processInput() {
    this.controlInterval = setInterval(() => {
      this.WALKING_SOUND.pause();

      if (this.world.keyboard.RIGHT && this.x <= 7 * 719) {
        this.inputRight();
      }

      if (this.world.keyboard.LEFT && this.x >= -200) {
        this.inputLeft();
      }

      if (this.world.keyboard.UP && !this.isAboveGround() && !this.hurt) {
        this.inputJump();
      }
      this.world.camera_x = -this.x + 100;
      this.updateCollisionBox();
      this.checkDead();
    }, 1000 / 60);
  }

  /**
   * handles the input of going right
   */
  inputRight() {
    this.moveRight();
    this.otherDirection = false;
    if (sound && !this.isAboveGround()) this.WALKING_SOUND.play();
  }

  /**
   * handles the input of going left
   */
  inputLeft() {
    this.moveLeft();
    this.otherDirection = true;
    if (sound && !this.isAboveGround()) this.WALKING_SOUND.play();
  }

  /**
   * handles the input of jumping
   */
  inputJump() {
    this.jump();
    this.jumping = true;
  }

  /**
   * handles animation regarding to the state the character is in
   */
  animate() {
    this.intervalAnimate = setInterval(() => {
      this.HURT_SOUND.pause();
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
      super.loadImage(this.lastImage);
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
      this.playAnimation(this.IMAGES_LONGIDLE);
      if (sound) this.SNORING_SOUND.play();
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * handles the walking-Animation
   */
  animateRun() {
    this.playAnimation(this.IMAGES_WALKING);
    this.resetLongIdleTime();
  }

  /**
   * handles the falling-animation
   */
  animateFall() {
    this.playAnimation(this.IMAGES_FALLING);
    this.resetLongIdleTime();
  }

  /**
   * handles the jumping-animation
   */
  animateJump() {
    this.playAnimation(this.IMAGES_JUMPING);
    if (sound) this.JUMPING_SOUND.play();
    this.resetLongIdleTime();
  }

  /**
   * handles the hurt-animation
   */
  animateHurt() {
    this.playAnimation(this.IMAGES_HURT);
    if (sound) this.HURT_SOUND.play();
    this.resetLongIdleTime();
  }

  /**
   * handles the dying animation
   */
  animateDead() {
    if (!this.playedDeadAnimation) {
      this.playAnimation(this.IMAGES_DEAD);
      if (sound) this.HURT_SOUND.play();
      setTimeout(() => {
        this.playedDeadAnimation = true;
        this.HURT_SOUND.pause();
      }, 500);
    } else {
      super.loadImage(this.IMAGES_DEAD[5]);
    }
  }

  /**
   * handles the flagUpdating
   */
  updateFlag() {
    this.intervalFlag = setInterval(() => {
      this.resetFlag();
      if (this.isDead()) this.dead = true;
      if (
        (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) &&
        !this.isAboveGround()
      )
        this.run = true;
      if (this.isAboveGround()) {
        this.falling = true;
      } else {
        this.falling = false;
      }
      if (this.isHurt()) this.hurt = true;
      if (this.isDead()) this.dead = true;
    }, 1000 / 10);
  }
}
