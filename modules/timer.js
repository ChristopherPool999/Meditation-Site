"use strict";

const simpleTimer = function() {
    let clockNumbers = [0, 0, 0, 0, 0, 0];
    let isActive = false;
    let seconds = 0;
    let hasStarted = false;
    let isEmpty = true;
    let onKeyHandler = null;

    {   
        const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // 10 hour, 1 hour, 10 min, 1 min, etc in seconds
        var timeInSeconds = () => {
            let totalSeconds = 0;
            for (let i = 0; i < clockNumbers.length; i++) {
                totalSeconds += clockNumbers[i] * timerUnitsAsSeconds[i];
            }
            return totalSeconds;
        }
        var updateClockNumbers = isFirstInterval => {
            if (clockNumbers[5] === 0 || isFirstInterval) {
                let secondsCopy = seconds;
                let newTimer = [0, 0, 0, 0, 0, 0];
                for (let i = 0; i < newTimer.length; i++) {
                    if (secondsCopy >= timerUnitsAsSeconds[i]) {
                        newTimer[i] = Math.floor(secondsCopy / timerUnitsAsSeconds[i]);
                        secondsCopy = secondsCopy % timerUnitsAsSeconds[i];
                    }
                }
                clockNumbers = newTimer;
            } else {
                clockNumbers[5]--;
            }
        }   
    }
    var clockTime = () => {
        return "" + clockNumbers[0] +  clockNumbers[1] +  ":" + clockNumbers[2] + clockNumbers[3] 
                + ":" + clockNumbers[4] +  clockNumbers[5];
    }
    var updateInterface = () => {
        if (document.querySelector(".simple__timer").firstChild) {
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
            let firstInterval = !hasStarted;
            if (clockLoop === null) {
                clockLoop = setInterval(() => {
                    if (!isActive) {
                        clearInterval(clockLoop);
                        clockLoop = null;
                        return;
                    }
                    seconds--;
                    updateClockNumbers(firstInterval);
                    updateInterface();
                    if (seconds === 0) {
                        this.onTimerEnd();
                        reset();
                    }
                }, 1000);
            }
        }
    }
    var pause = () => {
        if (hasStarted) {
            isActive ? isActive = false : countDown();
        }
    }
    var start = () => {
        if (!isEmpty && !isActive) {
            createActiveClock();
            countDown();
            isActive = true;
            hasStarted = true;
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
        let resetAttempts = 0;
        var awaitResetConfirm = () => {
            if (!isEmpty) {
                resetAttempts++;
                setTimeout(function() {
                    resetAttempts = 0;
                }, 500);
                if (resetAttempts === 2) {
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
    /////////////////////////// ugly af past here
    this.createInactiveClock = () => {
        document.querySelector(".simple__timer").innerHTML = `
            <div class="timer__container">
                <div class="timer">
                    <span class="time">${clockTime()}</span> 
                </div>
                <div class="timer__buttons__container">
                    <button class="clock__button">1</button>
                    <button class="clock__button">2</button>
                    <button class="clock__button">3</button>
                    <button class="clock__button start__button">Go</button>
                    <button class="clock__button">4</button>
                    <button class="clock__button">5</button>
                    <button class="clock__button">6</button>
                    <button class="clock__button clear__button">Del</button>
                    <button class="clock__button">7</button>
                    <button class="clock__button">8</button>
                    <button class="clock__button">9</button>
                    <button class="clock__button">0</button>
                </div>
            </div>`;
        var onKeyHandler = input => {
            if (!isNaN(parseInt(input.key))) {
                addTime(input.key);
            } 
            else if (input.code === "Backspace") {
                awaitResetConfirm();
            } 
            else if (input.code === "Space") {
                pause();
            } 
            else if (input.key === "Enter") {
                start();
            }
        }
        document.addEventListener("keydown", onKeyHandler);
        document.querySelector(".timer__container").addEventListener("click", event => {
            if (event.target.classList[0] === "clock__button") {
                let buttonValue = parseInt(event.target.innerHTML);
                if (!isNaN(buttonValue)) {
                    addTime(buttonValue);
                } else {
                    reset();
                }
            }
        })
    }
    var createActiveClock = () => {
        document.querySelector(".simple__timer").innerHTML = `
        <div class="timer">
            <div class="base-timer">
                <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g class="base-timer__circle">
                    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    </g>
                </svg>
                <span id="base-timer-label" class="base-timer__label">
                    ${clockTime()} 
                </span>
            </div>
        </div>`
    }
    this.removeHandlers = () => {
        document.removeEventListener("keydown", onKeyHandler);
    }
}
export { simpleTimer };