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
    totalCoins;
    maxBottles = 5;


    



constructor(canvas, keyboard){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.character = new Character();
    this.statusBarHealth = new StatusBarHealth();
    this.statusBarBottle = new StatusBarBottle();
    this.statusBarCoin = new StatusBarCoin();
    //this.throwableObjects.push(new ThrowableObject);
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
    }, 1000/30)


    setInterval(()=> {
        this.character.checkInvulnerability();
        
        
        
    }, 1000/60)
}

    checkCollisions(){
        


        this.checkCollisionsEnemies();

        this.checkCollisionsCollectables();

        this.checkCollisionsThrowables();


        


    }

    checkCollisionsThrowables() {
        // Iterate over throwable objects from the end to the beginning
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            let throwable = this.throwableObjects[i]; // Use 'i' instead of 'index'
    
            // Check collision with each enemy
            for (let j = 0; j < this.level.enemies.length; j++) {
                let enemy = this.level.enemies[j]; // Define 'enemy' for clarity
                if (enemy.isColliding(throwable)) {
                    if (throwable.landed === false) {
                        // Set the landed flag to true
                        throwable.splash(); // Call the splash method on collision
                         // Remove the throwable object after a delay of 500ms
                        setTimeout(() => {
                        this.throwableObjects.splice(i, 1); // Remove the throwable after 500ms
                        }, 500);
                    }
    
                    // Remove enemy if it is a Chicken or Chick
                    if (enemy instanceof Chicken || enemy instanceof Chick) {
                        if(throwable.landed === false){
                        enemy.kill();
                        }
                        //this.level.enemies.splice(j, 1); // Remove the enemy from the array
                        //j--; // Adjust index after removal to avoid skipping the next enemy
                    }
    
                   
                    
                    // Break after handling the first collision
                    break;
                }
            }
        }
    }
    
    

    checkCollisionsEnemies() {
        for (let element of this.level.enemies) {

            console.log("Charakter speedY "+this.character.speedY);

            if (this.character.isColliding(element) && this.character.speedY > 0 && !(element instanceof Endboss)) {
                this.character.activateInvulnerability();
                console.log("Character hit enemy from above without taking damage");
                element.kill();
                return;
            } else if (this.character.isColliding(element)) {
                if (!this.character.isInvulnerable){
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                console.log('Collision with Character: ', element, this.character.energy);
                }
            }
        }
    }

    checkCollisionsCollectables(){
        for (let i = this.level.collectables.length - 1; i >= 0; i--) {
            let element = this.level.collectables[i];
            if (this.character.isColliding(element)) {
                //console.log("Collision with Character with Collectable: " + element);
                if (element instanceof Coin){

                    this.level.collectables.splice(i, 1);
                    this.addCoin();
                    //console.log("COIN");
                } else if (element instanceof Bottle){
                    
                    if (this.character.bottles < 5){
                    this.level.collectables.splice(i, 1);
                    this.addBottle();
                    }
                    //console.log("BOTTLE");
                }
                
                //console.log(this.level.collectables);
            }
        }
    }

    addCoin(){
        if(!this.totalCoins){
        
        this.totalCoins = this.countCollectable(Coin);  
        }

        this.character.coins++;
        //console.log("coin added. total: "+this.character.coins);
        this.updateStatusBarCoins();
        //console.log(this.statusBarCoin.percentage +"Prozent");

    }

    addBottle(){
        
        
            this.character.bottles++;
            this.updateStatusBarBottle();
        
    
    }

    countCollectable(type){
        let count = 1;
        for (let element of this.level.collectables){
            if (element instanceof type){
                count++;
            }
        }
        //console.log("total " +count +type);
        return count;
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


            if (this.character.bottles>0){
                this.throwBottle(bottle);
                this.lastThrow = currentTime;
            }
            this.character.resetLongIdleTime();
        }
    }

    throwBottle(bottle){
        this.throwableObjects.push(bottle);
        this.character.bottles--;
        this.updateStatusBarBottle();
        
    }

    updateStatusBarBottle(){
        this.statusBarBottle.setPercentage(this.character.bottles / this.maxBottles * 100);
    }

    updateStatusBarCoins(){
        this.statusBarCoin.setPercentage(Math.round(this.character.coins / this.totalCoins * 100));
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