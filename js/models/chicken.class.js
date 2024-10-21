class Chicken extends MovableObject{

    x = 500;
    y = 350;
    width= 50;
    height= 80;
    speed = 0.3;

    coll_height = 67;
    coll_width = 50;;
    coll_x;
    coll_y = 354;

    dead = false;

    lastCry;
    nextCry = 1000;
    soundRange = false;
    
    intervalAnimate;
    intervalControl;

    IMAGES_WALKING=[
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD=[
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    DEAD_SOUND = new Audio('audio/sfx/squashing_sound.mp3');
    CRY_SOUND = new Audio('audio/sfx/chicken_sound.mp3');


    constructor(){
        super();
        super.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);

        this.x = 10*719- Math.random()*9*719;
        this.speed = 0.15 + Math.random()*0.25;
        
        this.lastCry = Date.now()
        

        this.animate();
    }

    stopEnemy(){
        clearInterval(this.intervalAnimate);
        clearInterval(this.intervalControl);
    }



    kill(){
        this.dead = true;
        if(sound){
        this.DEAD_SOUND.play();
        }
    }

    updateCollisionBox(){
        this.coll_x = this.x;
        
    }

    moveCollisionBoxAway(){
        this.coll_x = 5000;
        this.coll_y = 5000;
    }

    animate(){
        this.intervalAnimate = setInterval(() => {
            
            
            if (!this.dead){
            this.playAnimation(this.IMAGES_WALKING);


            if(((Date.now() - this.lastCry) > this.nextCry) && this.soundRange && sound){
                
                this.CRY_SOUND.play();
                //console.log("ChickenSound");
                
                this.lastCry = Date.now();
                this.nextCry = 2000 + Math.random()*3000;

            }



            } else {
                this.playAnimation(this.IMAGES_DEAD);
                this.y = 360;
            }



            



        }, 1000/9);


        this.intervalControl = setInterval(()=> {
            if (!this.dead){
            this.moveLeft();
            this.updateCollisionBox();
            } else {
                 this.moveCollisionBoxAway();
            }

            if(this.x <= -7190){
                this.x = 6*719;
            }

        }, 1000/60);
       

    }



}