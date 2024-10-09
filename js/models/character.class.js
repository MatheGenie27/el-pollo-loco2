class Character extends MovableObject{

x=100;
y= 175;
width=100;
height=250;

coll_x;
coll_y;
coll_width;
coll_height;

coins =0;
bottles = 5;


speed = 2;
ground_y = 180;
speedY = 0;
accelerationY = 1;



IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
]

IMAGES_LONGIDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
]



IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',

];

IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'

];

IMAGES_DEAD = [

'img/2_character_pepe/5_dead/D-51.png',
'img/2_character_pepe/5_dead/D-52.png',
'img/2_character_pepe/5_dead/D-53.png',
'img/2_character_pepe/5_dead/D-54.png',
'img/2_character_pepe/5_dead/D-55.png',
'img/2_character_pepe/5_dead/D-56.png',
'img/2_character_pepe/5_dead/D-57.png'
]

IMAGES_HURT = [
'img/2_character_pepe/4_hurt/H-41.png',
'img/2_character_pepe/4_hurt/H-42.png',
'img/2_character_pepe/4_hurt/H-43.png'

];

WALKING_SOUND = new Audio('audio/sfx/footsteps_of_someone0.mp3');

isInvulnerable = false;
invulnerableStartTime = 0;

dead = false;
run = false;
idle = false;
longIdle =false;
hurt = false;
jumping = false;
lastInput;
longIdleTime = 0;




constructor(){
    
    super();
    
    super.loadImage('../img/2_character_pepe/2_walk/W-21.png');
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_IDLE);
    super.loadImages(this.IMAGES_LONGIDLE);
    super.loadImages(this.IMAGES_DEAD);
    super.loadImages(this.IMAGES_HURT);
    super.loadImages(this.IMAGES_JUMPING);
    this.y = 480 - this.height - this.ground_y;

    this.animate();
    this.applyGravity();
}

activateInvulnerability() {
    this.isInvulnerable = true;
    this.invulnerableStartTime = Date.now(); // Setzt den Startzeitpunkt
}

// Methode zur Überprüfung, ob die Unverwundbarkeit noch aktiv ist
checkInvulnerability() {
    if (this.isInvulnerable && Date.now() - this.invulnerableStartTime > 300) {
        this.isInvulnerable = false; // Deaktiviert die Unverwundbarkeit nach 300ms
    }
    //console.log(this.isInvulnerable);

}

resetFlag(){
    this.dead = false;
    this.run = false;
    this.idle = false;
    this.longIdle =false;
    this.hurt = false;
    this.jumping = false; 
}

resetLongIdleTime(){
    this.longIdleTime = new Date().getTime();
}

updateCollisionBox(){
    this.coll_x = this.x +15;
    this.coll_y = this.y +100;
    this.coll_width= this.width -40;
    this.coll_height= this.height -110;
}




animate(){

    //movement
    setInterval(()=> {

        this.WALKING_SOUND.pause();

        if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x){
            this.moveRight();   
            this.otherDirection=false;
            this.WALKING_SOUND.play();
        }

        if(this.world.keyboard.LEFT && this.x >= -200){
            
            this.moveLeft();
            this.otherDirection=true;
            this.WALKING_SOUND.play();
           
        }


        if(this.world.keyboard.UP && !this.isAboveGround()){
            this.jump();
            this.jumping=true;
        }


        this.world.camera_x = - this.x +100;

        this.updateCollisionBox();

    },1000/60)




    //animation
    setInterval(() => {

        switch (true) {
            case this.dead:
                this.playAnimation(this.IMAGES_DEAD);
                this.resetLongIdleTime();
                break;
            case this.hurt:
                this.playAnimation(this.IMAGES_HURT);
                this.resetLongIdleTime();
                break;
            case this.jumping:
                this.playAnimation(this.IMAGES_JUMPING);
                this.resetLongIdleTime();
                break;
            case this.falling:
                this.playAnimation(this.IMAGES_JUMPING);
                this.resetLongIdleTime();
                break;    
            case this.run:
                this.playAnimation(this.IMAGES_WALKING);
                this.resetLongIdleTime();
                break;
            default:
                    // Standardanimation für Inaktivität (Idle)
                    if (!this.longIdleTime){
                        this.resetLongIdleTime();
                    }
                    let currentTime = new Date().getTime();
                    
                    if ((currentTime - this.longIdleTime) > 3000){
                        this.playAnimation(this.IMAGES_LONGIDLE);
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);

                    }
                    
                    
                    
                    
            
                    break;
        }

       






    }, 1000/10);

    //updateFlag
    setInterval( () => {

        this.resetFlag();

        if(this.isDead()){
            this.dead = true;
        }

        if( (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) && !this.isAboveGround() ){
            this.run = true;
        }

        if (this.isAboveGround()){
            this.falling = true;
        } else {
            this.falling = false;
        }

        if (this.isHurt()){
            this.hurt=true;
        }

        if (this.isDead()){
            this.dead = true;
        }

        //idle

        //longIdle


    }, 1000/10);

}    







}


