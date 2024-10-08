class ThrowableObject extends MovableObject{

    speedY;
    speedX = 10;
    accelerationY = 1;
    ground_y = 370;

    coll_height = 30;
    coll_width = 28;
    coll_x = 100;
    coll_y = 100;

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    IMAGES_ONGROUND = [
        
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',

    ]

    landed = false;


    constructor(x,y,speedX){
        super();
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;

        this.speedX = speedX;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_ONGROUND);
        
        this.throw(x,y);

    }

    updateCollisionBox(){
        this.coll_x = this.x+16 ;
        this.coll_y = this.y +14 ;
       //console.log("collisionbox update von throwable");
    }
    
    throw(){
        this.speedY = -20;
        
         this.applyGravity(); 
        setInterval( () => {
            if (this.isAboveGround()){
            this.x += this.speedX;
            this.playAnimation(this.IMAGES_THROW);
            } else {
                if(!this.landed){
                this.loadImage(this.IMAGES_ONGROUND[Math.round(Math.random())]);
                this.landed = true;
                }
            }
            this.updateCollisionBox();
        }, 1000/60) 

    } 
    
}