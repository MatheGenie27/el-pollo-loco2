






function isMobile() {
    let mobile = window.matchMedia("(max-width: 768px)").matches;
    return mobile;
}



  function isLandscape() {
    let landscape = window.matchMedia("(orientation: landscape)").matches;
    return landscape;
}


window.addEventListener("orientationchange", () => {
    
    
    if(world)world.stopEnterMenu();
    world=null;
    init();

  });