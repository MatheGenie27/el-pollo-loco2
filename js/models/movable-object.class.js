class MovableObject{
    x;
    y;
    img;
    imageCache={};
    speed;
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

    moveRight(){
        console.log('Moving Right');
    }

    moveLeft(){
        setInterval( () => {
            this.x -= this.speed;
        },1000/60)
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



}