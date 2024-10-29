let level1 = new Level;
cloudNumber = 5;
coinNumber = 10;
bottleNumber = 15;
chickNumber = 20;
chickenNumber = 10;


function initLevelStructure(){
  this.initBackground();
  this.initClouds();
  this.initBottles();
  this.initCoins();
}


function initBackground(){
  
  for(let i=-1; i < 7; i++){

    if(i % 2 == 0){
    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/air.png", i *719));
    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/3_third_layer/2.png", i*719));
    level1.backgroundObjects.push( new BackgroundObject("img/5_background/layers/2_second_layer/2.png", i*719));
    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/2_second_layer/2.png", i*719));
    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/1_first_layer/2.png", i * 719));

    } else {

    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/air.png", i *719));
    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/3_third_layer/1.png", i*719));
    level1.backgroundObjects.push( new BackgroundObject("img/5_background/layers/2_second_layer/1.png", i*719));
    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/2_second_layer/1.png", i*719));
    level1.backgroundObjects.push(new BackgroundObject("img/5_background/layers/1_first_layer/1.png", i * 719));
    }        
  }
}

function initClouds(){
  for (let i = 0; i<= cloudNumber; i++){
    level1.clouds.push(new Cloud);
  }
}

function initBottles(){
  for (let i = 0; i<= bottleNumber; i++){
    level1.collectables.push(new Bottle);
  }
}

function initCoins(){
  for (let i = 0; i<= coinNumber; i++){
    level1.collectables.push(new Coin);
  }
}

async function initEnemies() {
  
  return new Promise((resolve) => {
    

    
    try {
      //initChicks();
      //initChickens();
      initEndboss();
        
               
      
    } catch {
      console.err("level erzeugung gescheitert");
    }

    resolve();
  });


  


}

function initChicks(){
    for (let i = 0; i < chickNumber; i++){
      level1.enemies.push(new Chick);
    }

}

function initChickens(){
  for (let i = 0; i < chickNumber; i++){
    level1.enemies.push(new Chicken);
  }
}

function initEndboss(){
  level1.enemies.push(new Endboss)
}
