
let canvas;
let ctx;

let world;

function init(){
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    world = new World(canvas);


    console.log("My character is", world.character);
}