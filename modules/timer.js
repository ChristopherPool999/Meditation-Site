"use strict";

const simpleTimer = function() {
    let timerValues = [0, 0, 0, 0, 0, 0];
    let secondsLeft = 0;
    let isActive = false;
    let hasStarted = false;
    let isEmpty = true;
    const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // 10 hour, 1 hour, 10 min, 1 min, etc in seconds

    var updateTimerValues = reformatTimerValues => {
        if (timerValues[5] === 0 || reformatTimerValues) {
            let secondsCopy = secondsLeft;
            let newTimer = [0, 0, 0, 0, 0, 0];
            for (let i = 0; i < newTimer.length; i++) {
                if (secondsCopy >= timerUnitsAsSeconds[i]) {
                    newTimer[i] = Math.floor(secondsCopy / timerUnitsAsSeconds[i]);
                    secondsCopy = secondsCopy % timerUnitsAsSeconds[i];
                }
            }
            timerValues = newTimer;
        } else {
            timerValues[5]--;
        }
    }   
    var getTimerFormatted = () => {
        return "" + timerValues[0] +  timerValues[1] +  ":" + timerValues[2] + timerValues[3] 
                + ":" + timerValues[4] +  timerValues[5];
    }
    var updateInterface = () => {
        if (!isActive){
            if (document.querySelector(".simple__timer").firstChild) {
                document.querySelector(".time").innerHTML = getTimerFormatted();
            }
        } else {
            if (document.querySelector(".simple__timer").firstChild) {
                document.querySelector(".base-timer__label").innerHTML = getTimerFormatted();
            }
        }
    }
    var reset = () => { 
        document.querySelector(".start__button").classList.toggle("active");
        timerValues = [0, 0, 0, 0, 0, 0];
        isActive = false;
        secondsLeft = 0;
        isEmpty = true;
        hasStarted = false;
        updateInterface();
    }  
    { 
        let clockLoop = null;
        var countDown = () => {
            if (clockLoop === null) {
                clockLoop = setInterval(() => {
                    if (!isActive) {
                        clearInterval(clockLoop);
                        clockLoop = null;
                        return;
                    }
                    secondsLeft--;
                    updateTimerValues();
                    updateInterface();
                    if (secondsLeft === 0) {
                        this.onTimerEnd();
                        reset();
                    }
                }, 1000);
            }
        }
    }
    var timerStartedHtml = () => {
        return `
            <div class="timer">
                <div class="base-timer">
                    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g class="base-timer__circle">
                            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                            <path
                                id="base-timer-path-remaining"
                                stroke-dasharray="283"
                                class="base-timer__path-remaining"
                                d="
                                  M 50, 50
                                  m -45, 0
                                  a 45,45 0 1,0 90,0
                                  a 45,45 0 1,0 -90,0
                                "
                          ></path>
                        </g>
                    </svg>
                    <span id="base-timer-label" class="base-timer__label">
                        ${getTimerFormatted()} 
                    </span>
                </div>
            </div>`
    }
    var findTimeRemaining = () => {
        let totalSeconds = 0;
        for (let i = 0; i < timerValues.length; i++) {
            totalSeconds += timerValues[i] * timerUnitsAsSeconds[i];
        }
        return totalSeconds;
    }
    var addTime = input => {
        if (!hasStarted && timerValues[0] === 0) 
            if (input !== "0" || !isEmpty) {
                if (isEmpty){
                    document.querySelector(".start__button").classList.toggle("active");
                }
                isEmpty = false;
                timerValues.shift();
                timerValues.push(input);
                secondsLeft = findTimeRemaining();
                updateInterface();
            }
    }
    { 
        let resetAttempts = 0;
        var confirmResetButton = () => {
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
    var pauseTimer = () => {
        if (hasStarted) {
            isActive ? isActive = false : countDown();
        }
    }
    var startTimer = () => {
        if (!isEmpty && !isActive) {
            updateTimerValues(true);
            document.querySelector(".simple__timer").innerHTML = timerStartedHtml();
            countDown();
            isActive = true;
            hasStarted = true;
        }
    }
    var onKeyPressHandler = input => {
        if (!isNaN(parseInt(input.key))) {
            addTime(input.key);
        } 
        else if (input.code === "Backspace") {
            confirmResetButton();
        } 
        else if (input.code === "Space") {
            pauseTimer();
        } 
        else if (input.key === "Enter") {
            startTimer();
        }
    }
    var attachEventListeners = () => {
        document.addEventListener("keydown", onKeyPressHandler);
        document.querySelector(".timer__container").addEventListener("click", event => {
            let target = event.target.classList[0];
            if (target === "number__button") {
                if (!isNaN(parseInt(event.target.innerHTML))) {
                    addTime(event.target.innerHTML);
                } 
            } else if (target === "clear__button") {
                reset();
            } else if (target === "start__button") {
                startTimer();
            }
        })
    }
    var inactiveTimerHtml = () => {
        let startButtonClassName = isEmpty ? "start__button" : "start__button active";
        return `
            <div class="timer__container">
                <div class="timer">
                    <span class="time">${getTimerFormatted()}</span> 
                </div>
                <div class="timer__buttons__container">
                    <button class="number__button">1</button>
                    <button class="number__button">2</button>
                    <button class="number__button">3</button>
                    <button class="${startButtonClassName}">Go</button>
                    <button class="number__button">4</button>
                    <button class="number__button">5</button>
                    <button class="number__button">6</button>
                    <button class="clear__button">Del</button>
                    <button class="number__button">7</button>
                    <button class="number__button">8</button>
                    <button class="number__button">9</button>
                    <button class="number__button">0</button>
                </div>
            </div>`;
    }
    this.createClock =() => {
        document.querySelector(".simple__timer").innerHTML = (isActive) ? timerStartedHtml() : inactiveTimerHtml();
        attachEventListeners();
    }
    this.removeHandlers = () => {
        document.removeEventListener("keydown", onKeyPressHandler);
    }
    this.onTimerEnd = callback => {
        callback();
    }
    this.isActive = () => {
        return isActive;
    }
    this.getTimeLeft = () => {
        return secondsLeft;
    }
}
export { simpleTimer };