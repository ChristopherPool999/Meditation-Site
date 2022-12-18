"use strict";

const simpleTimer = function() {
    let clockNumbers = [0, 0, 0, 0, 0, 0];
    let isActive = false;
    let seconds = 0;
    let hasStarted = false;
    let isEmpty = true;

    function createTimer(includePlayButton) {
        const timer = document.createElement("div");
        timer.className = "timer";
        document.querySelector(".simple__timer__container").appendChild(timer);

        createInterface(timer);
        if (includePlayButton) {
            createPlayButton(timer);
        }  
    }
    function createInterface(timerElement) {
        let alterIndexNum = 0;
        for (let i = 0; i < 8; i++) {
            const interfaceUnit = document.createElement("span");
            if (i === 2 || i === 5) {
                interfaceUnit.innerHTML = ":";
                alterIndexNum++;
            } else {
                interfaceUnit.innerHTML = clockNumbers[i - alterIndexNum];
                interfaceUnit.className = "time";
            }
            timerElement.appendChild(interfaceUnit);
        }
    }
    function createPlayButton(timerElement) {
        const playButton = document.createElement("button");
        const playButtonHighlight = document.createElement("div");
        playButtonHighlight.className = "play__button__highlight";
        playButton.className = "play__button";
        timerElement.appendChild(playButton);
        timerElement.appendChild(playButtonHighlight);
    }
    createTimer(true);

    let clockLoop = null; // maybe we try and fix global var
    var countDown = () => {
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
                clockNumbers = convertToClockFormat();
                updateInterface()
                if (seconds === 0) {
                    this.onTimerEnd();
                    reset();
                }
            }, 1000);
        }
    } 
    var reset = () => { // try to combine reset and erase?
        clockNumbers = [0, 0, 0, 0, 0, 0];
        isActive = false;
        seconds = 0;
        isEmpty = true;
        hasStarted = false;
        updateInterface();
    }
    const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // different positions of a timer converted to seconds.
    var timeInSeconds = () => {
        let totalSeconds = 0;
        for (let i = 0; i < clockNumbers.length; i++) {
            totalSeconds += clockNumbers[i] * timerUnitsAsSeconds[i];
        }
        return totalSeconds;
    }
    var convertToClockFormat = () => {
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
    var updateInterface = () => {
        if (document.querySelectorAll(".time").length) {
            for (let i = 0; i < 6; i++) {
                document.querySelectorAll(".time")[i].innerHTML = clockNumbers[i];
            }  
        }     
    }
    var flashIfEmptyTimer = () => {
        let interfaceContainer = document.querySelector(".timer").classList; 
        if (interfaceContainer[1] !== "active") {
            interfaceContainer.toggle("active");
            setTimeout(() => {
                interfaceContainer.toggle("active");
            }, 500);
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
    this.addTime = input => {
        if (!hasStarted && clockNumbers[0] === 0) 
            if (input !== "0" || !isEmpty) {
                isEmpty = false;
                clockNumbers.shift();
                clockNumbers.push(input);
                seconds = timeInSeconds();
                updateInterface();
            }
    }
    let clearAttempts = 0;
    this.clear = () => {
        if (!isEmpty) {
            clearAttempts++;
            setTimeout(function() {
                clearAttempts = 0;
            }, 500);
            if (clearAttempts === 2) {
                if (isActive) {
                    document.querySelector(".play__button").classList.toggle("paused"); 
                }
                reset(); 
            }
        }
    }   
    this.onTimerEnd = () => {};

    this.isActive = () => {
        return isActive;
    }
    this.getTimeLeft = () => {
        return seconds;
    }
}
export { simpleTimer };