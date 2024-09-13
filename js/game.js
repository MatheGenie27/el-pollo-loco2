
let canvas;


let world;

function init(){
    canvas = document.getElementById('myCanvas');
    
    world = new World(canvas);


    console.log("My character is", world.character);
}