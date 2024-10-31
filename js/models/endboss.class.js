/**
 * represents the endboss enemy
 */
class Endboss extends Enemy {
  x = 500;
  y = 75;
  width = 300;
  height = 400;
  speed = 0.1;
  normalSpeed;
  sprintSpeed;

  coll_height = 300;
  coll_width = 225;
  coll_x = 340;
  coll_y = 145;

  energy = 100;
  lastHit = 0;

  dead = false;
  hurt = false;
  alert = false;
  attack = false;
  run = false;
  sprint = false;
  lastSprint;
  nextSprint = 5000;
  sprintDuration;
  zone_left = 2100;

  brain;

  otherDirection = false;
  soundRange = false;
  deadSoundNotPlayed = true;

  intervalAnimate;
  intervalControl;
  intervalFlag;

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G24.png",

    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",

    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  AUDIO_CHICKENYELL = new Audio("audio/sfx/chicken_yells_becaus.mp3");
  AUDIO_ALERT = new Audio("audio/sfx/chicken_alert.mp3");
  AUDIO_HURT = new Audio("audio/sfx/Sharp_sizzling_sound.mp3");
  AUDIO_ATTACK = new Audio("audio/sfx/chicken_crows_attack.mp3");

  constructor() {
    super();
    this.brain = new EndbossAI();
    super.loadImage("./img/4_enemie_boss_chicken/1_walk/G1.png");
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_DEAD);
    super.loadImages(this.IMAGES_HURT);
    super.loadImages(this.IMAGES_ALERT);
    super.loadImages(this.IMAGES_ATTACK);
    this.lastHit = Date.now();
    this.lastSprint = Date.now();
    this.x = 7 * 719;
    this.speed = 0.5 + Math.random() * 0.5;
    this.normalSpeed = this.speed;
    this.sprintSpeed = 4 * this.normalSpeed + Math.random() * 3;
    //this.x=300;
    //this.speed =0;
    this.checkIfSound();
    this.handleControl();
  }

  /**
   * stops Enemy from moving and controlling
   */
  stopEnemy() {
    clearInterval(this.intervalAnimate);
    clearInterval(this.intervalControl);
    clearInterval(this.intervalFlag);
    clearInterval(this.checkSoundInterval);
  }

  /**
   * checks if sound is being disables and aborts all playing sounds if so
   */
  checkIfSound() {
    this.checkSoundInterval = setInterval(() => {
      if (sound === false) {
        this.abortLongSounds();
      }
    }, 1000 / 10);
  }

  /**
   * ends all long sounds
   */
  abortLongSounds() {
    this.AUDIO_CHICKENYELL.pause();
  }

  //controls what happens when the endboss is hit
  hit() {
    let currentTime = Date.now();

    if (currentTime - this.lastHit >= 290) {
      this.reduceEnergy();
      this.lastHit = currentTime;
      this.brain.report("hit");
    }
  }

  /**
   * reduces Energy after being hit
   */
  reduceEnergy() {
    if (this.energy >= 0) {
      this.energy = this.energy - 15;
    } else if (this.enery < 0) {
      this.energy = 0;
    }
  }

  /**
   * reports the information to the KI
   */
  attacking() {
    this.brain.report("attack");
  }

  /**
   * updates Collisionbox in relation to the coordinates
   */
  updateCollisionBox() {
    this.coll_x = this.x + 40;
  }

  /**
   * checks if the energylevel is high enough to continue living
   */
  checkEnergy() {
    if (this.energy <= 0) {
      {
        this.kill();
        this.brain.report("dead");
      }
    }
  }

  /**
   * handles behaviour if enemy is killed
   */
  kill() {
    this.moveCollisionBoxAway();
  }

  /**
   * moves collisionbox far away to prevent collision with character after endboss died
   */
  moveCollisionBoxAway() {
    this.coll_x = 5000;
    this.coll_y = 5000;
  }

  /**
   * get instructions from the endboss KI on what do to
   * @returns {string}
   */
  controlMovement() {
    return this.brain.getInstructions();
  }

  /**
   * resets the state flags
   */
  resetFlags() {
    this.run = false;
    this.hurt = false;
    this.attack = false;
    this.alert = false;
  }

  /**
   * checks if enemy has run off the left side of the game and make it reappear on the right side of the game
   */
  checkLevelBorder() {
    if (this.x <= -900) {
      this.x = 9 * 719;
    }
  }

  /**
   * handles the control of the enemy
   */
  handleControl() {
    this.handleAnimation();
    this.handleBehavior();
    this.handleFlag();
  }

  /**
   * handles the animation regarding the state the enemy is in
   */
  handleAnimation() {
    this.intervalAnimate = setInterval(() => {
      switch (true) {
        case this.run:
          this.actRunning();
          break;

        case this.dead:
          this.actDead();

          break;

        case this.hurt:
          this.actHurt();

          break;

        case this.attack:
          this.actAttacking();
          break;

        case this.alert:
          this.actAlert();
          break;

        default:
          this.loadImage(this.IMAGES_WALKING[0]);
          break;
      }
    }, 1000 / 5);
  }

  /**
   * handles animation of state alert
   */
  actAlert() {
    this.playAnimation(this.IMAGES_ALERT);

    if (sound & this.soundRange) this.AUDIO_ALERT.play();
  }

  /**
   * handles animation of state attack
   */
  actAttacking() {
    this.playAnimation(this.IMAGES_ATTACK);
    if (sound && this.soundRange) this.AUDIO_ATTACK.play();
  }

  /**
   * handles the animation of state running
   */
  actRunning() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * handles the animation of state hurt
   */
  actHurt() {
    this.playAnimation(this.IMAGES_HURT);
    if (sound && this.soundRange) this.AUDIO_HURT.play();
  }

  /**
   * handles the animation of state dead
   */
  actDead() {
    if (!this.playedDeadAnimation) this.playAnimation(this.IMAGES_DEAD);

    setTimeout(() => {
      this.playedDeadAnimation = true;
    }, 800);
    if (sound && this.soundRange &&this.deadSoundNotPlayed) {
      this.AUDIO_CHICKENYELL.play();
      this.deadSoundNotPlayed = false;
    }

    if (this.playedDeadAnimation) this.loadImage(this.IMAGES_DEAD[5]);
  }

  /**
   * handles the behaviour
   */
  handleBehavior() {
    this.intervalControl = setInterval(() => {
      this.updateCollisionBox();
      this.checkLevelBorder();

      switch (true) {
        case this.run:
          this.runningBehaviour();
          break;

        case this.hurt:
          this.stop();
          break;

        case this.alert:
          this.stop();
          break;
      }
    }, 1000 / 60);
  }

  /**
   * controls running and sprinting
   */
  runningBehaviour() {
    if (Date.now() - this.lastSprint > this.nextSprint) {
      this.speed = this.sprintSpeed;
      this.sprintDuration = Math.random() * 2000 + 1000;
      this.lastSprint = Date.now();
      this.nextSprint = Math.random() * 3000 + 3000;
    }

    if (Date.now() - this.lastSprint > this.sprintDuration) {
      this.speed = this.normalSpeed;
    }
    this.moveLeft();
  }

  /**
   * handles the flags for the state the enemy is in
   */
  handleFlag() {
    this.intervalFlag = setInterval(() => {
      this.checkEnergy();
      this.resetFlags();
      if (this.controlMovement() == "run") this.run = true;
      if (this.controlMovement() == "alert")this.alert = true;
      if (this.controlMovement() == "attack")this.attack = true;
      if (this.controlMovement() == "hurt")this.hurt = true;
      if (this.controlMovement() == "dead")this.dead = true;
    }, 1000 / 20);
  }
}
