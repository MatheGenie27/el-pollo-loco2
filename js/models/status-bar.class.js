/**
 * represents the general statusbar
 */
class StatusBar extends DrawableObject {
  IMAGES = [];
  percentage;
  x = 20;
  y;
  width = 200;
  height = 60;

  constructor() {
    super();
  }

  /**
   * sets the statusbar to a certain percentage
   * @param {int} percentage 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.calculateImgIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * returns the indexnumber of the statusbarImage that matches its percentage
   * @returns {int}
   */
  calculateImgIndex() {
    let ImgNr = Math.ceil(this.percentage / 20);
    return ImgNr;
  }
}
