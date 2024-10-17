
console.log("Mobile geladen");





function isMobile() {
    let mobile = window.matchMedia("(max-width: 768px)").matches;
    console.log("ist mobil ?" +mobile)
    return mobile;
}



  function isLandscape() {
    let landscape = window.matchMedia("(orientation: landscape)").matches;
    console.log("ist landscape ? " +landscape);
    return landscape;
}


window.addEventListener("orientationchange", () => {
    
  
    if (window.matchMedia("(orientation: portrait)").matches) {
      init();
    } else if (window.matchMedia("(orientation: landscape)").matches) {
      init();
    }
  });