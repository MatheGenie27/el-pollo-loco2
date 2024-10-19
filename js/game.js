let music = true;
let sound = true;


let canvas;
let keyboard = new Keyboard;

let world;

function init(){

    canvas = document.getElementById('myCanvas');
    hint = document.getElementById('hint');
    const orientation = screen.orientation.type;
    
    hideUI();

    if (orientation.startsWith("landscape")) {
        
        canvas.classList.remove("noDisplay");
        hint.classList.add("noDisplay");

        // Starte das Spiel neu
        world = new World(canvas, keyboard);

    } else if (orientation.startsWith("portrait")) {
        
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

