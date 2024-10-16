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
    startButton.classList.remove('noDisplay');
    infoButton.classList.remove('noDisplay');
}

function restartButtonClick(){
    init();
    hideAfterGameUI();
    world.start();
}

function exitButtonClick(){
    init();
    hideAfterGameUI();
    showStartScreenUI();
}

function soundButtonClick(){
    console.log("soundButtonClick");

}

function musicButtonClick(){
    console.log("musicButtonCick");
    if(music){
        music=false;
    } else {
        music = true;
    }
}

function fullscreenButtonClick(){
    ToggleFullscreen(canvas);
    
}

function infoButtonClick(){

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
    exitButton.classList.remove('noDisplay');
    restartButton.classList.remove('noDisplay');
}

function hideAfterGameUI(){
    //console.log("Verstecke RESTART und EXIT");
    exitButton.classList.add('noDisplay');
    restartButton.classList.add('noDisplay');
}