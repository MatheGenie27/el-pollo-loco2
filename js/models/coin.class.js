class Coin extends CollectableObject {


    x = 200;
    y = 250;
    width = 150;
    height = 150;

    coll_x=200;
    coll_y=250;
    coll_width=150;
    coll_height=150;

    frequency = 0.0035;
    amplitude = 50;
    y_displacement = 200;
    starttime = null;

    IMAGES = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png",
    ]






    constructor(){
        super();
        super.loadImage('./img/8_coin/coin_1.png');
        super.loadImages(this.IMAGES);

        this.x = 200 + Math.random()*1500;

        this.initCollisionBox();
        
        
        this.animate();

    }

    initCollisionBox(){
        this.coll_x = this.x+50;
        this.coll_width = this.width -100;
        this.coll_height = this.height -100;
    }

    move(){
        if (!this.starttime) {
            this.starttime = new Date().getTime() + (Math.random()* 500);
        }
        let currentTime = new Date().getTime();
        let passedTime =  currentTime - this.starttime;

        this.y = Math.sin(passedTime * this.frequency) * this.amplitude + this.y_displacement;
        this.updateCollisionBox();
    }

    updateCollisionBox(){
        
        this.coll_y = this.y +50;
    }


    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000/4);


        setInterval(()=> {
            this.move()
        }, 1000/60);
       

    }

}