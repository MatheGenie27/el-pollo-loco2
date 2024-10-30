/**
 * this class handles the Music in the game and the sounds that are not bound to an individual object
 */

class MusicHandler {
  COLLECT_BOTTLE_SOUND = new Audio("audio/sfx/glass_clink_sound.mp3");
  COLLECT_COIN_SOUND = new Audio("audio/sfx/brigt_metallic_sound.mp3");
  GAME_MUSIC = new Audio("audio/music/spanish_guitar_music_1.mp3");
  ENDBOSS_MUSIC = new Audio("audio/music/spanish_guitar_music_2.mp3");
  VICTORY_MUSIC = new Audio("audio/music/joyful_spanish_victo2.mp3");
  GAMEOVER_MUSIC = new Audio("audio/music/spanish_funeral_musi.mp3");
  COMPLETE_COIN = new Audio("audio/voice/dinero.mp3");
  START_VOICE = new Audio("audio/voice/startVoice.mp3");
  LOST_VOICE = new Audio("audio/voice/lostVoice.mp3");
  VICTORY_VOICE = new Audio("audio/voice/victoryVoice.mp3");
  isGameMusicPlay = false;
  isEndbossMusicPlay = false;
  isVictoryMusicPlay = false;
  isDefeatMusicPlay = false;
  isMusic = false;
  isSound = false;
  hadEndVoice = false;
  musicVaribaleHasChangend = false;
  checkInterval;

  constructor() {
    this.setDefaultMusicVolume();
    this.checkIfMusic();
    this.checkIfSound();
    this.setDefaultVoiceVolume();
    this.setDefaultMusicVolume();
  }

  /**
   * handles the Voice Default Volume
   */
  setDefaultVoiceVolume() {
    this.START_VOICE.volume = 0.6;
    this.LOST_VOICE.volume = 0.6;
    this.VICTORY_VOICE.volume = 0.6;
  }

  /**
   * stops the Musichandler
   */
  stopMusicHandler() {
    clearInterval(this.checkInterval);
    clearInterval(this.checkSoundInterval);
  }

  /**
   * handles the music default volume
   */
  setDefaultMusicVolume() {
    this.GAMEOVER_MUSIC.volume = 0.35;
    this.GAME_MUSIC.volume = 0.35;
    this.VICTORY_MUSIC.volume = 0.35;
    this.ENDBOSS_MUSIC.volume = 0.35;
  }

  /**
   * silences the music
   */
  muteMusic() {
    this.GAMEOVER_MUSIC.volume = 0;
    this.GAME_MUSIC.volume = 0;
    this.VICTORY_MUSIC.volume = 0;
    this.ENDBOSS_MUSIC.volume = 0;
  }

  /**
   * constantly checks if music should be played or not
   */
  checkIfMusic() {
    this.checkInterval = setInterval(() => {
      if (music === false) {
        this.muteMusic();
      } else if (music === true) {
        this.setDefaultMusicVolume();
      }
    }, 1000 / 10);
  }

  /**
   * constantly checks if sounds should be played or not
   */
  checkIfSound() {
    this.checkSoundInterval = setInterval(() => {
      if (sound === false) {
        this.abortLongSounds();
      }
    }, 1000 / 10);
  }

  /**
   * aborts playing sound
   */
  abortLongSounds() {
    this.START_VOICE.pause();
    this.LOST_VOICE.pause();
    this.VICTORY_VOICE.pause();
    this.COMPLETE_COIN.pause();
  }

  /**
   * stops Music from an previous Game when restarting
   */
  stopPreviousMusic() {
    this.VICTORY_MUSIC.pause();
    this.VICTORY_MUSIC.currentTime = 0;
    this.GAMEOVER_MUSIC.pause();
    this.GAMEOVER_MUSIC.currentTime = 0;
    this.isVictoryMusicPlay = false;
    this.isDefeatMusicPlay = false;
  }

  /**
   * stops all music
   */
  stopAllMusic() {
    this.stopGameMusic();
    this.stopPreviousMusic();
  }

  /**
   * stops inGame and EndGame Music
   */
  stopGameMusic() {
    this.GAME_MUSIC.pause();
    this.GAME_MUSIC.currentTime = 0;
    this.ENDBOSS_MUSIC.pause();
    this.ENDBOSS_MUSIC.currentTime = 0;
    this.isGameMusicPlay = false;
    this.isEndbossMusicPlay = false;
  }

  /**
   * plays gamemusic
   */
  playGameMusic() {
    this.GAME_MUSIC.loop = true;
    this.GAME_MUSIC.play();
    this.isGameMusicPlay = true;
  }

  /**
   * plays sound of bottle being collected
   */
  playBottleSound() {
    if (sound) {
      this.COLLECT_BOTTLE_SOUND.play();
    }
  }

  /**
   * plays sound of coin being collected
   */
  playCoinSound() {
    if (sound) {
      this.COLLECT_COIN_SOUND.play();
    }
  }

  /**
   * plays Voice wen all Coins of the level have been collected
   */
  playCoinsCompleted() {
    if (sound) {
      this.COMPLETE_COIN.play();
    }
  }

  /**
   * plays music when the endgame is reached
   */
  playEndbossMusic() {
    this.GAME_MUSIC.pause();
    this.isGameMusicPlay = false;
    if (!this.isEndbossMusicPlay) {
      this.ENDBOSS_MUSIC.loop = true;
      this.ENDBOSS_MUSIC.play();
      this.isEndbossMusicPlay = true;
    }
  }

  /**
   * plays Music when Player wins
   */
  playVictoryMusic() {
    if (!this.isVictoryMusicPlay) {
      this.stopGameMusic();
      this.isVictoryMusicPlay = true;
      this.VICTORY_MUSIC.play();
    }
  }

  /**
   * plays Music when Player loses
   */
  playDefeatMusic() {
    if (!this.isDefeatMusicPlay) {
      this.stopGameMusic();
      this.isDefeatMusicPlay = true;
      this.GAMEOVER_MUSIC.play();
    }
  }

  /**
   * sounds voice when player loses
   */
  playLostVoice() {
    if (!this.hadEndVoice && sound) {
      this.hadEndVoice = true;
      this.LOST_VOICE.play();
    }
  }

  /**
   * sounds voice when pleyer wins
   */
  playVictoryVoice() {
    if (!this.hadEndVoice && sound) {
      this.hadEndVoice = true;
      this.VICTORY_VOICE.play();
    }
  }

  /**
   * sounds voice when game starts
   */
  playStartVoice() {
    if (!this.hadStartVoice && sound) {
      this.hadStartVoice = true;
      this.START_VOICE.play();
    }
  }
}
