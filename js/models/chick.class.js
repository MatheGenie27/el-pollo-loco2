class Chick extends MovableObject {
    x = 500;
    y = 388;
    width= 35;
    height= 40;
    speed = 1.4;
    speedY = 0;
    accelerationY = 1;
    ground_y = 388;

    coll_height = 30;
    coll_width = 30;
    coll_x = 50;
    coll_y = 30;

    dead = false;
    lastJump = 0;
    nextJump = 5000;
    currentTime;

    soundRange = false;

    IMAGES_WALKING=[
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DEAD=[
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    DEAD_SOUND = new Audio('audio/sfx/squashing_sound.mp3');
    JUMP_SOUND = new Audio('audio/sfx/chickling_sound.mp3');


    constructor(){
        super();
        super.loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);

        this.x = 1500 + Math.random()*1500;
        this.speed = 1.7 + Math.random()*1.5;
        this.animate();
        this.applyGravity();
        this.currentTime = Date.now();
        this.lastJump = Date.now();
    }

    kill(){
        this.dead = true;
        this.DEAD_SOUND.play();
    }

    updateCollisionBox(){
        this.coll_x = this.x +2;
        this.coll_y = this.y +5;
    }

    moveCollisionBoxAway(){
        this.coll_x = 5000;
        this.coll_y = 5000;
    }


    animate(){
        setInterval(() => {
            if (!this.dead){
            this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 1000/11);


        setInterval(()=> {
            this.currentTime = Date.now();

            if (!this.dead){
            this.moveLeft();
            
            if((this.currentTime - this.lastJump) > this.nextJump){
                this.jump();
                if(this.soundRange){
                this.JUMP_SOUND.play();
                }
                //console.log("CHICK SPRUNG");
                this.lastJump = this.currentTime;
                this.nextJump = 3000 + Math.random()*3000;

            }
              

            this.updateCollisionBox();
            } else {
                this.moveCollisionBoxAway();
            }

        }, 1000/60);
       

    }

}