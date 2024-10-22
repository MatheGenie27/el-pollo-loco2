class Enemy extends MovableObject{

constructor(){
    super();
}

stopEnemy() {
    clearInterval(this.intervalAnimate);
    clearInterval(this.intervalControl);
  }

}