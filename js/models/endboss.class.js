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

    energy = 100;
    lastHit = 0;

    dead = false;
    hurt = false;
    alert = false;
    attack = false;

    zone_left = 2100;
    
    
    otherDirection = false;
    soundRange = false;
    deadSoundNotPlayed = true;

    intervalAnimate;
    intervalControl;
    intervalFlag;

    IMAGES_WALKING=[
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
        
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
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


    AUDIO_CHICKENYELL = new Audio('audio/sfx/chicken_yells_becaus.mp3');

    constructor(){
        super();
        super.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);
        super.loadImages(this.IMAGES_HURT);
        super.loadImages(this.IMAGES_ALERT);
        super.loadImages(this.IMAGES_ATTACK);
        this.lastHit = Date.now();
        


        //this.x = 6*719 - Math.random()*500;
        this.speed = 0.05 + Math.random()*0.25;
        
        this.x=500;
        //this.speed =0;

        this.checkIfSound();
        this.animate();
    }

    



    stopEnemy(){
        clearInterval(this.intervalAnimate);
        clearInterval(this.intervalControl);
        clearInterval(this.intervalFlag);
        clearInterval(this.checkSoundInterval);
    }


    checkIfSound(){
        this.checkSoundInterval = setInterval(()=>{
            if(sound === false){
                this.abortLongSounds();
            }
        }, 1000/10)
    }
    
    abortLongSounds(){
        
    }


    hit(){
        let currentTime = Date.now();

        if(currentTime - this.lastHit >= 290){
            //console.log("Endboss Energie abziehen");
            if (this.energy >= 20){
              this.energy = this.energy - 20;
              this.hurting();
            } else if (this.enery <= 0){
                this.energy = 0;
                
            }
            
            this.lastHit = currentTime;
            //console.log("Enboss getroffen");
            
        } else {
            console.log("hit abgewiesen, dazu wenig Zeit vergangen");
        }

    }

    hurting(){
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        },1000)
         
    }


    updateCollisionBox(){
        this.coll_x = this.x +10;
    }

    checkEnergy(){
        if (this.energy == 0){{
            
            this.kill();

        }}
    }

    kill(){
        
        this.moveCollisionBoxAway();
        
        //console.log("Enboss ist tot");
    }

    moveCollisionBoxAway(){
        this.coll_x = 5000;
        this.coll_y = 5000;
    }



    resetFlag(){
        this.dead = false;
        this.run = false;
        this.attack = false;
        this.alert =false;
        this.hurt = false;
        this.jumping = false; 
    }
    

    animate(){

        this.intervalAnimate = setInterval(() => {

            switch(true){

                case this.run:
                
                    this.playAnimation(this.IMAGES_WALKING);
                    break;
                

                case this.dead:
                    this.playAnimation(this.IMAGES_DEAD);
                    if(sound && this.deadSoundNotPlayed){
                        this.AUDIO_CHICKENYELL.play();
                        this.deadSoundNotPlayed = false;
                        }
                    this.loadImage(this.IMAGES_DEAD[2]);
                    break;

                case this.hurt:
                    this.playAnimation(this.IMAGES_HURT);
                    
                    break;

                case this.attack:
                    this.playAnimation(this.IMAGES_ATTACK);
                    break;
                case this.alert:
                    this.playAnimation(this.IMAGES_ALERT);
                    break;

                default:
                    this.playAnimation(this.IMAGES_WALKING);
                    break;
            }
        }, 1000/5);





        this.intervalControl = setInterval(()=>{
           
            
            this.updateCollisionBox();
        


        

        
        
        }, 1000/60)

        this.intervalFlag = setInterval( () => {

            //this.resetFlag();
            this.checkEnergy();
            
    
            if (false){
                this.run = true;
            }
    
            
            if(false){
                this.alert = true;
            }

            if(false){
                this.attack = true;
            }
    
            if (false){
                this.hurt=true;
            }
    
            if (this.isDead()){
                this.dead = true;
            }
    
           
    
    
        }, 1000/10);
        

    }

}