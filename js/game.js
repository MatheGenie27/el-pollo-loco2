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


