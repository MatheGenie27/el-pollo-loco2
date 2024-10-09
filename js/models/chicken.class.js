class Chicken extends MovableObject{

    x = 500;
    y = 350;
    width= 50;
    height= 80;
    speed = 0.3;

    coll_height = 67;
    coll_width = 50;;
    coll_x;
    coll_y = 354;

    dead = false;
    

    IMAGES_WALKING=[
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD=[
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]


    constructor(){
        super();
        super.loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random()*1500;
        this.speed = 0.15 + Math.random()*0.25;
        
        
        this.animate();
    }

    kill(){
        this.dead = true;
        this.moveCollisionBoxAway();
    }

    updateCollisionBox(){
        this.coll_x = this.x;
        
    }

    moveCollisionBoxAway(){
        this.coll_x = 5000;
        this.coll_y = 5000;
    }

    animate(){
        setInterval(() => {
            if (!this.dead){
            this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 1000/9);


        setInterval(()=> {
            if (!this.dead){
            this.moveLeft();
            this.updateCollisionBox();
            } else {
                
            }

        }, 1000/60);
       

    }



}