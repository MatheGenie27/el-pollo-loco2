class Cloud extends MovableObject{

    y = 50;
    width= 500;
    height= 250;
    speed = 0.15;
    


    constructor(){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = -719 + Math.random()*7*719;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
            this.appearAgain();
            
        },1000/60);


        
    }

    appearAgain(){
        if (this.x < -800){
            this.x = 7*719;
        }
    }

}