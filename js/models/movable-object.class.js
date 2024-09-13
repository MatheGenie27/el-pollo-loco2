class MovableObject{
    x;
    y;
    img;
    imageCache={};
    speed;

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





}