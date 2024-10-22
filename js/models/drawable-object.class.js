class DrawableObject {
  x;
  y;
  width;
  height;
  img;
  imageCache = {};
  world;
  otherDirection = false;
  currentImage = 0;
  ready;

  constructor() {
    this.ready = false;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  async loadImages(arr) {
    arr.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawBorder(ctx) {
    if (
      this instanceof Chicken ||
      this instanceof Character ||
      this instanceof Bottle ||
      this instanceof Coin ||
      this instanceof ThrowableObject ||
      this instanceof Endboss ||
      this instanceof Chick
    ) {
      ctx.beginPath();
      ctx.linewidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawCollisionBox(ctx) {
    if (
      this instanceof Character ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof Chick
    ) {
      ctx.beginPath();
      ctx.linewidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.coll_x, this.coll_y, this.coll_width, this.coll_height);
      ctx.stroke();
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
