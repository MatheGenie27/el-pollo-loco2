let startButton = document.getElementById("startButton");
let infoButton = document.getElementById("infoButton");
let restartButton = document.getElementById("restartButton");
let exitButton = document.getElementById("exitButton");
let soundButton = document.getElementById("soundButton");
let musicButton = document.getElementById("musicButton");
let fullscreenButton = document.getElementById("fullscreenButton");
let throwButton = document.getElementById("throwButton");
let upButton = document.getElementById("upButton");
let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let pepeStart = document.getElementById("pepeStart");
let controlExplanation = document.getElementById("controlExplanation");

function startButtonClick(){
    
    
    hideStartScreenUI();
    
    world.start();

}

function showExplanation(){
    controlExplanation.classList.remove('noDisplay');
}

function hideShowExplanation(){
    controlExplanation.classList.add('noDisplay');
}

function hideUI(){
    hideTopRowUI();
    hideStartScreenUI();
    hideAfterGameUI();
    hideBottomRow();
}

function showTopRowUI(){
    soundButton.classList.remove('noDisplay');
    musicButton.classList.remove('noDisplay');
    if(!isMobile)fullscreenButton.classList.remove('noDisplay');
}

function hideTopRowUI(){
    soundButton.classList.add('noDisplay');
    musicButton.classList.add('noDisplay');
    fullscreenButton.classList.add('noDisplay');
}

function hideStartScreenUI(){
    startButton.classList.add('noDisplay');
    pepeStart.classList.add('noDisplay');
    infoButton.classList.add('noDisplay');
}

function showStartScreenUI(){
    
    startButton.classList.remove('noDisplay');
    pepeStart.classList.remove('noDisplay');
    infoButton.classList.remove('noDisplay');
}

function restartButtonClick(){
    
    //world.musicHandler.stopAllMusic();
    
    world.stopGame();
    
    level1 = null;
    world = null;
    init();
    
    world.restart=true;
    
    hideAfterGameUI();

    hideStartScreenUI();
    
    
    world.start(); 
    
}

function exitButtonClick(){
    //world.musicHandler.stopAllMusic();
    world.stopGame();
    world = null;
    init();
    hideAfterGameUI();
    //showStartScreenUI();
}

function soundButtonClick(){
    
    if(sound){
        sound=false;
        soundButton.src="Icons/no-sound.png";
    } else {
        sound = true;
        soundButton.src="Icons/sound.png";
    }

}

function musicButtonClick(){
    
    if(music){
        music=false;
        musicButton.src="Icons/no-music.png";
    } else {
        music = true;
        musicButton.src="Icons/music.png";
    }
}

function fullscreenButtonClick(){
    ToggleFullscreen(canvas);
    
}

function infoButtonClick(){
    console.log("infoButtonClick");
    hideStartScreenUI();
    showExplanation();
}


function showBottomRow(){
    
    throwButton.classList.remove('noDisplay');
    upButton.classList.remove('noDisplay');
    leftButton.classList.remove('noDisplay');
    rightButton.classList.remove('noDisplay');
}

function hideBottomRow(){
    
    throwButton.classList.add('noDisplay');
    upButton.classList.add('noDisplay');
    leftButton.classList.add('noDisplay');
    rightButton.classList.add('noDisplay');
}




function showAfterGameUI(){
    
    exitButton.classList.remove('noDisplay');
    restartButton.classList.remove('noDisplay');
}

function hideAfterGameUI(){
    
    exitButton.classList.add('noDisplay');
    restartButton.classList.add('noDisplay');
}