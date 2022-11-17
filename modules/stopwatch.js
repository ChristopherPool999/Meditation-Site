"use strict";

const stopwatch = function() {
    this.interface = [0, 0, 0, 0, 0, 0];
    this.isActive = false;
    this.seconds = 0;
    this.hasStarted = false;
    this.isEmpty = true;
    this.onTimerEnd = function() {};

    let clockLoop = null;
    this.countDown = elements => {
        this.isActive = true;
        if (clockLoop === null) {
            clockLoop = setInterval(() => {
                if (this.isActive === false) {
                    clearInterval(clockLoop);
                    clockLoop = null;
                    return;
                }
                this.seconds--;
                if (this.seconds === 0) {
                    this.onTimerEnd();
                    this.reset();
                }
                if (elements !== undefined) {
                    this.interface = this.convertToClockFormat(this.seconds);
                    this.updateInterface(elements);
                }
            }, 1000);
        }
    } 

    this.reset = () => {
        this.interface = [0, 0, 0, 0, 0, 0];
        this.isActive = false;
        this.seconds = 0;
        this.isEmpty = true;
        this.hasStarted = false;
    }

    const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // different positions of a timer converted to seconds.
    this.convertToSeconds = clock => {
        let totalSeconds = 0;
        for (let i = 0; i < clock.length; i++) {
            totalSeconds += clock[i] * timerUnitsAsSeconds[i];
        }
        return totalSeconds;
    }

    this.convertToClockFormat = seconds => {
        let newTimer = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < newTimer.length; i++) {
            if (seconds >= timerUnitsAsSeconds[i]) {
                newTimer[i] = Math.floor(seconds / timerUnitsAsSeconds[i]);
                seconds = seconds % timerUnitsAsSeconds[i];
            }
        }
        return newTimer;
    }

    // functions for directly changing elements
    this.addToInterface = (input, clockInterface) => {
        if (!this.hasStarted) 
            if (input !== "0" || !this.isEmpty) {
                this.isEmpty = false;
                
                if (this.interface[0] === 0) {
                    this.interface.shift();
                    this.interface.push(input);;
                }

                this.seconds = this.convertToSeconds(this.interface);
                this.updateInterface(clockInterface);
            }
    }

    this.updateInterface = elementList => {
        for (let i = 0; i < 6; i++) {
            if (parseInt(elementList[i].innerHTML) === this.interface[i]) {
                continue;
            }
            elementList[i].innerHTML = this.interface[i];
        }
    }

    {   let deleteConfirmation = false;
        this.clearInterface = (clockInterface, playButtonIcon) => {
            if (!this.isEmpty) {
                setTimeout(function() {
                    deleteConfirmation = false;
                }, 500);
                if (deleteConfirmation) {
                    if (this.isActive) {
                        playButtonIcon.toggle("active"); 
                    }
                    this.reset(); 
                    this.updateInterface(clockInterface);
                }
                deleteConfirmation = true;
            }
        } }

    // can change input === space and just put it on the main file
    this.pauseInterface = (clockInterface, playButtonIcon) => {
        if (input === "Space" && this.hasStarted) {
            this.isActive ? this.isActive = false : this.countDown(clockInterface);
            playButtonIcon.toggle("active");
        }
    }

    
    {   
        this.startTimerInterface = (interfaceContainer, playButtonIcon) => {
            let interfaceFlash = null;
            if (!this.isActive) {
                console.log(123);
                if (this.isEmpty && interfaceFlash === null) {
                    let clockflashAmount = 0;
                    interfaceFlash = setInterval(() => {
                        interfaceContainer.toggle("active");
                        clockflashAmount++;
                        if (clockflashAmount === 4) {
                            clearInterval(interfaceFlash);
                            interfaceFlash = null;
                            return;
                        }
                    }, 500); 
                }
                else if (!this.isEmpty) {
                    console.log(123);
                    this.hasStarted = true;
                    this.isActive = true;
                    this.seconds = this.convertToSeconds(this.interface);
                    this.countDown(clockInterface);
                    playButtonIcon.toggle("active"); 
                }
            }
        } }
}

export { stopwatch };