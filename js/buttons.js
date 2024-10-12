function startButtonClick(){
    console.log("Start Klick");
    
    document.getElementById("startbutton").classList.add('noDisplay');
    
    world.start();

}