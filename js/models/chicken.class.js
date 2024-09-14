class Chicken extends MovableObject{

    x = 500;
    y = 350;
    width= 50;
    height= 80;
    speed = 0.3;
    

    IMAGES_WALKING=[
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]


    constructor(){
        super();
        super.loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);

        this.x = 500 + Math.random()*500;
        this.speed = 0.15 + Math.random()*0.25;
        this.animate();
    }


    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000/9);



        this.moveLeft();

    }



}