class World{
    canvas;
    ctx;
    keyboard;

    character = new Character();

    camera_x = 0;

    level = level1;

    



constructor(canvas, keyboard){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
}


setWorld(){
    this.character.world = this;
}


    draw(){

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);


        this.ctx.translate(this.camera_x,0); //forward

        this.addObjectsToMap(this.level.backgroundObjects);


        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.clouds);


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

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

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