class Character extends MovableObject{

x=100;
y= 175;
width=100;
height=250;


IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',

];

currentImage = 0;


constructor(){
    super();
    super.loadImage('../img/2_character_pepe/2_walk/W-21.png');
    super.loadImages(this.IMAGES_WALKING);

    this.animate();
}



jump(){

}


animate(){
    setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 1000/10);
}



}