"use strict"

const simpleStopwatch = function() {
    let clockNumbers = [0, 0, 0, 0, 0, 0];
    let seconds = 0;
    let isActive = false;
    let hasStarted = false;
    let onEnterHandler = null;
    {   
        const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // 10 hour, 1 hour, 10 min, 1 min, etc in seconds
        var timeInClockFormat = () => {
            let secondsCopy = seconds;
            let newTimer = [0, 0, 0, 0, 0, 0];
            for (let i = 0; i < 6; i++) {
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
        if (document.querySelector(".simple__stopwatch__container").firstChild) {
            document.querySelector(".time").innerHTML = clockTime();
        }
    }
    var reset = () => { 
        clockNumbers = [0, 0, 0, 0, 0, 0];
        isActive = false;
        seconds = 0;
        hasStarted = false;
        updateInterface();
    }  
    { 
        let clockLoop = null;
        var countDown = () => {
            isActive = true;
            if (clockLoop === null) {
                clockLoop = setInterval(() => {
                    seconds++;
                    clockNumbers = timeInClockFormat();
                    updateInterface();
                    if (!isActive) {
                        clearInterval(clockLoop);
                        clockLoop = null;
                        return;
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
        if (!isActive) {
            hasStarted = true;
            isActive = true;
            countDown();
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
                    reset(); 
                }
            }
        }
    }   
    this.createStopwatch = () => {
        document.querySelector(".simple__stopwatch__container").innerHTML = `
        <div class="stopwatch">
            <span class="time">${clockTime()}</span>
        </div>
        <div class="stopwatch__buttons__container">
            <button class="toggle__stopwatch">Start</button>
            <button class="clear__stopwatch">Clear</button>
        </div>`
        
        onEnterHandler = input => {
            if (input.code === "Backspace") {
                clear();
            }
            else if (input.code === "Space") {
                pause();
            }
            else if (input.key === "Enter") {
                start();
            }
        }
        document.addEventListener("keydown", onEnterHandler);
    }
    this.removeHandlers = () => {
        document.removeEventListener("keydown", onEnterHandler);
    }
}
export { simpleStopwatch };