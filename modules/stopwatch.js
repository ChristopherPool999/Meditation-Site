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

    let clockLoop = null;
    let countDown = () => {
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

    let reset = () => {
        clockLayout = [0, 0, 0, 0, 0, 0];
        isActive = false;
        seconds = 0;
        isEmpty = true;
        hasStarted = false;
        updateInterface();
    }

    {   let deleteConfirmation = false;
        this.clearInterface = () => { // use this in other file
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
        } }

    const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // different positions of a timer converted to seconds.
    let convertToSeconds = () => {
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
    this.addToInterface = input => { // use this in other file
        if (!hasStarted && clockLayout[0] === 0) 
            if (input !== "0" || !isEmpty) {
                isEmpty = false;
                clockLayout.shift();
                clockLayout.push(input);
                seconds = convertToSeconds();
                updateInterface();
            }
    }

    let updateInterface = () => {
        for (let i = 0; i < 6; i++) {
            if (parseInt(clockUi[i].innerHTML) === clockLayout[i]) {
                continue;
            }
            clockUi[i].innerHTML = clockLayout[i];
        }
    }

    // can change input === space and just put it on the main file     // use this in other file
    this.pauseInterface = () => {
        if (hasStarted) {
            isActive ? isActive = false : countDown();
            playButtonIcon.toggle("active");
        }
    }

    this.startTimerInterface = interfaceContainer => { 
        if (!isActive && isEmpty && interfaceFlash === null) {
            flashIfEmptyTimer(interfaceContainer)
        }
        if (!isEmpty && !isActive) {
            hasStarted = true;
            isActive = true;
            seconds = convertToSeconds();
            countDown();
            playButtonIcon.toggle("active"); 
        }
        }
    }

    let interfaceFlash = null;
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

export { stopwatch };