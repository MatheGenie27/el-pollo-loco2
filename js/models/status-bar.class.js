class StatusBar extends DrawableObject{


    IMAGES=[];
    percentage;
    x=20;
    y;
    width=200;
    height=60;
    
    

constructor() {
    super();
    
   
    

}


setPercentage(percentage){
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.calculateImgIndex()]
    console.log(imagePath);
    this.img = this.imageCache[imagePath];
    console.log("Statusbar lädt Bild");
   
}

calculateImgIndex(){
    console.log("Statusbar berechnet BildIndex");
    let ImgNr = Math.ceil(this.percentage/20);
    return ImgNr;
}







}