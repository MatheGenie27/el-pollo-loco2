/**
 * represents the startingScreen 
 */
class StartScreen extends DrawableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;

  constructor() {
    super();

    this.loadImage("img/9_intro_outro_screens/start/startscreen_2.png");
  }
}
