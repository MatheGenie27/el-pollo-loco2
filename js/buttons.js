let startButton = document.getElementById("startButton");
let infoButton = document.getElementById("infoButton");
let restartButton = document.getElementById("restartButton");
let exitButton = document.getElementById("exitButton");
let soundButton = document.getElementById("soundButton");
let musicButton = document.getElementById("musicButton");
let fullscreenButton = document.getElementById("fullscreenButton");

function startButtonClick(){
    console.log("Start Klick");
    
    hideStartScreenUI();
    
    world.start();

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

}

function musicButtonClick(){
    console.log("musicButtonCLick");
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




function showAfterGameUI(){
    exitButton.classList.remove('noDisplay');
    restartButton.classList.remove('noDisplay');
}

function hideAfterGameUI(){
    //console.log("Verstecke RESTART und EXIT");
    exitButton.classList.add('noDisplay');
    restartButton.classList.add('noDisplay');
}