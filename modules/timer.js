"use strict";

const simpleStopwatch = function() {
    let clockLayout = [0, 0, 0, 0, 0, 0];
    let isActive = false;
    let seconds = 0;
    let hasStarted = false;
    let isEmpty = true;

    function createTimer(includePlayButton) {
        let timer = document.createElement("div");
        timer.className = "timer";
        document.querySelector(".timer__container").appendChild(timer);

        createInterface();
        if (includePlayButton) {
            createPlayButton();
        }  
        function createInterface() {
            let alterIndexNum = 0;
            for (let i = 0; i < 8; i++) {
                let interfaceUnit = document.createElement("span");
                if (i === 2 || i === 5) {
                    interfaceUnit.innerHTML = ":";
                    alterIndexNum++;
                } else {
                    interfaceUnit.innerHTML = clockLayout[i - alterIndexNum];
                    interfaceUnit.className = "time";
                }
                timer.appendChild(interfaceUnit);
            }
        }
        function createPlayButton() {
            let playButton = document.createElement("button");
            let playButtonHighlight = document.createElement("div");
            playButtonHighlight.className = "play__button__highlight";
            playButton.className = "play__button";
            timer.appendChild(playButton);
            timer.appendChild(playButtonHighlight);
        }
    }
    createTimer(true);
    
    this.onTimerEnd = () => {};

    this.isActive = () => {
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
    this.clear = () => {
        if (!isEmpty) {
            setTimeout(function() {
                deleteConfirmation = false;
            }, 500);
            if (deleteConfirmation) {
                if (isActive) {
                    document.querySelector(".play__button").classList.toggle("paused"); 
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
    this.addTime = input => {
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
            document.querySelectorAll(".time")[i].innerHTML = clockLayout[i];
        }       
    }
    this.pause = () => {
        if (hasStarted) {
            isActive ? isActive = false : countDown();
            document.querySelector(".play__button").classList.toggle("paused");
        }
    }
    this.start = () => {
        if (!isActive && isEmpty) {
            flashIfEmptyTimer()
        }
        if (!isEmpty && !isActive) {
            hasStarted = true;
            isActive = true;
            countDown();
            document.querySelector(".play__button").classList.toggle("paused"); 
        }
    }
    let flashIfEmptyTimer = () => {
        let interfaceContainer = document.querySelector(".timer").classList; 
        if (interfaceContainer[1] !== "active") {
            interfaceContainer.toggle("active");
            setTimeout(() => {
                interfaceContainer.toggle("active");
            }, 500);
        }
    }
}
export { simpleStopwatch };