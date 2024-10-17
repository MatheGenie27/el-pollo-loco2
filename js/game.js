let music = true;
let sound = true;


let canvas;
let keyboard = new Keyboard;

let world;

function init(){

    canvas = document.getElementById('myCanvas');
    hint = document.getElementById('hint');
    if(isLandscape()){
        canvas.classList.remove("noDisplay");
        hint.classList.add("noDisplay");
        
    
    
    world = new World(canvas, keyboard);


    //console.log("My character is", world.character);
    } else {    
        canvas.classList.add("noDisplay");
        hint.classList.remove("noDisplay");
        
    }
}

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            keyboard.UP = true;
            break;
        case 'ArrowDown':
            keyboard.DOWN = true;
            break;
        case 'ArrowLeft':
            keyboard.LEFT = true;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = true;
            break;
        case ' ':
            keyboard.SPACE = true;  // Leertaste wird durch ' ' dargestellt
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            keyboard.UP = false;
            break;
        case 'ArrowDown':
            keyboard.DOWN = false;
            break;
        case 'ArrowLeft':
            keyboard.LEFT = false;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = false;
            break;
        case ' ':
            keyboard.SPACE = false;
            break;
    }
});

