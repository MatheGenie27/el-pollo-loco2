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

  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.calculateImgIndex()];
    this.img = this.imageCache[imagePath];
  }

  calculateImgIndex() {
    let ImgNr = Math.ceil(this.percentage / 20);
    return ImgNr;
  }
}
