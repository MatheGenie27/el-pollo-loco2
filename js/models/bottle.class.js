/**
 * class describes Bottles as collectable Objects in the game.
 * @constructor: generates a random x coordinate for the bottle to appear ingame. 
 * 
 */
class Bottle extends CollectableObject {
  x = 200;
  y = 375;
  width = 50;
  height = 60;

  coll_x = 200;
  coll_y = 375;
  coll_width = 50;
  coll_height = 60;

  IMAGES = ["img/6_salsa_bottle/salsa_bottle.png"];

  intervalAnimate;
  intervalControl;

  constructor() {
    super();
    super.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    super.loadImages(this.IMAGES);
    this.x = 200 + (Math.random() * 4 * 719 - 200);
    this.animate();
    this.initCollisionBox();
  }

  /**
   * initiates a collisionBox around the object
   */
  initCollisionBox() {
    this.coll_x = this.x + 20;
    this.coll_width = this.width - 40;
    this.coll_y = this.y + 8;
    this.coll_height = this.height - 16;
  }

  /**
   * animates the object, though there is currently only one picture.
   * But if an visual effect should be added to the bottle, this would be the place.
   */
  animate() {
    this.intervalAnimate = setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 9);

    this.intervalControl = setInterval(() => {}, 1000 / 60);
  }
}
