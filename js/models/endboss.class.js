class Endboss extends MovableObject {


    x = 500;
    y = 250;
    width= 150;
    height= 200;
    speed = 0.5;
    

    IMAGES_WALKING=[
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
        
    ]


    constructor(){
        super();
        super.loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        super.loadImages(this.IMAGES_WALKING);

        this.x = 2000 + Math.random()*100;
        this.speed = 0.05 + Math.random()*0.25;
        this.animate();
    }


    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000/3);



        this.moveLeft();

    }

}