class CollectableObject extends DrawableObject {
    
    intervalAnimate;
    intervalControl;
    
    constructor(){
        super()
    }

    stopCollectable(){
        clearInterval(this.intervalAnimate);
        clearInterval(this.intervalControl);
    }
}