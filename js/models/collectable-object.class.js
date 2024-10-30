/**
 * describes collectables in general
 */
class CollectableObject extends DrawableObject {
    
    intervalAnimate;
    intervalControl;
    
    constructor(){
        super()
    }

    /**
     * stops collectables
     */
    stopCollectable(){
        clearInterval(this.intervalAnimate);
        clearInterval(this.intervalControl);
    }
}