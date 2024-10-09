class Cloud extends MovableObject{

    y = 50;
    width= 500;
    height= 250;
    speed = 0.15;
    


    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/1.png');

        this.x = -100 + Math.random()*3000;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
            this.appearAgain();
            
        },1000/60);


        
    }

    appearAgain(){
        if (this.x < -700){
            this.x = 3000;
        }
    }

}