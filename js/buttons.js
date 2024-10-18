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

function startButtonClick(){
    console.log("Start Klick");
    
    hideStartScreenUI();
    
    world.start();

}

function showTopRowUI(){
    soundButton.classList.remove('noDisplay');
    musicButton.classList.remove('noDisplay');
    fullscreenButton.classList.remove('noDisplay');
}

function hideStartScreenUI(){
    startButton.classList.add('noDisplay');
    infoButton.classList.add('noDisplay');
}

function showStartScreenUI(){
    console.log("Zeige StartScreen um :" +(new Date()))
    startButton.classList.remove('noDisplay');
    infoButton.classList.remove('noDisplay');
}

function restartButtonClick(){
    console.log("anfang Restart");
    world.musicHandler.stopPreviousMusic();
    console.log("musik gestoppt");
    world = null;
    level1 = null;
    console.log("welt genullt");
    init();
    console.log("init aufgerufen");
    world.restart=true;
    console.log("Welt mitgeteilt, dass sie restartet ist");
    hideAfterGameUI();

    hideStartScreenUI();
    console.log("UIs geregelt")
    //setTimeout(world.start(), 200)
    world.start(); // hier ist der Fehler beim dritten restart!?!?
    console.log("ende Restart");
}

function exitButtonClick(){
    world = null;
    init();
    hideAfterGameUI();
    //showStartScreenUI();
}

function soundButtonClick(){
    console.log("soundButtonClick");
    if(sound){
        sound=false;
        soundButton.src="Icons/no-sound.png";
    } else {
        sound = true;
        soundButton.src="Icons/sound.png";
    }

}

function musicButtonClick(){
    console.log("musicButtonCick");
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
}


function showBottomRow(){
    console.log("bottomRow is da");
    throwButton.classList.remove('noDisplay');
    upButton.classList.remove('noDisplay');
    leftButton.classList.remove('noDisplay');
    rightButton.classList.remove('noDisplay');
}

function hideBottomRow(){
    console.log("bottomRow is weg");
    throwButton.classList.add('noDisplay');
    upButton.classList.add('noDisplay');
    leftButton.classList.add('noDisplay');
    rightButton.classList.add('noDisplay');
}




function showAfterGameUI(){
    //console.log("");
    exitButton.classList.remove('noDisplay');
    restartButton.classList.remove('noDisplay');
}

function hideAfterGameUI(){
    //console.log("Verstecke RESTART und EXIT");
    exitButton.classList.add('noDisplay');
    restartButton.classList.add('noDisplay');
}