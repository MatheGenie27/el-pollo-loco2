class World{
    canvas;
    ctx;
    keyboard;
    character;
    

    camera_x = 0;

    level;
    statusBarHealth; 
    statusBarCoin;
    statusBarBottle;
    statusBarEndboss;
    throwableObjects = [];
    lastThrow = 0;
    totalCoins;
    maxBottles = 5;


    inEndgame;

    gameOver;
    won;
    notStartet = true;

    COLLECT_BOTTLE_SOUND = new Audio('audio/sfx/glass_clink_sound.mp3');
    COLLECT_COIN_SOUND = new Audio('audio/sfx/brigt_metallic_sound.mp3');



constructor(canvas, keyboard){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.character = new Character();
    this.gameOver = new GameOver();
    this.won = new Won();
    this.startScreen = new StartScreen();
    this.statusBarHealth = new StatusBarHealth();
    this.statusBarBottle = new StatusBarBottle();
    this.statusBarCoin = new StatusBarCoin();
    this.statusBarEndboss = new StatusBarEndboss();
    //this.throwableObjects.push(new ThrowableObject);
    this.setWorld();
    this.draw();
    
    
}


async start(){

    
    await initLevel();
    this.level = level1;
    this.run();
    setTimeout ( ()=>{
        this.notStartet = false;
    },200)
    
    
    
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
                    if (throwable.landed === false && throwable.splashed === false) {
                        
                         
                         
                        let id = throwable.id;
                        console.log("FlaschenID " +id);
                        let index = this.searchBottleWithID(id);
                        
                        
                        throwable.splash();
                        setTimeout(() => {
                        
                        

                        this.throwableObjects.splice(index, 1); // Remove the throwable after 500ms
                        }, 500);
                        
                    }
    
                    // Remove enemy if it is a Chicken or Chick
                    if (enemy instanceof Chicken || enemy instanceof Chick) {
                        if(throwable.landed === false){
                        enemy.kill();
                        }
                        //this.level.enemies.splice(j, 1); // Remove the enemy from the array
                        //j--; // Adjust index after removal to avoid skipping the next enemy
                    } else if (enemy instanceof Endboss && throwable.hasHit === false){
                        
                        throwable.hasHit = true;
                        enemy.hit();
                        this.statusBarEndboss.setPercentage(enemy.energy);

                    }
    
                   
                    
                    // Break after handling the first collision
                    break;
                }
            }
        }
    }

    

    searchBottleWithID(id) {
        let foundIndex = -1; // Initialisiere den Index mit -1 (für "nicht gefunden")
        
        this.throwableObjects.forEach((object, index) => {
            if (object.id === id) {
                foundIndex = index; // Speichere den gefundenen Index
            }
        });
    
        if (foundIndex === -1) {
            console.log("Flasche nicht gefunden. ID:" + id);
        }
    
        return foundIndex;
    }

    
    

    checkCollisionsEnemies() {
        for (let element of this.level.enemies) {

            //console.log("Charakter speedY "+this.character.speedY);

            if (this.character.isColliding(element) && this.character.speedY > 0 && !(element instanceof Endboss)) {
                this.character.activateInvulnerability();
                //console.log("Character hit enemy from above without taking damage");
                element.kill();
                return;
            } else if (this.character.isColliding(element)) {
                if (!this.character.isInvulnerable){
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                //console.log('Collision with Character: ', element, this.character.energy);
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

        this.COLLECT_COIN_SOUND.play();
        this.character.coins++;
        //console.log("coin added. total: "+this.character.coins);
        this.updateStatusBarCoins();
        //console.log(this.statusBarCoin.percentage +"Prozent");

    }

    addBottle(){
        
            this.COLLECT_BOTTLE_SOUND.play();
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
        if (this.keyboard.SPACE && (currentTime - this.lastThrow) > 300 && this.character.bottles>0){
            let bottle;
            console.log(this.throwableObjects);

           

                if(this.character.otherDirection){
                
                    bottle = new ThrowableObject(this.character.x+10, this.character.y+120, -10);
              } else {
                
                   bottle = new ThrowableObject(this.character.x+40, this.character.y+120, 10);
            
              }


            
                //console.log("wirft flasche");
                this.throwBottle(bottle);
                this.lastThrow = currentTime;
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

        if (this.notStartet){
            this.addToMap(this.startScreen);
            
        } else {

        

        this.ctx.translate(this.camera_x,0); //forward

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);


        this.addObjectsToMap(this.throwableObjects);

        
        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);

        

        this.ctx.translate(-this.camera_x,0); //back

        // ----------  Space for fixed Objects -------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);

        if(this.character.playedDeadAnimation){
                   
                this.addToMap(this.gameOver);

            } else if (false){                  // hier muss noch die Bedigung dafür rein, dass ein gameOver erkannt wird
                this.addToMap(this.won);
            }

        


        this.ctx.translate(this.camera_x,0); //forward


        

        
        
        


        this.ctx.translate(-this.camera_x,0); //backward
        }

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
        //mo.drawBorder(this.ctx);
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