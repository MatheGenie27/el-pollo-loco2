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

    dead = false;
    hurt = false;
    alert = false;
    attack = false;
    

    IMAGES_WALKING=[
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
        
    ]

    IMAGES_DEAD = [
        '..img/4_enemie_boss_chicken/5_dead/G24.png',
        '..img/4_enemie_boss_chicken/5_dead/G25.png',
        '..img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',

    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    constructor(){
        super();
        super.loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);
        super.loadImages(this.IMAGES_HURT);
        super.loadImages(this.IMAGES_ALERT);
        super.loadImages(this.IMAGES_ATTACK);
        


        //this.x = 2000 + Math.random()*100;
        //this.speed = 0.05 + Math.random()*0.25;
        
        this.x=600;
        this.speed=0;


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