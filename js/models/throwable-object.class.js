class ThrowableObject extends MovableObject{

    speedY;
    speedX;
    accelerationY = 1;
    ground_y = 370;

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



    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_THROW);
        
        this.throw(x,y);

    }
    
    throw(){
        this.speedY = -20;
        this.speedX = 10;
         this.applyGravity(); 
        setInterval( () => {
            if (this.isAboveGround()){
            this.x += this.speedX;
            }
        }, 1000/60) 

    }
    
}