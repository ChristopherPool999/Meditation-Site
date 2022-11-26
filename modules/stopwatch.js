"use strict";

const stopwatch = function(clockUi, playButtonIcon) {
    let clockLayout = [0, 0, 0, 0, 0, 0];
    let isActive = false;
    let seconds = 0;
    let hasStarted = false;
    let isEmpty = true;

    this.onTimerEnd = () => {};

    this.checkActive = () => {
        return isActive;
    }

    this.getTimeLeft = () => {
        return seconds;
    }

    let clockLoop = null; // maybe we try and fix global var
    let countDown = () => {
        seconds = timeInSeconds();
        isActive = true;
        if (clockLoop === null) {
            clockLoop = setInterval(() => {
                if (isActive === false) {
                    clearInterval(clockLoop);
                    clockLoop = null;
                    return;
                }
                seconds--;
                clockLayout = convertToClockFormat();
                updateInterface()
                if (seconds === 0) {
                    this.onTimerEnd();
                    reset();
                }
            }, 1000);
        }
    } 

    let reset = () => { // try to combine reset and erase?
        clockLayout = [0, 0, 0, 0, 0, 0];
        isActive = false;
        seconds = 0;
        isEmpty = true;
        hasStarted = false;
        updateInterface();
    }

        let deleteConfirmation = false;
        this.clear = () => { // use this in other file
            if (!isEmpty) {
                setTimeout(function() {
                    deleteConfirmation = false;
                }, 500);
                if (deleteConfirmation) {
                    if (isActive) {
                        playButtonIcon.toggle("active"); 
                    }
                    reset(); 
                }
                deleteConfirmation = true;
            }
        }

    const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // different positions of a timer converted to seconds.
    let timeInSeconds = () => {
        let totalSeconds = 0;
        for (let i = 0; i < clockLayout.length; i++) {
            totalSeconds += clockLayout[i] * timerUnitsAsSeconds[i];
        }
        return totalSeconds;
    }

    let convertToClockFormat = () => {
        let secondsCopy = seconds;
        let newTimer = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < newTimer.length; i++) {
            if (secondsCopy >= timerUnitsAsSeconds[i]) {
                newTimer[i] = Math.floor(secondsCopy / timerUnitsAsSeconds[i]);
                secondsCopy = secondsCopy % timerUnitsAsSeconds[i];
            }
        }
        return newTimer;
    }

    // functions for directly changing elements
    this.add = input => {
        if (!hasStarted && clockLayout[0] === 0) 
            if (input !== "0" || !isEmpty) {
                isEmpty = false;
                clockLayout.shift();
                clockLayout.push(input);
                seconds = timeInSeconds();
                updateInterface();
            }
    }

    let updateInterface = () => {
        for (let i = 0; i < 6; i++) {
            clockUi[i].innerHTML = clockLayout[i];
        }       
    }

    // can change input === space and just put it on the main file     // use this in other file
    this.pause = () => {
        if (hasStarted) {
            isActive ? isActive = false : countDown();
            playButtonIcon.toggle("active");
        }
    }
    
        this.start = interfaceContainer => { 
            if (!isActive && isEmpty && document.getElementsByClassName) {
                flashIfEmptyTimer(interfaceContainer)
            }
            if (!isEmpty && !isActive) {
                hasStarted = true;
                isActive = true;
                countDown();
                playButtonIcon.toggle("active"); 
            }
        }

        let flashIfEmptyTimer = interfaceContainer => {
            if (interfaceContainer[1] !== "active") {
                interfaceContainer.toggle("active");
                setTimeout(() => {
                    interfaceContainer.toggle("active");
                }, 500);
            }
        }
}

export { stopwatch };

let flashIfEmptyTimer = interfaceContainer => {
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