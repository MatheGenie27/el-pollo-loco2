class GameflowHandler {
  inEndGame;
  afterGame;
  gameOver;
  won;
  notStarted;
  hasWon;
  hasLost;

  startScreen;
  menuScreen;
  inMenu;
  isRestart;

  musicHandler;

  //GamePhasen:
  startScreen;
  startMenu;
  inGame;
  inEndGame;
  afterGameMenu;
  LostScreen;
  WonScreen;

  gamePhase = null;

  enterMenuTimeout = null;
  hasLostTimeout;
  afterGameTimeout;

  intervalRun;
  intervalDraw;

  startMenuStartTime;


  constructor(musicHandler){
    this.startMenuStartTime = Date.now();
    this.gamePhase = 'startScreen';
    this.musicHandler = musicHandler;
  }

  getGamePhase(){
    //console.log(this.gamePhase);
    return this.gamePhase;
  }

  setGameFlowAsRestarted(){
    this.isRestart = true;
  }

  startMenuProcess(){
    if(!this.isRestart){  
    this.enterMenuTimeout = setTimeout(()=> {
        this.delayedStartingScreen();
    },1200);
    }else{
      //hier muss er direkt das spiel starten?!?
    } 
  }

  delayedStartingScreen(){
    if(!this.isRestart)showStartScreenUI();
    showTopRowUI();
    this.gamePhase = 'menuScreen';
  }

  enterGame(){
    this.gamePhase = "inGame";
    
    
  }

  enterEndGame(){
    //console.log("ENDGAME");
    this.gamePhase = "inEndGame";
    this.musicHandler.playEndbossMusic();
  }

  enterAfterGameMenu(){
    this.gamePhase = "afterGame";
    this.musicHandler.stopGameMusic();
  }


  




  


}
