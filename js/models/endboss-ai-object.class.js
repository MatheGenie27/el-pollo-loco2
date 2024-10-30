/**
 * describes the AI of the endboss
 * @constructor: sets a random next AlterTime for endboss behaviour
 */

class EndbossAI {
  attack;
  alert;
  run;
  die;
  status;
  lastAlertTime;
  nextAlert = 0;

  constructor() {
    this.lastAlertTime = Date.now();
    this.nextAlert = Math.random() * 3000;
  }

  /**
   * receives message from endbossclass and forwards it to processing
   * @param {String} message
   */
  report(message) {
    this.process(message);
  }

  /**
   * reasons wnich instruction to give
   * @returns {String} returns the state of what the Endboss is in
   */
  getInstructions() {
    switch (this.status) {
      case "hurt":
        if (!(Date.now() - this.hurtTime > 1000)) {
          return this.status;
        } else this.status = "default";

      case "attack":
        if (!(Date.now() - this.attackTime > 1000)) {
          return this.status;
        } else this.status = "default";

      case "dead":
        return this.status;

      default:
        if (this.checkAlert()) {
          return "alert";
        } else {
          return "run";
        }
    }
  }

  /**
   * checks if the state is the alert state
   * @returns {boolean}
   */
  checkAlert() {
    const now = Date.now();

    if (this.isAlertActive(now)) {
      return true;
    }

    if (this.triggerNewAlert(now)) {
      return true;
    }

    return false;
  }

  /**
   * checks if the alertState is still Active
   * @param {Date} now
   * @returns {boolean}
   */
  isAlertActive(now) {
    if (this.alertActive && now - this.alertStartTime < 1000) {
      return true;
    } else {
      this.alertActive = false;
      return false;
    }
  }

  /**
   * triggers a new alertState
   * @param {Date} now
   * @returns {boolean}
   */
  triggerNewAlert(now) {
    if (now - this.lastAlertTime >= this.nextAlert) {
      this.alertActive = true;
      this.alertStartTime = now;
      this.nextAlert = Math.random() * 6000;
      this.lastAlertTime = now;
      return true;
    }

    return false;
  }

  /**
   * processes the message and turns them to preliminary states
   * @param {String} message
   */
  process(message) {
    switch (message) {
      case "hit":
        this.status = "hurt";
        this.hurtTime = Date.now();

        break;

      case "attack":
        this.status = "attack";
        this.attackTime = Date.now();
        break;

      case "dead":
        this.status = "dead";
    }
  }
}
