class MovableObject extends DrawableObject{
   
    speed;
   
    
    speedY;
    accelerationY;
    ground_y;
    energy = 100;
    lastHit = 0;

    

    constructor(){
        super();
    }




    hit(){
        this.energy -= 5;
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
        return timepassed < 1;
    }



    isColliding(mo){
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x && 
                this.y < mo.y + mo.height;
    }


    applyGravity(){
        setInterval( () => {
            if(this.isAboveGround() || this.speedY < 0){
                this.y += this.speedY;
                this.speedY += this.accelerationY;
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
        this.speedY = -20; 
    }

    



}