class Chick extends MovableObject {
    x = 500;
    y = 388;
    width= 35;
    height= 40;
    speed = 0.7;

    coll_height = 30;
    coll_width = 30;
    coll_x = 50;
    coll_y = 30;
    

    IMAGES_WALKING=[
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]


    constructor(){
        super();
        super.loadImage('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);

        //this.x = 1500 + Math.random()*500;
        this.speed = 0.7 + Math.random()*0.35;
        this.animate();
    }

    updateCollisionBox(){
        this.coll_x = this.x +2;
        this.coll_y = this.y +5;
    }


    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000/11);


        setInterval(()=> {
            this.moveLeft();
            this.updateCollisionBox();
        }, 1000/60);
       

    }

}