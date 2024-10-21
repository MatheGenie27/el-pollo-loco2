class EndbossAI{


    attack;
    alert;
    run;
    die;
    status;
    lastAlertTime;
    nextAlert = 0;



    constructor(){
        this.lastAlertTime = Date.now();
        this.nextAlert = (Math.random() * 3000);
        //console.log(this.lastAlertTime);
        //console.log(this.nextAlert);
    }


    report(message){
        
        this.process(message);
    }

    getInstructions() {
        switch(this.status) {
            case 'hurt':
                if (!(Date.now() - this.hurtTime > 1000)) {
                    return this.status;
                } else this.status='default';
                
            
            case 'attack':
                if (!(Date.now() - this.attackTime > 1000)) {
                    return this.status;
                } else this.status = 'default';
                
            
            case 'dead':
                
                return this.status;
        
    
            default:
                if(this.checkAlert()) {
                    
                    
                    return 'alert';
                } else {
                    return 'run';
                }
        }
    }

    checkAlert() {
        // Wenn der Alert aktiv ist, prüfe, ob 1 Sekunde seit dem letzten Alert vergangen ist
        if (this.alertActive) {
            if (Date.now() - this.alertStartTime < 1000) {
                return true; // Alert bleibt für 1 Sekunde aktiv
            } else {
                // Nach 1 Sekunde Alert deaktivieren und Timer zurücksetzen
                this.alertActive = false;
            }
        }
    
        // Prüfen, ob die nächste Alert-Zeit erreicht ist
        if (Date.now() - this.lastAlertTime >= this.nextAlert) {
            
    
            // Setze den Alert für 1 Sekunde aktiv
            this.alertActive = true;
            this.alertStartTime = Date.now(); // Setze den Startzeitpunkt für den Alert
    
            // Berechne den nächsten Alert zufällig in einem Bereich von bis zu 3000 Millisekunden
            this.nextAlert = Math.random() * 6000;
            this.lastAlertTime = Date.now(); // Aktualisiere die letzte Alert-Zeit
    
            return true;
        }
    
        return false; // Kein Alert, wenn Bedingungen nicht erfüllt sind
    }

    process(message){
        

        switch(message){


            case ('hit'):
                this.status = 'hurt';
                this.hurtTime = Date.now();
                
            break;

            case ('attack'):
                this.status = 'attack';
                this.attackTime = Date.now();
                break;

            case ('dead'):
                
                this.status = 'dead';

        }

    }


}