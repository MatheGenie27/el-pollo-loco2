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
    }, 1000/200)
}

    checkCollisions(){
        this.level.enemies.forEach( (element)=>{
            if(this.character.isColliding(element)){
                
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                
                //console.log('Collision with Character: ', element, this.character.energy);
            }
        })
    }

    checkThrowables(){
        if (this.keyboard.SPACE){
            let bottle = new ThrowableObject(this.character.x+40, this.character.y+120);
            this.throwableObjects.push(bottle);
        }
}



    draw(){

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);


        this.ctx.translate(this.camera_x,0); //forward

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);






        this.ctx.translate(-this.camera_x,0); //back

        // ----------  Space for fixed Objects -------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);

        this.ctx.translate(this.camera_x,0); //forward




        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

       


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
        


        




        if (mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
            this.ctx.translate(mo.width,0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x *-1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
            this.ctx.restore();
    }




}