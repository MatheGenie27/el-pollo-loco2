class MusicHandler{

    COLLECT_BOTTLE_SOUND = new Audio('audio/sfx/glass_clink_sound.mp3');
    COLLECT_COIN_SOUND = new Audio('audio/sfx/brigt_metallic_sound.mp3');
    GAME_MUSIC = new Audio('audio/music/spanish_guitar_music_1.mp3');
    
    ENDBOSS_MUSIC = new Audio('audio/music/spanish_guitar_music_2.mp3');

    VICTORY_MUSIC = new Audio('audio/music/joyful_spanish_victo2.mp3');
    GAMEOVER_MUSIC = new Audio('audio/music/spanish_funeral_musi.mp3');
    
    COMPLETE_COIN = new Audio('audio/voice/dinero.mp3');

    LOST_VOICE = new Audio('audio/voice/lostVoice.mp3');
    VICTORY_VOICE = new Audio('audio/voice/victoryVoice.mp3');



    isGameMusicPlay = false;
    isEndbossMusicPlay = false;
    isVictoryMusicPlay = false;
    isDefeatMusicPlay = false;

    isMusic = false;
    isSound = false;

    hadEndVoice = false;


    constructor(){
        this.GAMEOVER_MUSIC.volume = 0.4;
        this.GAME_MUSIC.volume = 0.4;
        this.VICTORY_MUSIC.volume = 0.4;
    }

    stopPreviousMusic(){
        this.VICTORY_MUSIC.pause();
        this.GAMEOVER_MUSIC.pause();
    }

    stopAllMusic(){
        this.stopGameMusic();
        this.stopPreviousMusic();
    }

    stopGameMusic(){
        this.GAME_MUSIC.pause();
        this.ENDBOSS_MUSIC.pause();
    }

    playGameMusic(){
        if(music){
        
        this.GAME_MUSIC.loop = true;
        this.GAME_MUSIC.play();
        } else {
            this.GAME_MUSIC.pause();
        }
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
        if(music && !this.isEndbossMusicPlay){
            
            this.ENDBOSS_MUSIC.loop = true;
            this.ENDBOSS_MUSIC.play();
            this.isEndbossMusicPlay = true;
            
        } else {
            
        }
    }

    playVictoryMusic(){
        if(music && !this.isVictoryMusicPlay){
        this.stopGameMusic();
        this.isVictoryMusicPlay = true;
        this.VICTORY_MUSIC.play();
        }
    }

    playDefeatMusic(){
        if(music && !this.isDefeatMusicPlay){
            this.stopGameMusic();
            this.isDefeatMusicPlay = true;
            this.GAMEOVER_MUSIC.play();
            }
    }

    playLostVoice(){
        if(!this.hadEndVoice){
            this.hadEndVoice = true;
            this.LOST_VOICE.play();
        }
    }

    playVictoryVoice(){
        if(!this.hadEndVoice){
            this.hadEndVoice = true;
            this.VICTORY_VOICE.play();
        }
    }
}

