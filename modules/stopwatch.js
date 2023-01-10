"use strict"

const simpleStopwatch = function() {
    let UIValues = [0, 0, 0, 0, 0, 0];
    let startedTime = null;
    let secondsBeforePause = 0;
    let secondsSinceStart = 0;
    let recordedSeconds = 0;  
    let isActive = false;
    let hasStarted = false;
    let onEnterKeyHandler = null;  

    var getTimeWithColons = () => {
        return "" + UIValues[0] +  UIValues[1] +  ":" + UIValues[2] + UIValues[3] 
                + ":" + UIValues[4] +  UIValues[5];
    }
    var getStartBtnText = () => {
        return isActive ? "Pause" : "Start";
    }
    var getClearBtnClass = () => {
        return !hasStarted ? "clear__stopwatch" : "clear__stopwatch active";
    }
    var getStartBtnClass = () => {
        if (hasStarted && !isActive) {
            return "toggle__start has__started";
        } else {
            return isActive ? "toggle__start has__started active" : "toggle__start" ;
        }
    } 
    var getMillisPassed = () => {
        return Math.round((secondsSinceStart - Math.floor(secondsSinceStart)) * 1000);
    }
    var getFormattedMillis = () => {
        if (getMillisPassed() < 10) {
            return "00" + getMillisPassed();
        } else {
            return getMillisPassed() < 100 ? "0" + getMillisPassed() : getMillisPassed();
        }    
    }
    var createStopwatchHtml = () => {
        document.querySelector(".simple__stopwatch").innerHTML = `
            <div class="stopwatch">
                <span class="time">${getTimeWithColons()}</span>
                <span class="milliseconds">${getFormattedMillis()}</span>
            </div>
            <div class="stopwatch__buttons__container">
                <button class="${getStartBtnClass()}">${getStartBtnText()}</button>
                <button class="${getClearBtnClass()}">Clear</button>
            </div>`;
    }
    var resetProperties = () => {
        UIValues = [0, 0, 0, 0, 0, 0];
        isActive = false;
        hasStarted = false;
        secondsSinceStart = 0;
        secondsBeforePause = 0;
        recordedSeconds = 0;
    }
    var resetStyleClasses = () => {
        document.querySelector(".toggle__start").classList = "toggle__start";
        document.querySelector(".toggle__start").innerHTML = "Start";
        document.querySelector(".clear__stopwatch").classList = "clear__stopwatch";
    }
    var updateMainTimeUI = () => {
        document.querySelector(".time").innerHTML = getTimeWithColons();
    }
    var updateMillisUI = () => {
        document.querySelector(".milliseconds").innerHTML = getFormattedMillis();
    }
    var runIfInterfaceActive = callback => {
        if (document.querySelector(".simple__stopwatch").firstChild) {
            callback();
        }
    }
    var resetStopwatch = () => { 
        resetProperties();
        resetStyleClasses();
        runIfInterfaceActive(updateMainTimeUI);
        runIfInterfaceActive(updateMillisUI);
    }
    var getTimeMeasurements = i => {
        // units of a clock (10hour, 1hour, 10min, 1min, 10sec 1sec) converted to all be in seconds.
        return [36000, 3600, 600, 60, 10, 1][i];
    }
    var reconfigureTime = () => { 
        let newUI = [0, 0, 0, 0, 0, 0];
        let secondsCopy = secondsSinceStart;
        for (let i = 0; i < 6; i++) {
            if (secondsCopy >= getTimeMeasurements(i)) {
                newUI[i] = Math.floor(secondsCopy / getTimeMeasurements(i));
                secondsCopy = secondsCopy % getTimeMeasurements(i);
            }
        }
        UIValues = newUI;
    }
    var updateTimeValues = () => {
        UIValues[5] === 9 ? reconfigureTime() : UIValues[5]++;
    }   
    var didSecondPass = () => {
        const result = Math.floor(secondsSinceStart) !== recordedSeconds;
        recordedSeconds = Math.floor(secondsSinceStart);
        return result;
    }
    var stopwatchLoop = () => {
            let loopID = setInterval(() => {
                if (!isActive) {
                    clearInterval(loopID);
                } else {
                    secondsSinceStart = secondsBeforePause + (Date.now() - startedTime) / 1000;
                    if (didSecondPass()) {
                        updateTimeValues();
                        runIfInterfaceActive(updateMainTimeUI);
                    }
                    runIfInterfaceActive(updateMillisUI);   
                }
            }, 8);
    }
    var toggleBtnStyle = () => {
        document.querySelector(".toggle__start").classList = getStartBtnClass();
        document.querySelector(".toggle__start").innerHTML = getStartBtnText();
        document.querySelector(".clear__stopwatch").classList = getClearBtnClass();
    }
    var verifyResetPress = (() => {
        let clearAttempts = 0;
        return function() {
            clearAttempts++;
            setTimeout(function() {
                clearAttempts = 0;
            }, 500);
            if (clearAttempts === 2) {
                resetStopwatch(); 
            }
        }
    })();
    var pause = () => {
        secondsBeforePause = secondsSinceStart;
        isActive = false;
        toggleBtnStyle(); 
    }
    var start = () => { 
        hasStarted = true;
        isActive = true;
        startedTime = Date.now();
        toggleBtnStyle();
        stopwatchLoop();
    }
    onEnterKeyHandler = input => {
        if (input.code === "Backspace" && hasStarted) {
            verifyResetPress();
        } else if (input.code === "Space" && hasStarted) {
            pause();
        } else if (input.key === "Enter" && !isActive) {
            start();
        }
    }
    var addHandlers = () => {
        document.addEventListener("keydown", onEnterKeyHandler);

        const buttonsContainer = document.querySelector(".stopwatch__buttons__container");
        buttonsContainer.addEventListener("click", event => {
            if (event.target.classList[0] === "toggle__start") {               
                isActive ? pause() : start();
            }
            if (event.target.classList[0] === "clear__stopwatch") {                
                resetStopwatch();
            }
        });
    }
    this.createStopwatch = () => {
        createStopwatchHtml();
        addHandlers();
    }
    this.removeHandlers = () => {
        document.removeEventListener("keydown", onEnterKeyHandler);
    }
}
export { simpleStopwatch };