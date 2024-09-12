class World{
    canvas;
    ctx;

    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
];


constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.draw();
}



    draw(){

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.enemies.forEach(element => {
            this.ctx.drawImage(element.img, element.x, element.y, element.width, element.height);
        })





        //function draw executes again and again
        self = this;
        requestAnimationFrame(function() {
            self.draw()
        });
    }
}