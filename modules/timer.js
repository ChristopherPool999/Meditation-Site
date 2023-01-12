"use strict";

const simpleTimer = function() {
    let timerUIasArr = [0, 0, 0, 0, 0, 0]; 
    let timerLength = 0;
    let startedTime = null;
    let secondsBeforePause = 0;
    let secondsSinceStart = 0;
    let recordedSeconds = 0;     
    let isActive = false;
    let keyListenerRef = null;

    var getTimeWithColons = () => {
        return "" + timerUIasArr[0] +  timerUIasArr[1] +  ":" + timerUIasArr[2] + timerUIasArr[3] 
                + ":" + timerUIasArr[4] +  timerUIasArr[5];
    }
    var isTimerEmpty = () => {
        for (let i = 0; i < timerUIasArr.length; i++) {
            if (timerUIasArr[i] !== 0) {
                return false;
            }
        }
        return true;
    }
    var getUnbegunTimerHtml = () => {
        let startButtonClassName = isTimerEmpty() ? "start__button" : "start__button active";
        return `
            <div class="timer__container">
                <div class="timer">
                    <span class="time">${getTimeWithColons()}</span> 
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
                <div class="timer__end__notification"></div>
            </div>`;
    }
    var getPercentTimeLeft = () => {
        // circle is always .1 second early to account for .1 second transition effect. 
        const timeAfterAdjustment = (this.getTimeLeft() - .1) > 0 ? this.getTimeLeft() - .1 : 0; 
        return timeAfterAdjustment / timerLength;
    }
    var setCircleDashArray = () => {
        const TimeLeftDasharray = Math.round(getPercentTimeLeft() * 283);
        const circleDashArray = `${TimeLeftDasharray} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDashArray);
    }
    var canInputTime = input => {
        return !isNaN(parseInt(input)) 
                && timerUIasArr[0] === 0 
                && (!isTimerEmpty() || input !== "0");
    }  
    var updateInterface = (node, html) => {
        document.querySelector(node).innerHTML = html;
    }
    var inputTime = input => {
        if (isTimerEmpty()){
            document.querySelector(".start__button").classList.toggle("active");
        }
        timerUIasArr.shift();
        timerUIasArr.push(input);
        updateInterface(".time", getTimeWithColons());
    }
    var resetProperties = () => {
        timerUIasArr = [0, 0, 0, 0, 0, 0];
        isActive = false;
        secondsBeforePause = 0;
        secondsSinceStart = 0;
        recordedSeconds = 0; 
        timerLength = 0;
        startedTime = null;
    }
    var clearInput = () => {
        resetProperties();
        updateInterface(".time", getTimeWithColons());        
        document.querySelector(".start__button").classList.toggle("active");
    }
    var getTimeMeasurements = i => {
        // units of a clock (10hour, 1hour, 10min, 1min, 10sec 1sec) converted to all be in seconds.
        return [36000, 3600, 600, 60, 10, 1][i];
    }
    var getTimerLength = () => {
        let totalSeconds = 0;
        for (let i = 0; i < timerUIasArr.length; i++) {
            totalSeconds += timerUIasArr[i] * getTimeMeasurements(i);
        }
        return totalSeconds;
    }
    var reconfigureTime = () => { 
        // reconfigures the UI array into proper format. For instance 90 seconds becomes 1min 30sec
        let secondsCopy = Math.ceil(this.getTimeLeft());
        let newTimer = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < newTimer.length; i++) {
            if (secondsCopy >= getTimeMeasurements(i)) {
                newTimer[i] = Math.floor(secondsCopy / getTimeMeasurements(i));
                secondsCopy = secondsCopy % getTimeMeasurements(i);
            }
        }
        timerUIasArr = newTimer;
    }
    var activeTimerCircleHtml = () => {
        return `<div class="base-timer">
                    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g class="base-timer__circle">
                            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                            <path
                                id="base-timer-path-remaining"
                                stroke-dasharray="${getPercentTimeLeft() * 283} 283"
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
                        ${getTimeWithColons()} 
                    </span>
                </div>`;
    }
    var getStartedButtonsHtml = () => {
        let toggleStopwatchClass = isActive ? "toggle__timer__btn active" : "toggle__timer__btn";
        let toggleStopwatchText = isActive ? "Pause" : "Start";

        return `<div class="started__timer__buttons__container">
                    <button class="${toggleStopwatchClass}">${toggleStopwatchText}</button>
                    <button class="clear__timer__btn">Clear</button>
                </div>`;
    }
    var getStartedTimerHtml = () => {
        return `<div class="timer">` 
                + activeTimerCircleHtml()
                + getStartedButtonsHtml()
                + `</div>`;
    }
    var getTimePassed = () => {
        return secondsBeforePause + secondsSinceStart;
    }  
    var didSecondPass = () => {
        return Math.floor(getTimePassed()) > Math.floor(recordedSeconds);
    }
    var countDown = () => {
        isActive = true;
        startedTime = Date.now();
        let clockLoop = setInterval(() => {
            if (!isActive) {
                clearInterval(clockLoop);
            } else {
                secondsSinceStart = (Date.now() - startedTime) / 1000;
                if (didSecondPass()) {
                    timerUIasArr[5] === 0 ? reconfigureTime() : timerUIasArr[5]--;
                }
                recordedSeconds = Math.floor(getTimePassed());
                if (document.querySelector(".simple__timer").firstChild) {
                    document.querySelector(".base-timer__label").innerHTML = getTimeWithColons();
                    setCircleDashArray(); 
                }
                if (this.getTimeLeft() === 0) {
                    // this.onTimerEnd();
                    resetTimer();
                    timerFinish();
                }
            }
        }, 100);
    }
    var beginTimer = () => {
        timerLength = getTimerLength();
        reconfigureTime();
        updateInterface(".simple__timer", getStartedTimerHtml());
        setTimeout(() => { 
            setCircleDashArray(); // 1 sec delay to trigger reflow and get a transition effect
        }, 1);
        countDown();
        replaceEventHandlers();
    }
    var confirmBackKey = (() => {
        let resetAttempts = 0;
        return callback => {
            resetAttempts++;
            setTimeout(function() {
                resetAttempts = 0;
            }, 500);
            if (resetAttempts === 2) {
                callback(); 
            }
        }
    })();
    var resetTimer = () => {
        resetProperties();
        updateInterface(".simple__timer", getUnbegunTimerHtml());
        replaceEventHandlers();
    }  
    var toggleActiveButtonStyle = () => {
        const toggleTimerBtn = document.querySelector(".toggle__timer__btn"); 
        toggleTimerBtn.classList.toggle("active");
        let buttonText = isActive ? "Pause" : "Start";
        toggleTimerBtn.innerHTML = buttonText;
    }
    var pause = () => {
        if (this.getTimeLeft() <= .1) { // edge case for pausing near end of timer since 
            return;                     // timer is delayed by .1s for transition effect to be accurate
        }
        isActive = false;
        toggleActiveButtonStyle();
    }
    var resumeTimer = () => {
        countDown();
        secondsBeforePause = getTimePassed();
        secondsSinceStart = 0;
        toggleActiveButtonStyle();
    }
    var isTimerStarted = () => {
        return startedTime === null ? false : true; 
    }
    var unbegunTimerOnClick = e => {
        let target = e.target;
        let targetText = target.innerHTML;
        if (canInputTime(targetText)) {
            inputTime(targetText);
        } else if (target.classList[0] === "clear__button" && !isTimerEmpty()) {
            clearInput();
        } else if (target.classList[0] === "start__button" && !isTimerEmpty() && !isActive) {
            beginTimer();
        }
    }
    var unbegunTimerOnKey = e => {
        if (canInputTime(e.key)) {
            inputTime(parseInt(e.key));
        } else if (e.key === "Backspace" && !isTimerEmpty()) {
            confirmBackKey(clearInput);
        } else if (e.key === "Enter" && !isTimerEmpty() && !isActive) {
            beginTimer();
        }
    }
    var startedTimerOnClick = e => {
        if (e.target.classList[0] === "clear__timer__btn") {
            resetTimer();
        } else if (e.target.classList[0] === "toggle__timer__btn") {
            isActive ? pause() : resumeTimer();
        }
    }
    var startedTimerOnKey = e => {
        if (e.key === "Backspace") {
            confirmBackKey(resetTimer);
        } else if (e.key === "Spacebar" && isActive) {
            pause();
        } else if (e.key === "Enter" && !isActive) {
            resumeTimer();
        }
    }
    var addlisteners = () => {
        if (!isTimerStarted()) {
            document.querySelector(".timer__container").addEventListener("click", unbegunTimerOnClick);
            keyListenerRef = unbegunTimerOnKey;
            document.addEventListener("keydown", keyListenerRef);
        } else {
            document.addEventListener("click", startedTimerOnClick);
            keyListenerRef = startedTimerOnKey;
            document.addEventListener("keydown", keyListenerRef);
        }
    }
    var replaceEventHandlers = () => {
        this.removeHandlers();
        addlisteners();
    }
    this.createClockUI = () => {
        updateInterface(".simple__timer", (isTimerStarted() ? getStartedTimerHtml() : getUnbegunTimerHtml()));
        addlisteners();
    }
    this.removeHandlers = () => {
        document.removeEventListener("keydown", keyListenerRef);
    }
    this.onTimerEnd = callback => {
        callback();
    }
    this.isActive = () => {
        return isActive;
    }
    this.getTimeLeft = () => {
        const timePassed = timerLength - getTimePassed()
        return timePassed < 0 ? 0 : timePassed;
    }
}
export { simpleTimer };

// can get rid of entire array by just modifying the html instead and then use the innerHTML of the timer to find the new value. 