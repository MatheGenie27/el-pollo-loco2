class Character extends MovableObject{

x=100;
y= 175;
width=100;
height=250;
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
        }


        this.world.camera_x = - this.x +100;

    },1000/60)




    //animation
    setInterval(() => {

       if (this.isDead()){
             this.playAnimation (this.IMAGES_DEAD);
               
        } else
        if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT);
        }else

        if (this.isAboveGround()){
            this.playAnimation(this.IMAGES_JUMPING); 
        } else 
               
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                     
            this.playAnimation(this.IMAGES_WALKING);
            } 

       






    }, 1000/10);





}



}