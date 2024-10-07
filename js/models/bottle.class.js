class bottle extends collectableObject {
    
    
    x = 200;
    y = 375;
    width = 50;
    height = 60;


    IMAGES = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ]






    constructor(){
        super();
        super.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        super.loadImages(this.IMAGES);

        this.x = 200 + Math.random()*1500;
        
        this.animate();
    }


    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000/9);


        setInterval(()=> {
            
        }, 1000/60);
       

    }

}