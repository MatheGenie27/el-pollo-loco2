let level1;



async function initLevel() {
    
    return new Promise ((resolve) => {
    level1 = new Level(




    [
    //new Chick(),
    //new Chick(),
    //new Chicken(),
    //new Chicken(),
    //new Chicken(),
     new Endboss()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject("img/5_background/layers/air.png",-719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png" ,-719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png",-719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719 ),

        new BackgroundObject("img/5_background/layers/air.png",0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png" ,0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png",0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0 ),

        new BackgroundObject("img/5_background/layers/air.png",719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png" ,719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png",719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 ),

        new BackgroundObject("img/5_background/layers/air.png",1438),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png" ,1438),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png",1438),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438 ),


        new BackgroundObject("img/5_background/layers/air.png",2157),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png" ,2157),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png",2157),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2157 ),

        new BackgroundObject("img/5_background/layers/air.png",4*719),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png" ,4*719),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png",4*719),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 4*719 ),


        new BackgroundObject("img/5_background/layers/air.png",5*719),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png" ,5*719),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png",5*719),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 5*719 )
    ],

    5*719,

    [
        //collectables
        
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),

        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]
);

resolve();

    })


}