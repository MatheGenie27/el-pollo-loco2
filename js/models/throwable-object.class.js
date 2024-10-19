class ThrowableObject extends MovableObject{

    speedY;
    speedX = 10;
    accelerationY = 1;
    ground_y = 370;

    coll_height = 30;
    coll_width = 28;
    coll_x = 100;
    coll_y = 100;

    id;

    static serialNumber= 1;

    intervalContact;
    intervalFly;

    

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
    splashed = false;
    hasHit = false;

    SPLASH_SOUND = new Audio('audio/sfx/fluid_splashin_onto_.mp3');
    BREAK_SOUND= new Audio('audio/sfx/bottle_breaking.mp3');
    THROW_SOUND = new Audio('audio/sfx/someone_throws_somet.mp3');
    LANDING_SOUND = new Audio('audio/sfx/something_landing_in.mp3');

    constructor(x,y,speedX){
        
        super();
        this.generateID();
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;

        this.speedX = speedX;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_ONGROUND);
        
        
        //console.log("FlaschenID: " +this.id);

        this.throw(x,y);
        

    }

    stopThrowables(){
        clearInterval(this.intervalContact);
        clearInterval(this.intervalFly);
    }

    generateID(){
        this.id = ThrowableObject.serialNumber;
        ThrowableObject.serialNumber++;

    }

    updateCollisionBox(){
        this.coll_x = this.x+16 ;
        this.coll_y = this.y +14 ;
       //console.log("collisionbox update von throwable");
    }

    splash(){
        this.moveCollisionBoxAway();
        this.speedY = 0;
        this.speedX = 0;
        this.accelerationY = 0;
        this.splashed = true;
        
        this.THROW_SOUND.pause();
        if(sound)this.BREAK_SOUND.play();
        setTimeout( () => {
            if(sound)this.SPLASH_SOUND.play();
        },100)
        
    }

    

    moveCollisionBoxAway(){
        this.coll_x = -5000;
        this.coll_y = -5000;
    }
    
    throw(){
        this.speedY = -20;
        if(sound)this.THROW_SOUND.play();
        
         this.applyGravity(); 
        this.intervalFly = setInterval( () => {
            if (this.isAboveGround()){
            this.x += this.speedX;
                       

            } else {
                if(!this.landed && !this.splashed){
                this.loadImage(this.IMAGES_ONGROUND[Math.round(Math.random())]);
                this.THROW_SOUND.pause();
                if(sound)this.LANDING_SOUND.play();
                this.landed = true;
                

                }
            }
            this.updateCollisionBox();
        }, 1000/60) 


        this.intervalContact = setInterval( ()=> {
            if (this.isAboveGround() && this.splashed === false){
                this.playAnimation(this.IMAGES_THROW);
            } else if (this.splashed === true){
                this.playAnimation(this.IMAGES_SPLASH);
            } else if (this.landed === true){
                
            }

        },1000/10)

    } 
    
}