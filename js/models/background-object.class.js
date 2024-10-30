
/**
 * Class for background objects. It is used to convert background pictures to a backgroundobject.
 * 
 * @constructor: @param String for an imagePath
 *                @param Int for an x coordinate that represents the starting point where the picture is drawn.
 */
class BackgroundObject extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 0;
  }
}
