class World{
    canvas;
    ctx;
    keyboard;
    character;
    

    camera_x = 0;

    level = level1;
    statusBarHealth; 
    statusBarCoin;
    statusBarBottle;
    throwableObjects = [];
    lastThrow = 0;


    



constructor(canvas, keyboard){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.character = new Character();
    this.statusBarHealth = new StatusBarHealth();
    this.statusBarBottle = new StatusBarBottle();
    this.statusBarCoin = new StatusBarCoin();
    this.throwableObjects.push(new ThrowableObject);
    this.setWorld();
    this.draw();
    this.run();
}


setWorld(){
    this.character.world = this;
}


run(){
    setInterval(()=> {
        this.checkCollisions();
        this.checkThrowables();
        //console.log("welt läuft und checked Kollsionen");
    }, 1000/60)
}

    checkCollisions(){
        this.level.enemies.forEach( (element)=>{
            if(this.character.isColliding(element)){
                
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                
                console.log('Collision with Character: ', element, this.character.energy);
            }
        })
    }

    checkThrowables(){
        let currentTime = new Date().getTime();
        if (this.keyboard.SPACE && (currentTime - this.lastThrow) > 300){
            let bottle;
            if(this.character.otherDirection){
                
                bottle = new ThrowableObject(this.character.x+10, this.character.y+120, -10);
            } else {
                
                bottle = new ThrowableObject(this.character.x+40, this.character.y+120, 10);
            
            }


            
            
            this.throwableObjects.push(bottle);
            this.lastThrow = currentTime;
            this.character.resetLongIdleTime();
        }
}



    draw(){

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);


        this.ctx.translate(this.camera_x,0); //forward

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);


        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);






        this.ctx.translate(-this.camera_x,0); //back

        // ----------  Space for fixed Objects -------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);

        this.ctx.translate(this.camera_x,0); //forward




        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        
       


        this.ctx.translate(-this.camera_x,0); //backward


        //function draw executes again and again
        self = this;
        requestAnimationFrame(function() {
            self.draw()
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o =>  {
            this.addToMap(o);
        })
    }

    addToMap(mo){

        if (mo.otherDirection){
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);
        mo.drawCollisionBox(this.ctx);
        


        




        if (mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
            this.ctx.translate(mo.width,0);
            
            this.ctx.scale(-1, 1);
            mo.x = mo.x *-1;
            if (mo instanceof Character){
                mo.coll_x = (mo.coll_x -30 )*-1;
                
            }
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        if (mo instanceof Character){
            mo.coll_x = mo.coll_x *-1;
        }


            this.ctx.restore();
    }




}