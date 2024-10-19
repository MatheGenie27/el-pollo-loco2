class World{
    canvas;
    ctx;
    keyboard;
    character;
    musicHandler;
    

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
    
    afterGame = false;
    gameOver;
    won;
    notStartet = true;
    hasWon = false;
    hastLost = false;
    coinComplete = false;
    

    menuScreen;
    inMenu=false;

    restart = false;

    enterMenuTimeout;
    hasLostTimeout;
    afterGameTimeout;

    intervalRun;
    intervalDraw;


constructor(canvas, keyboard){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    
    this.gameOver = new GameOver();
    this.won = new Won();
    this.startScreen = new StartScreen();
    this.menuScreen = new MenuScreen();
    this.musicHandler = new MusicHandler();
    this.statusBarHealth = new StatusBarHealth;
    this.statusBarBottle = new StatusBarBottle;
    this.statusBarCoin = new StatusBarCoin;
    this.statusBarEndboss = new StatusBarEndboss;
    
   
    this.draw();
    this.startEnterMenu();

    

}

stopGame(){
    this.musicHandler.stopAllMusic();
    clearInterval(this.intervalRun);
    clearInterval(this.hasLostTimeout);
    clearInterval(this.afterGameTimeout);
    clearInterval(this.intervalDraw);
    
    this.musicHandler.stopMusicHandler();
    this.character.stopCharacter();

    this.throwableObjects.forEach((throwable) => {
       throwable.stopThrowables(); 
    })

    this.level.enemies.forEach((enemy) => {
        enemy.stopEnemy();
    })

    this.level.enemies = [];

    this.level.collectables.forEach((collectable)=>{
        collectable.stopCollectable();
    })
    Coin.clearStartPositionArray();

    this.level.collectables = [];

}

stopEnterMenu(){
    clearInterval(this.enterMenuTimeout);
}

stopIntervalRun(){
    clearInterval(this.intervalRun);
}


async start(){


    
    let loading = document.getElementById('loadingImage');
    loading.classList.remove('noDisplay'); 
    
    this.character = new Character();
    this.setWorld();
    await initLevel(); // hier hängts beim mehrmaligen NEUSTART
    
    this.level = level1;
    
    
    this.run();
    
    setTimeout ( ()=>{
        
        this.musicHandler.playGameMusic()
        this.notStartet = false;
        loading.classList.add('noDisplay');
        this.musicHandler.playStartVoice();
        if(isMobile()){
            showBottomRow();
        } else {
            hideBottomRow();
        }
    },200)
    
    
    
}

startEnterMenu(){
    
    

    this.enterMenuTimeout = setTimeout( () => {
        this.inMenu = true;

        
        if(!this.restart){
        showStartScreenUI();
        }

        showTopRowUI();
        
    },1500);


}




setWorld(){
    this.character.world = this;
}


run(){

    this.intervalRun = setInterval(()=> {
        
        this.checkCollisions();
        this.checkThrowables();
        this.checkIfWon();
        this.character.checkInvulnerability();
        this.checkEndgame();
        this.checkSoundRange();
        
        
        
    }, 1000/60)
    
}

checkSoundRange(){
    this.level.enemies.forEach( (enemy) => {
        if (this.checkDistance(enemy, this.character)) {
            enemy.soundRange = true;
        } else {
            enemy.soundRange = false;
        }
    });
}

checkDistance(enemy, character){
    let distance = enemy.x - character.x
    return ((-150 < distance) && (distance < 600) );
}

checkEndgame(){
    
   let endboss = this.level.enemies.find(element => element instanceof Endboss);
    
    if(this.checkDistance(endboss, this.character) && !endboss.dead && !this.character.dead){
        
        this.inEndgame = true;
        this.musicHandler.playEndbossMusic();
        
    } else if(this.checkDistance(endboss, this.character) && endboss.dead){
        this.musicHandler.stopGameMusic();
    }
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

            

            if (this.character.isColliding(element) && this.character.speedY > 0 && !(element instanceof Endboss)) {
                this.character.activateInvulnerability();
                
                element.kill();
                return;
            } else if (this.character.isColliding(element)) {
                if (!this.character.isInvulnerable){
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                
                }
            }
        }
    }

    checkCollisionsCollectables(){
        for (let i = this.level.collectables.length - 1; i >= 0; i--) {
            let element = this.level.collectables[i];
            if (this.character.isColliding(element)) {
                
                if (element instanceof Coin){

                    this.level.collectables.splice(i, 1);
                    this.addCoin();
                    
                } else if (element instanceof Bottle){
                    
                    if (this.character.bottles < 5){
                    this.level.collectables.splice(i, 1);
                    this.addBottle();
                    }
                    
                }
                
               
            }
        }
    }

    addCoin(){
        if(!this.totalCoins){
        
        this.totalCoins = this.countCollectable(Coin);  
        }
        this.musicHandler.playCoinSound();
        this.character.coins++;
        
        this.updateStatusBarCoins();
        this.checkCoinCompletion();
        
       

    }

    checkCoinCompletion(){
        if(this.character.coins == this.totalCoins && !this.coinComplete){
            this.coinComplete = true;
            this.musicHandler.playCoinsCompleted();
        }
    }

    addBottle(){
        
            this.musicHandler.playBottleSound();
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
        
        return count;
    }

    checkThrowables(){
        let currentTime = new Date().getTime();
        if (this.keyboard.SPACE && (currentTime - this.lastThrow) > 300 && this.character.bottles>0){
            let bottle;
            

           

                if(this.character.otherDirection){
                
                    bottle = new ThrowableObject(this.character.x+10, this.character.y+120, -10);
              } else {
                
                   bottle = new ThrowableObject(this.character.x+40, this.character.y+120, 10);
            
              }


                
                
                this.throwBottle(bottle);
                this.lastThrow = currentTime;
                this.character.resetLongIdleTime();
            
            
        }
    }

    checkIfWon(){
       
        this.level.enemies.forEach((element) => {
            if (element instanceof Endboss ){
                if (element.dead === true){
                    this.character.stopControl();
                    this.character.won = true;
                    this.hasWon = true;

                    setTimeout(() => {
                        
                        
                        this.musicHandler.playVictoryMusic();
                        this.musicHandler.playVictoryVoice();
                        
                        this.enterAfterGameMenu();
                        

                    },1000)
                }
            }
        })

        if(this.character.dead){
            this.musicHandler.stopGameMusic();
            this.musicHandler.playLostVoice();
            

            
            
            this.hasLostTimeout = setTimeout( () => {
                
            this.musicHandler.playDefeatMusic();
            
            this.hastLost = true;
            this.enterAfterGameMenu()
            }, 1000)
    }
    }

    

    enterAfterGameMenu(){
        if(!this.afterGame){

            this.stopIntervalRun();

            this.afterGame=true;
            this.afterGameTimeout = setTimeout(()=>{
                showAfterGameUI();
            },2000)
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
            if(!this.inMenu){
            this.addToMap(this.startScreen);
            } else {
                this.addToMap(this.menuScreen);
            }
            
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
        
        if(this.inEndgame){
        this.addToMap(this.statusBarEndboss);
        }

        if(this.character.playedDeadAnimation){
                   
                this.addToMap(this.gameOver);

            } else if (this.hasWon){                  // hier muss noch die Bedigung dafür rein, dass ein gameOver erkannt wird
                this.addToMap(this.won);
            }

        


        this.ctx.translate(this.camera_x,0); //forward


        

        
        
        


        this.ctx.translate(-this.camera_x,0); //backward
        }

        //function draw executes again and again
        self = this;
        this.intervalDraw = requestAnimationFrame(function() {
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
        //mo.drawCollisionBox(this.ctx);
        


        




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