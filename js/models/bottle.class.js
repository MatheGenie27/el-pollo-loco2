class Bottle extends CollectableObject {
    
    
    x = 200;
    y = 375;
    width = 50;
    height = 60;


    coll_x = 200;
    coll_y= 375;
    coll_width=50;
    coll_height = 60;


    IMAGES = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ]


    intervalAnimate;
    intervalControl;



    constructor(){
        super();
        super.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        super.loadImages(this.IMAGES);

        this.x = 200 + Math.random()*1800;
        
        this.animate();

        this.initCollisionBox();
    }

    stopCollectable(){
        clearInterval(this.intervalAnimate);
        clearInterval(this.intervalControl);
    }

    initCollisionBox(){
        this.coll_x = this.x +20;
        this.coll_width = this.width -40;
        this.coll_y = this.y +8;
        this.coll_height = this.height -16;
    }


    animate(){
        this.intervalAnimate = setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000/9);


        this.intervalControl = setInterval(()=> {
            
        }, 1000/60);
       

    }

}