/**
 * this class represents the enemy known as chick.
 */
class Chick extends Enemy {
  x = 500;
  y = 388;
  width = 35;
  height = 40;
  speed = 1.4;
  originalSpeed;
  speedY = 0;
  accelerationY = 1;
  ground_y = 388;

  coll_height = 30;
  coll_width = 30;
  coll_x = 50;
  coll_y = 30;

  dead = false;
  lastJump = 0;
  nextJump = 5000;
  currentTime;

  soundRange = false;

  intervalControl;
  intervalAnimate;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  DEAD_SOUND = new Audio("audio/sfx/squashing_sound.mp3");
  JUMP_SOUND = new Audio("audio/sfx/The_chirping_of_a_ch.mp3");

  constructor() {
    super();
    super.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_DEAD);
    this.x = 10 * 719 - Math.random() * 6 * 719;
    this.speed = 2 + Math.random() * 5;
    this.originalSpeed = this.speed;
    this.animate();
    this.applyGravity();
    this.currentTime = Date.now();
    this.lastJump = Date.now();
    this.nextJump = Math.random() * 10000;
  }

  /**
   * kills this enemy
   */
  kill() {
    this.dead = true;
    if (sound) this.DEAD_SOUND.play();
  }

  /**
   * stops enemy intervals
   */
  stopEnemy() {
    clearInterval(this.intervalAnimate);
    clearInterval(this.intervalControl);
  }


  /**
   * updates the Collisionboc
   */
  updateCollisionBox() {
    this.coll_x = this.x + 2;
    this.coll_y = this.y + 5;
  }

  /**
   * moves the collisionbox way out of reach, so that the character does not collide with dead enemies.
   */
  moveCollisionBoxAway() {
    this.coll_x = 5000;
    this.coll_y = 5000;
  }

  /**
   * brings the enemy to life
   */
  animate() {
    this.animation();
    this.control();
  }

  /**
   * handles the animation for this enemy
   */
  animation() {
    this.intervalAnimate = setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 1000 / 11);
  }

  /**
   * controls the behaviour of this enemy
   */
  control() {
    this.intervalControl = setInterval(() => {
      
      if (!this.dead) {
            this.actAlive();
      } else {
        this.moveCollisionBoxAway();
      }
    }, 1000 / 60);
  }

  /**
   * defines the detailed behaviour of the enemy
   */
  actAlive(){
    this.moveLeft();
    this.checkBorder();
    if (this.checkJump()) this.actualJump();        
    this.maintainSpeed();
    this.updateCollisionBox();
  }

  /**
   * resets the speed to normal after the chick touches ground after jumping
   */
  maintainSpeed(){
    if (!this.isAboveGround()) {
        this.speed = this.originalSpeed;
      }
  }

  /**
   * checks if the lastJump was long enough ago to jump again
   * @returns boolean
   */
  checkJump(){
    this.currentTime = Date.now();
    return this.currentTime - this.lastJump > this.nextJump &&
    !this.isAboveGround();
  }

  /**
   * controls the jump behaviour, especially sets a random time when to perform the next jump
   */
  actualJump(){
    this.jump();
    if (this.soundRange && sound) this.JUMP_SOUND.play();

    this.lastJump = this.currentTime;
    this.nextJump = 2000 + Math.random() * 3000;
  }

  /**
   * checks if the enemy has run out of the left side of the game and make it return on the right side
   */
  checkBorder(){
    if (this.x <= -719) this.x = 7 * 719;
  }

}
