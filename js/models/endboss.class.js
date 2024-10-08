class Endboss extends MovableObject {


    x = 500;
    y = 250;
    width= 150;
    height= 200;
    speed = 0.1;

    coll_height = 150;
    coll_width = 133;
    coll_x = 500; 
    coll_y = 285;
    

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

        //this.x = 2000 + Math.random()*100;
        this.speed = 0.05 + Math.random()*0.25;
        
        this.animate();
    }

    updateCollisionBox(){
        this.coll_x = this.x +10;
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000/3);


        setInterval(()=>{
            this.moveLeft();
            this.updateCollisionBox();
        }, 1000/60)
        

    }

}