class ObjectHandler{

    world;





    constructor(world){
        this.world = world;
        
    }


    checkCollisions() {
        this.checkCollisionsEnemies();
    
        this.checkCollisionsCollectables();
    
        this.checkCollisionsThrowables();
      }


    checkSoundRange() {
        this.world.level.enemies.forEach((enemy) => {
          if (this.checkDistance(enemy, this.world.character)) {
            enemy.soundRange = true;
          } else {
            enemy.soundRange = false;
          }
        });
      }



      checkDistance(enemy, character) {
        if(enemy){
        let distance = enemy.x - character.x;
        return -150 < distance && distance < 600;
        }
      }




      checkCollisionsThrowables() {
    
        for (let i = this.world.throwableObjects.length - 1; i >= 0; i--) {
          let throwable = this.world.throwableObjects[i]; 
          
          for (let j = 0; j < this.world.level.enemies.length; j++) {
            let enemy = this.world.level.enemies[j]; 
            if (enemy.isColliding(throwable)) {
              if (throwable.landed === false && throwable.splashed === false) {
                let id = throwable.id;
    
                let index = this.searchBottleWithID(id);
    
                throwable.splash();
                setTimeout(() => {
                  this.world.throwableObjects.splice(index, 1); 
                }, 500);
              }
    
              
              if (enemy instanceof Chicken || enemy instanceof Chick) {
                if (throwable.landed === false) {
                  enemy.kill();
                }
               
              } else if (enemy instanceof Endboss && throwable.hasHit === false && throwable.landed === false)  {
                throwable.hasHit = true;
                enemy.hit();
                this.world.statusBarEndboss.setPercentage(enemy.energy);
              }
    
              
              break;
            }
          }
        }
      }
    



      searchBottleWithID(id) {
        let foundIndex = -1; 
    
        this.world.throwableObjects.forEach((object, index) => {
          if (object.id === id) {
            foundIndex = index; 
          }
        });
    
        if (foundIndex === -1) {
          console.err("Flasche nicht gefunden. ID:" + id);
        }
    
        return foundIndex;
      }

      checkCollisionsEnemies() {
        for (let element of this.world.level.enemies) {
          if (
            this.world.character.isColliding(element) &&
            this.world.character.speedY > 0 &&
            !(element instanceof Endboss)
          ) {
            this.world.character.activateInvulnerability();
    
            element.kill();
            return;
          } else if (this.world.character.isColliding(element)) {
            if (element instanceof Endboss) {
              element.attacking();
            }
    
            if (!this.world.character.isInvulnerable) {
              this.world.character.hit();
              this.statusBarHealth.setPercentage(this.world.character.energy);
            }
          }
        }
      }
    
      checkCollisionsCollectables() {
        for (let i = this.world.level.collectables.length - 1; i >= 0; i--) {
          let element = this.world.level.collectables[i];
          if (this.world.character.isColliding(element)) {
            if (element instanceof Coin) {
              this.world.level.collectables.splice(i, 1);
              this.addCoin();
            } else if (element instanceof Bottle) {
              if (this.world.character.bottles < 5) {
                this.world.level.collectables.splice(i, 1);
                this.addBottle();
              }
            }
          }
        }
      }
    
      addCoin() {
        if (!this.world.totalCoins) {
          this.world.totalCoins = this.countCollectable(Coin);
        }
        this.world.musicHandler.playCoinSound();
        this.world.character.coins++;
    
        this.updateStatusBarCoins();
        this.checkCoinCompletion();
      }
    
      checkCoinCompletion() {
        if (this.world.character.coins == this.world.totalCoins && !this.world.coinComplete) {
          this.world.coinComplete = true;
          this.world.musicHandler.playCoinsCompleted();
        }
      }
    
      addBottle() {
        this.world.musicHandler.playBottleSound();
        this.world.character.bottles++;
        this.updateStatusBarBottle();
      }
    
      countCollectable(type) {
        let count = 1;
        for (let element of this.world.level.collectables) {
          if (element instanceof type) {
            count++;
          }
        }
    
        return count;
      }
    
      checkThrowables() {
        let currentTime = new Date().getTime();
        if (
          this.world.keyboard.SPACE &&
          currentTime - this.world.lastThrow > 300 &&
          this.world.character.bottles > 0
        ) {
          let bottle;
    
          if (this.world.character.otherDirection) {
            bottle = new ThrowableObject(
              this.world.character.x + 10,
              this.world.character.y + 120,
              -10
            );
          } else {
            bottle = new ThrowableObject(
              this.world.character.x + 40,
              this.world.character.y + 120,
              10
            );
          }
    
          this.throwBottle(bottle);
          this.world.lastThrow = currentTime;
          this.world.character.resetLongIdleTime();
        }
      }
    

      throwBottle(bottle) {
        this.world.throwableObjects.push(bottle);
        this.world.character.bottles--;
        this.updateStatusBarBottle();
      }
    
      updateStatusBarBottle() {
        this.world.statusBarBottle.setPercentage(
          (this.world.character.bottles / this.world.maxBottles) * 100
        );
      }
    
      updateStatusBarCoins() {
        this.world.statusBarCoin.setPercentage(
          Math.round((this.world.character.coins / this.world.totalCoins) * 100)
        );
      }

}