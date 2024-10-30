/**
 * describes moving clouds as backgroundobjects
 * @constructor generates a random x-starting coordinate
 */
class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;
  speed = 0.15;

  constructor() {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");

    this.x = -719 + Math.random() * 7 * 719;
    this.animate();
  }

  /**
   * animates the movement of the cloud
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
      this.appearAgain();
    }, 1000 / 60);
  }

  /**
   * makes the cloud appear again on the right side of the game after she disappeared on the left side of the game.
   */
  appearAgain() {
    if (this.x < -800) {
      this.x = 7 * 719;
    }
  }
}
