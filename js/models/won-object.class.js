/**
 * represents the Victory Screen
 */
class Won extends DrawableObject {

    x= 0;
    y= 0;
    width = 720;
    height = 480;

    constructor(){
        super();
        
        this.loadImage('img/9_intro_outro_screens/win/won_2.png');
    } 

}