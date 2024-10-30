/**
 * represents an enemy in general
 */

class Enemy extends MovableObject {
  constructor() {
    super();
  }

  /**
   * stops enemy intervals
   */
  stopEnemy() {
    clearInterval(this.intervalAnimate);
    clearInterval(this.intervalControl);
  }
}
