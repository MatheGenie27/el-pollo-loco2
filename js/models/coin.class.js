/**
 * describes coins as collectables
 * @constructor while constructing the objects makes sure that there is no overlapping with already existing coins.
 * for that a static array is used that stores all positions of already generated coins.
 */
class Coin extends CollectableObject {
  static allCoins = [];

  x = 200;
  y = 250;
  width = 150;
  height = 150;

  coll_x;
  coll_y = 250;
  coll_width = 150;
  coll_height = 150;

  frequency = 0.0035;
  amplitude = 50;
  y_displacement = 200;
  starttime = null;

  IMAGES = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

  intervalAnimate;
  intervalControl;

  constructor() {
    super();
    super.loadImage("./img/8_coin/coin_1.png");
    super.loadImages(this.IMAGES);

    this.x = this.generateNonOverlappingX();

    this.initCollisionBox();

    this.animate();
    this.y_displacement = this.randomYDisplacement();
    Coin.allCoins.push(this.coll_x);
  }

  /**
   * clears the static array which stores the starting positions of previously generated coins
   */
  static clearStartPositionArray() {
    Coin.allCoins = [];
  }

  /**
   * returns a random y-axis starting position
   * @returns int
   */
  randomYDisplacement() {
    return Math.random() * 50 + 40;
  }

  /**
   * this returs a x starting position that has not already been taken
   * @returns int
   */
  generateNonOverlappingX() {
    let newX;
    let isOverlapping;

    do {
      isOverlapping = false;
      newX = 150 + Math.random() * (1950 / 1);

      for (let i = 0; i < Coin.allCoins.length; i++) {
        if (Math.abs(newX + 50 - Coin.allCoins[i]) < 50) {
          isOverlapping = true;
          break;
        }
      }
    } while (isOverlapping);

    return newX;
  }

  /**
   * initiates a collisionbox for the object
   */
  initCollisionBox() {
    this.coll_x = this.x + 50;
    this.coll_width = this.width - 100;
    this.coll_height = this.height - 100;
  }

  /**
   * controls the movement for the coin. to ease the y-movement a trigonmetric function is used
   */
  move() {
    if (!this.starttime) {
      this.starttime = new Date().getTime() + Math.random() * 500;
    }
    let currentTime = new Date().getTime();
    let passedTime = currentTime - this.starttime;

    this.y =
      Math.sin(passedTime * this.frequency) * this.amplitude +
      this.y_displacement;
    this.updateCollisionBox();
  }

  /**
   * updates the collisionbox
   */
  updateCollisionBox() {
    this.coll_y = this.y + 50;
  }

  /**
   * animates the coin object
   */
  animate() {
    this.intervalAnimate = setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 4);

    this.intervalControl = setInterval(() => {
      this.move();
    }, 1000 / 60);
  }
}
