class MovableObject{
    x;
    y;
    img;
    imageCache={};
    speed;
    world;
    otherDirection = false;
    currentImage = 0;
    speedY;
    accelerationY;
    ground_y;

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

    applyGravity(){
        setInterval( () => {
            if(this.isAboveGround() || this.speedY < 0){
                this.y += this.speedY;
                this.speedY += this.accelerationY;
            } 

        },1000/60)

    }

    isAboveGround(){
        return this.y < this.ground_y;
    }




    moveRight(){
        this.x += this.speed;
       
        
    }

    moveLeft(){
        
            this.x -= this.speed;

            
        
    }

    jump(){
        this.speedY = -20; 
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



}