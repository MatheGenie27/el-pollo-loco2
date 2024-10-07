class coin extends collectableObject {


    x = 200;
    y = 250;
    width = 150;
    height = 150;
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
        
        this.animate();

    }

    move(){
        if (!this.starttime) {
            this.starttime = new Date().getTime() + (Math.random()* 500);
        }
        let currentTime = new Date().getTime();
        let passedTime =  currentTime - this.starttime;

        this.y = Math.sin(passedTime * this.frequency) * this.amplitude + this.y_displacement;
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