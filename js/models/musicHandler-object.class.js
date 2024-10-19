class MusicHandler{

    COLLECT_BOTTLE_SOUND = new Audio('audio/sfx/glass_clink_sound.mp3');
    COLLECT_COIN_SOUND = new Audio('audio/sfx/brigt_metallic_sound.mp3');
    
    GAME_MUSIC = new Audio('audio/music/spanish_guitar_music_1.mp3');
    ENDBOSS_MUSIC = new Audio('audio/music/spanish_guitar_music_2.mp3');

    VICTORY_MUSIC = new Audio('audio/music/joyful_spanish_victo2.mp3');
    GAMEOVER_MUSIC = new Audio('audio/music/spanish_funeral_musi.mp3');
    
    COMPLETE_COIN = new Audio('audio/voice/dinero.mp3');

    START_VOICE = new Audio('audio/voice/startVoice.mp3');
    LOST_VOICE = new Audio('audio/voice/lostVoice.mp3');
    VICTORY_VOICE = new Audio('audio/voice/victoryVoice.mp3');



    isGameMusicPlay = false;
    isEndbossMusicPlay = false;
    isVictoryMusicPlay = false;
    isDefeatMusicPlay = false;

    isMusic = false;
    isSound = false;

    hadEndVoice = false;

    musicVaribaleHasChangend=false;

    checkInterval;

    constructor(){
        this.setDefaultMusicVolume();
        this.checkIfMusic();
    }

    stopMusicHandler(){
        clearInterval(this.checkInterval);
    }

    setDefaultMusicVolume(){
        this.GAMEOVER_MUSIC.volume = 0.35;
        this.GAME_MUSIC.volume = 0.35;
        this.VICTORY_MUSIC.volume = 0.35;
        this.ENDBOSS_MUSIC.volume = 0.35;
    }

    muteMusic(){
        this.GAMEOVER_MUSIC.volume = 0;
        this.GAME_MUSIC.volume = 0;
        this.VICTORY_MUSIC.volume = 0;
        this.ENDBOSS_MUSIC.volume =0;
    }

    checkIfMusic(){
       this.checkInterval = setInterval(()=>{
            if (music === false){
                this.muteMusic();
            } else if (music=== true ){
                this.setDefaultMusicVolume();
                
            }
        },1000/10)
    }

    stopPreviousMusic(){
        console.log("beende sieg oder niederlage Musik");
        this.VICTORY_MUSIC.pause();
        this.VICTORY_MUSIC.currentTime = 0;
        this.GAMEOVER_MUSIC.pause();
        this.GAMEOVER_MUSIC.currentTime = 0;
        this.isVictoryMusicPlay = false;
        this.isDefeatMusicPlay = false;
    }

    stopAllMusic(){
        this.stopGameMusic();
        this.stopPreviousMusic();
        
    }

    stopGameMusic(){
        this.GAME_MUSIC.pause();
        this.GAME_MUSIC.currentTime = 0;
        this.ENDBOSS_MUSIC.pause();
        this.ENDBOSS_MUSIC.currentTime = 0;
        this.isGameMusicPlay = false;
        this.isEndbossMusicPlay = false;
    }

    playGameMusic(){
        
        
        this.GAME_MUSIC.loop = true;
        this.GAME_MUSIC.play();
        this.isGameMusicPlay = true;
        
    }

    playBottleSound(){
        if(sound){
        //this.COLLECT_BOTTLE_SOUND.pause();
        this.COLLECT_BOTTLE_SOUND.play();
        }
    }

    playCoinSound(){
        if(sound){
        this.COLLECT_COIN_SOUND.pause();
        this.COLLECT_COIN_SOUND.play();
        }
    }

    playCoinsCompleted(){
        if(sound){
        this.COMPLETE_COIN.play();
        }
    }

    playEndbossMusic(){
        
        this.GAME_MUSIC.pause();
        this.isGameMusicPlay = false;
        if( !this.isEndbossMusicPlay){
            
            this.ENDBOSS_MUSIC.loop = true;
            this.ENDBOSS_MUSIC.play();
            this.isEndbossMusicPlay = true;
            
        } 
    }

    playVictoryMusic(){
        if(!this.isVictoryMusicPlay){
        this.stopGameMusic();
        this.isVictoryMusicPlay = true;
        this.VICTORY_MUSIC.play();
        }
    }

    playDefeatMusic(){
        if( !this.isDefeatMusicPlay){
            this.stopGameMusic();
            this.isDefeatMusicPlay = true;
            this.GAMEOVER_MUSIC.play();
            }
    }

    playLostVoice(){
        if(!this.hadEndVoice && sound){
            this.hadEndVoice = true;
            this.LOST_VOICE.play();
        }
    }

    playVictoryVoice(){
        if(!this.hadEndVoice && sound){
            this.hadEndVoice = true;
            this.VICTORY_VOICE.play();
        }
    }

    playStartVoice(){
        if(!this.hadStartVoice && sound){
            this.hadStartVoice = true;
            this.START_VOICE.play();
        }
    }
}

