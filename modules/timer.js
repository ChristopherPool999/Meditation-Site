"use strict";

const simpleTimer = function() {
    let clockNumbers = [0, 0, 0, 0, 0, 0];
    let isActive = false;
    let seconds = 0;
    let hasStarted = false;
    let isEmpty = true;
    let handlers = [];
    
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
    var reset = () => { 
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
    var clockTime = () => {
        return "" + clockNumbers[0] +  clockNumbers[1] +  ":" + clockNumbers[2] + clockNumbers[3] 
        + ":" + clockNumbers[4] +  clockNumbers[5];
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
            document.querySelector(".time").innerHTML = clockTime();
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
    this.createClock = () => {
        document.querySelector(".simple__calendar__container").innerHTML = `
        <div class="timer">
            <span class="time">${clockTime()}</span>
            <button class="play__button"></button>
            <div class="play__button__highlight"></div>
        </div>`;

        var mouseDownHandler = event => {
            if (event.target.classList[0] === "play__button" || event.target.classList[0]
                    === "play__button__highlight") {
                !this.isActive() ? this.start() : this.pause();
            }
        }
        var keydownHandler = input => {
            if (!isNaN(parseInt(input.key))) {
                this.addTime(input.key);
            }
            else if (input.code === "Backspace") {
                this.clear();
            }
            else if (input.code === "Space") {
                this.pause();
            }
            else if (input.key === "Enter") {
                this.start();
            }
        }
        document.addEventListener("mousedown", mouseDownHandler);
        document.addEventListener("keydown", keydownHandler);
        handlers.push(mouseDownHandler);
        handlers.push(keydownHandler);
    }
    this.removeHandlers = () => {
        document.removeEventListener("mousedown", handlers[0]);
        document.removeEventListener("keydown", handlers[1]);
        handlers = [];
    }
}
export { simpleTimer };