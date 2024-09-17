class DrawableObject{

    x;
    y;
    width;
    height;
    img;
    imageCache={};
    world;
    otherDirection = false;
    currentImage = 0;


    loadImage(path){
        this.img = new Image();
        this.img.src=path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let image = new Image();
            image.src= path;
            this.imageCache[path] = image;
        });
        
    }
    
    draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx){
        if(this instanceof Chicken || this instanceof Character){
        ctx.beginPath();
        ctx.linewidth= "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
        }

    }


    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }




}