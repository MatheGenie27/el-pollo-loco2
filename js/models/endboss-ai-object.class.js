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

  report(message) {
    this.process(message);
  }

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

  isAlertActive(now) {
    if (this.alertActive && now - this.alertStartTime < 1000) {
      return true;
    } else {
      this.alertActive = false;
      return false;
    }
  }

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
