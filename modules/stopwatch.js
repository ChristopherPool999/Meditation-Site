"use strict"

const simpleStopwatch = function() {
    let clockNumbers = [0, 0, 0, 0, 0, 0];
    let seconds = 0;
    let isActive = false;
    let hasStarted = false;
    let onEnterKeyHandler = null;
    {   
        const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // 10 hour, 1 hour, 10 min, 1 min, etc in seconds
        var updateClockNumbers = () => {
            if (clockNumbers[5] === 9) {
                let secondsCopy = seconds;
                let newTimer = [0, 0, 0, 0, 0, 0];
                for (let i = 0; i < 6; i++) {
                    if (secondsCopy >= timerUnitsAsSeconds[i]) {
                        newTimer[i] = Math.floor(secondsCopy / timerUnitsAsSeconds[i]);
                        secondsCopy = secondsCopy % timerUnitsAsSeconds[i];
                    }
                }
                clockNumbers = newTimer;
            } else {
                clockNumbers[5]++;
            }
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
    var resetButtons = () => {
        const buttonsContainer = document.querySelector(".stopwatch__buttons__container");
        const toggleStopwatchBtn = buttonsContainer.querySelector(".toggle__stopwatch");

        buttonsContainer.querySelector(".clear__stopwatch").classList.toggle("active");
        toggleStopwatchBtn.classList.toggle("has__started");
        if (toggleStopwatchBtn.innerHTML == "Pause") {
            toggleStopwatchBtn.classList.toggle("active");
        }
        toggleStopwatchBtn.innerHTML = "Start";
    }  
    var reset = () => { 
        clockNumbers = [0, 0, 0, 0, 0, 0];
        isActive = false;
        seconds = 0;
        hasStarted = false;
        updateInterface();
        resetButtons();
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
                    seconds++;
                    updateClockNumbers();
                    updateInterface();
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
        if (!hasStarted) {
            document.querySelector(".clear__stopwatch").classList.toggle("active");
            document.querySelector(".toggle__stopwatch").classList.toggle("has__started");
        }
        if (!isActive) {
            hasStarted = true;
            isActive = true;
            countDown();
        }
    }
    { 
        let clearAttempts = 0;
        var clear = () => {
            if (hasStarted) {
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
    onEnterKeyHandler = input => {
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
    var addHandlers = () => {
        const stopwatchToggle = document.querySelector(".toggle__stopwatch");
        const clearButton = document.querySelector(".clear__stopwatch");

        document.addEventListener("keydown", onEnterKeyHandler);

        stopwatchToggle.addEventListener("click", () => {
            isActive ? pause() : start();
            stopwatchToggle.classList.toggle("active");
            let toggleBtnText = isActive ? "Pause" : "Start";
            stopwatchToggle.innerHTML = toggleBtnText;
        })
        clearButton.addEventListener("click", () => {
            reset();
        })
    }   
    this.createStopwatch = () => {
        let toggleStopwatchClass = "toggle__stopwatch";
        let clearStopwatchClass = "clear__stopwatch";
        let toggleStopwatchText = "Start";

        if (hasStarted && !isActive) {
            toggleStopwatchClass = "toggle__stopwatch has__started";
            clearStopwatchClass = "clear__stopwatch active";
        }
        if (isActive) {
            toggleStopwatchClass = "toggle__stopwatch has__started active";
            clearStopwatchClass = "clear__stopwatch active";
            toggleStopwatchText = "Pause";
        }
        document.querySelector(".simple__stopwatch__container").innerHTML = `
            <div class="stopwatch">
                <span class="time">${clockTime()}</span>
            </div>
            <div class="stopwatch__buttons__container">
                <button class="${toggleStopwatchClass}">${toggleStopwatchText}</button>
                <button class="${clearStopwatchClass}">Clear</button>
            </div>`;
        addHandlers();
    }
    this.removeHandlers = () => {
        document.removeEventListener("keydown", onEnterKeyHandler);
    }
}
export { simpleStopwatch };