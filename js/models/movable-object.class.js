/**
 * this represents general movable objects in the game
 */

class MovableObject extends DrawableObject {
  speed;
  originalSpeed;

  speedY;
  accelerationY;
  ground_y;
  energy = 100;
  lastHit = 0;

  coll_x;
  coll_y;
  coll_width;
  coll_height;

  constructor() {
    super();
  }

  /**
   * if a movable Object is hit, it loses Energy
   */
  hit() {
    if (this instanceof Character) {
      if (!this.isHurt()) {
        this.loseEnergy();
      }
    } else {
      this.loseEnergy();
    }
  }

  /**
   * subtracts Energy from an object
   */
  loseEnergy() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * checks if an object is dead
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * checks if an object is hurt
   * @returns {boolean}
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    return timepassed < 1;
  }

  /**
   * checks if executint object is colliding with the target object
   * @param {Object} mo 
   * @returns {boolean}
   */
  isColliding(mo) {
    
    return (
      this.coll_x < mo.coll_x + mo.coll_width && 
      this.coll_x + this.coll_width > mo.coll_x && 
      this.coll_y < mo.coll_y + mo.coll_height && 
      this.coll_y + this.coll_height > mo.coll_y
    ); 
  }

  /**
   * mimics the force of gravity on an executing object
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.accelerationY;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

  /**
   * checks if the executing object is in the air
   * @returns {boolean}
   */
  isAboveGround() {
    return this.y < this.ground_y;
  }

  /**
   * moves the object right 
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * moves the object left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * stops the object without maniplulating its speed-property
   */
  stop() {
    this.x = this.x;
  }

  /**
   * handles the jumping of objects
   */
  jump() {
    if (this instanceof Character) {
      this.speedY = -20;
    } else if (this instanceof Chick) {
      this.speedY = -10;
      setTimeout(() => {
        this.speed = this.originalSpeed * 3;
      }, 50);
    }
  }
}
