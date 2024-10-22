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

  hit() {
    if (this instanceof Character) {
      if (!this.isHurt()) {
        this.loseEnergy();
      }
    } else {
      this.loseEnergy();
    }
  }

  loseEnergy() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    return timepassed < 1;
  }

  isColliding(mo) {
    
    return (
      this.coll_x < mo.coll_x + mo.coll_width && 
      this.coll_x + this.coll_width > mo.coll_x && 
      this.coll_y < mo.coll_y + mo.coll_height && 
      this.coll_y + this.coll_height > mo.coll_y
    ); 
  }

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

  isAboveGround() {
    return this.y < this.ground_y;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  stop() {
    this.x = this.x;
  }

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
