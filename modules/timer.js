"use strict";

const simpleTimer = function() {
    let clockNumbers = [0, 0, 0, 0, 0, 0];
    let isActive = false;
    let seconds = 0;
    let hasStarted = false;
    let isEmpty = true;
    let handlers = [];

    {   
        const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // 10 hour, 1 hour, 10 min, 1 min, etc in seconds
        var timeInSeconds = () => {
            let totalSeconds = 0;
            for (let i = 0; i < clockNumbers.length; i++) {
                totalSeconds += clockNumbers[i] * timerUnitsAsSeconds[i];
            }
            return totalSeconds;
        }
        var timeInClockFormat = () => {
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
    }
    var clockTime = () => {
        return "" + clockNumbers[0] +  clockNumbers[1] +  ":" + clockNumbers[2] + clockNumbers[3] 
        + ":" + clockNumbers[4] +  clockNumbers[5];
    }
    var updateInterface = () => {
        if (document.querySelector(".simple__timer__container").firstChild) {
            document.querySelector(".time").innerHTML = clockTime();
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
    { 
        let clockLoop = null;
        var countDown = () => {
            isActive = true;
            if (clockLoop === null) {
                clockLoop = setInterval(() => {
                    if (!isActive) {
                        clearInterval(clockLoop);
                        clockLoop = null;
                        return;
                    }
                    seconds--;
                    clockNumbers = timeInClockFormat();
                    updateInterface();
                    if (seconds === 0) {
                        this.onTimerEnd();
                        reset();
                    }
                }, 1000);
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
    var pause = () => {
        if (hasStarted) {
            isActive ? isActive = false : countDown();
            document.querySelector(".play__button").classList.toggle("active");
        }
    }
    var start = () => {
        if (!isActive && isEmpty) {
            flashIfEmptyTimer()
        }
        if (!isEmpty && !isActive) {
            hasStarted = true;
            isActive = true;
            countDown();
            document.querySelector(".play__button").classList.toggle("active"); 
        }
    }
    var addTime = input => {
        if (!hasStarted && clockNumbers[0] === 0) 
            if (input !== "0" || !isEmpty) {
                isEmpty = false;
                clockNumbers.shift();
                clockNumbers.push(input);
                seconds = timeInSeconds();
                updateInterface();
            }
    }
    { 
        let clearAttempts = 0;
        var clear = () => {
            if (!isEmpty) {
                clearAttempts++;
                setTimeout(function() {
                    clearAttempts = 0;
                }, 500);
                if (clearAttempts === 2) {
                    if (isActive) {
                        document.querySelector(".play__button").classList.toggle("active"); 
                    }
                    reset(); 
                }
            }
        }
    }   
    this.onTimerEnd = callback => {
        callback();
    }
    this.isActive = () => {
        return isActive;
    }
    this.getTimeLeft = () => {
        return seconds;
    }
    this.createClock = () => {
        const playBtnActive = isActive ? "play__button active" : "play__button";
        document.querySelector(".simple__timer__container").innerHTML = `
        <div class="timer">
            <span class="time">${clockTime()}</span>
            <button class="${playBtnActive}"></button>
            <div class="play__button__highlight"></div>
        </div>`;

        var onClickHandler = event => {
            if (event.target.classList[0] === "play__button" || event.target.classList[0]
                    === "play__button__highlight") {
                !this.isActive() ? start() : pause();
            }
        }
        var keydownHandler = input => {
            if (!isNaN(parseInt(input.key))) {
                addTime(input.key);
            }
            else if (input.code === "Backspace") {
                clear();
            }
            else if (input.code === "Space") {
                pause();
            }
            else if (input.key === "Enter") {
                start();
            }
        }
        document.addEventListener("click", onClickHandler);
        document.addEventListener("keydown", keydownHandler);
        handlers.push(onClickHandler);
        handlers.push(keydownHandler);
    }
    this.removeHandlers = () => {
        document.removeEventListener("click", handlers[0]);
        document.removeEventListener("keydown", handlers[1]);
        handlers = [];
    }
}
export { simpleTimer };