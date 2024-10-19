class MovableObject extends DrawableObject{
   
    speed;
   
    
    speedY;
    accelerationY;
    ground_y;
    energy = 100;
    lastHit = 0;

    coll_x;
    coll_y;
    coll_width;
    coll_height;

    

    constructor(){
        super();
    }




    hit(){

        if (this instanceof Character){
            
            if(!this.isHurt()){
                
                this.loseEnergy();
            }

        } else {

            this.loseEnergy();
        }
    }

    loseEnergy(){
        this.energy -= 10;
        if (this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead(){
        return this.energy == 0;
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        
        return timepassed < 1.5;
        
    }



    isColliding(mo) {
        // Check if this object is colliding with mo (the other object)
       // console.log("isColliding Aufruf in MovableObejct)
        return this.coll_x < mo.coll_x + mo.coll_width &&       // this object's left is to the left of mo's right
               this.coll_x + this.coll_width > mo.coll_x && // this object's right is to the right of mo's left
               this.coll_y < mo.coll_y + mo.coll_height &&       // this object's top is above mo's bottom
               this.coll_y + this.coll_height > mo.coll_y;   // this object's bottom is below mo's top
    }

    
    
    
    


    applyGravity(){
        setInterval( () => {
            if(this.isAboveGround() || this.speedY < 0){
                this.y += this.speedY;
                this.speedY += this.accelerationY;
            } else {
                this.speedY = 0;
            }

        },1000/60)

    }

    isAboveGround(){
        
        return this.y < this.ground_y;
        
    }




    moveRight(){
        this.x += this.speed;
       
       
        
    }

    moveLeft(){
        
            this.x -= this.speed;
            
            
        
    }

    jump(){

        if(this instanceof Character){
            this.speedY = -20;
            
        } else {
        this.speedY = -10;
        } 
        
    }

    
    



}