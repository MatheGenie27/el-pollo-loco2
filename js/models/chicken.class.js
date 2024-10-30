/**
 * describes the enemy Chicken in this game.
 */
class Chicken extends Enemy {
  x = 500;
  y = 350;
  width = 50;
  height = 80;
  speed = 0.3;

  coll_height = 67;
  coll_width = 50;
  coll_x;
  coll_y = 354;

  dead = false;

  lastCry;
  nextCry = 1000;
  soundRange = false;

  intervalAnimate;
  intervalControl;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  DEAD_SOUND = new Audio("audio/sfx/squashing_sound.mp3");
  CRY_SOUND = new Audio("audio/sfx/chicken_sound.mp3");

  constructor() {
    super();
    super.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_DEAD);
    this.x = 10 * 719 - Math.random() * 9 * 719;
    this.speed = 0.15 + Math.random() * 0.25;
    this.lastCry = Date.now();
    this.animate();
  }

  /**
   * kills ths enemy
   */
  kill() {
    this.dead = true;
    if (sound) {
      this.DEAD_SOUND.play();
    }
  }

  /**
   * stops enemy intervals
   */
  stopEnemy() {
    clearInterval(this.intervalAnimate);
    clearInterval(this.intervalControl);
  }

  /**
   * updates the collisionBox for this enemy
   */
  updateCollisionBox() {
    this.coll_x = this.x;
  }

  /**
   * moves the collisionbox far away to prevent collsions whith character after the enemy has died
   */
  moveCollisionBoxAway() {
    this.coll_x = 5000;
    this.coll_y = 5000;
  }

  /**
   * controls and animates the enemy
   */
  animate() {
    this.animation();
    this.control();
  }

  /**
   * handles the animations for this enemy
   */
  animation() {
    this.intervalAnimate = setInterval(() => {
      if (!this.dead) {
        this.actAlive();
      } else {
        this.actDead();
      }
    }, 1000 / 9);
  }

  /**
   * handles the animation and position of the enemy after the enemy died
   */
  actDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y = 360;
  }

  /**
   * handles the animation and sound of the enemy when alive
   */
  actAlive() {
    this.playAnimation(this.IMAGES_WALKING);

    this.cry();
  }

  /**
   * handles the cry-behaviour of the enemy
   */
  cry() {
    if (this.checkLastCry()) {
      this.actualCry();
    }
  }

  /**
   * checks if the last cry was long enough ago for the next cry
   * @returns boolean
   */
  checkLastCry() {
    return Date.now() - this.lastCry > this.nextCry && this.soundRange && sound;
  }

  /**
   * handles the cry of this enemy
   */
  actualCry() {
    this.CRY_SOUND.play();

    this.lastCry = Date.now();
    this.nextCry = 2000 + Math.random() * 3000;
  }

  /**
   * controls the movement of the Enemy
   */
  control() {
    this.intervalControl = setInterval(() => {
      if (!this.dead) {
        this.behaveAlive();
      } else {
        this.moveCollisionBoxAway();
      }
    }, 1000 / 60);
  }

  /**
   * checks if the enemy has run off the left side of the game and make it reappear on the right side
   */
  checkBorder() {
    if (this.x <= -719) {
      this.x = 6 * 719;
    }
  }

  /**
   * controls the behaviour of movement of the enemy when alive
   */
  behaveAlive() {
    this.moveLeft();
    this.updateCollisionBox();
    this.checkBorder();
  }
}
