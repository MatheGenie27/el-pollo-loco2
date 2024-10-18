class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x;
    collectables;


    constructor(enemies, clouds, backgroundObjects, level_end_x, collectables){
        console.log("starte level constructor");
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.collectables = collectables;

    }

}