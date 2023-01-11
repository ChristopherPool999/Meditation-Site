"use strict";

const simpleTimer = function() {
    let timerUIasArr = [0, 0, 0, 0, 0, 0]; 
    let timerLength = 0;
    let startedTime = null;
    let secondsBeforePause = 0;
    let secondsSinceStart = 0;
    let recordedSeconds = 0;  
    let isEmpty = true;
    let isActive = false;
    let hasStarted = false;

    var getSetTimerHtml = () => {
        let startButtonClassName = isEmpty ? "start__button" : "start__button active";
        return `
            <div class="timer__container">
                <div class="timer">
                    <span class="time">${getTimerWithColons()}</span> 
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
    var getTimerWithColons = () => {
        return "" + timerUIasArr[0] +  timerUIasArr[1] +  ":" + timerUIasArr[2] + timerUIasArr[3] 
                + ":" + timerUIasArr[4] +  timerUIasArr[5];
    }
    var updateNewSetTime = () => {
        document.querySelector(".time").innerHTML = getTimerWithColons();
    }
    var canAddTime = input => {
        return !isNaN(parseInt(input)) 
                && !hasStarted 
                && timerUIasArr[0] === 0 
                && (!isEmpty || input !== "0");
    }  
    var addToTimer = input => {
        if (isEmpty){
            document.querySelector(".start__button").classList.toggle("active");
            isEmpty = false;
        }
        timerUIasArr.shift();
        timerUIasArr.push(input);
        updateNewSetTime();
    }
    var clearInput = () => {
        timerUIasArr = [0, 0, 0, 0, 0 ,0];
        isEmpty = true;
        timerLength = 0;
        updateNewSetTime();
    }
    var getTimeRemaining = () => {
        let totalSeconds = 0;
        for (let i = 0; i < timerUIasArr.length; i++) {
            totalSeconds += timerUIasArr[i] * getTimeMeasurements(i);
        }
        return totalSeconds;
    }
    var getTimeMeasurements = i => {
        // units of a clock (10hour, 1hour, 10min, 1min, 10sec 1sec) converted to all be in seconds.
        return [36000, 3600, 600, 60, 10, 1][i];
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
    var updateTimerUIArr = timerInitiated => {
        timerUIasArr[5] === 0 || timerInitiated ? reconfigureTime() : timerUIasArr[5]--;
    }  
    var initiateTimer = () => {
        timerLength = getTimeRemaining();
        updateTimerUIArr(true);
        document.querySelector(".simple__timer").innerHTML = getActiveTimerUI();
        setTimeout(() => { 
            setCircleDashArray(); // 1 sec delay to trigger reflow and get a transition effect
        }, 1);
        replaceEventHandlers();
        hasStarted = true;
        isActive = true;
        startedTime = Date.now();
        countDown();
    }
    var handlerForActiveTimer = action => {
        if (action === "reset" && !isEmpty) {
            resetTimer();
        } else if (action === "pause" && isActive) {
            pause();
        } else if (action === "start" && !isEmpty && !isActive) {
            resumeTimer();
        }
    }
    var handlerForSettingTimer = action => {
        if (action !== NaN) {
            addToTimer(targetText);
        } else if (action === "delete" && !isEmpty) {
            clearInput();
        } else if (action === "start" && !isEmpty && !isActive) {
            initiateTimer();
        }
    }



    var listnerForSettingTimer = () => {
        document.querySelector(".timer__container").addEventListener("click", event => {
            let target = event.target.classList[0];
            let targetText = event.target.innerHTML;

        });
    }











    var confirmBackKey = (() => {
        let resetAttempts = 0;
        return function() {
            resetAttempts++;
            setTimeout(function() {
                resetAttempts = 0;
            }, 500);
            if (resetAttempts === 2) {
                isActive ? resetTimer() : clearInput(); 
            }
        }
    })();
    var runIfInterfaceActive = callback => {
        if (document.querySelector(".simple__timer").firstChild) {
            callback();
        }
    }
    var resumeTimer = () => {
        if (!hasStarted) {
            timerLength = getTimeRemaining();
        }
        isActive = true;
        updateTimerUIArr(true);
        secondsBeforePause = getTimePassed();
        secondsSinceStart = 0;
        if (!hasStarted) {
            document.querySelector(".simple__timer").innerHTML = getActiveTimerUI();
            replaceEventHandlers();
            setTimeout(() => { // to trigger reflow and get a transition effect
                setCircleDashArray();
            }, 1);
        }
        startedTime = Date.now();
        if (hasStarted) {
            runIfInterfaceActive(toggleActiveButtonStyle);
        }
        hasStarted = true;
        countDown();
    }
    var resetProperties = () => { /////////////////////////// might need to break up
        timerUIasArr = [0, 0, 0, 0, 0, 0];
        isActive = false;
        isEmpty = true;
        hasStarted = false;
        startedTime = null;
        secondsBeforePause = 0;
        secondsSinceStart = 0;
        recordedSeconds = 0;  
    }
    var isTimerUIActive = () => {
        return document.querySelector(".simple__timer").firstChild;
    }
    var toggleActiveButtonStyle = () => {
        const toggleTimerBtn = document.querySelector(".toggle__timer"); 
        toggleTimerBtn.classList.toggle("active");
        let buttonText = isActive ? "Pause" : "Start";
        toggleTimerBtn.innerHTML = buttonText;

    }
    var listenForTimerBtns = () => {
        document.querySelector(".started__timer__buttons__container").addEventListener("click", event => {
            if (event.target.classList[0] === "toggle__timer") {
                isActive ? pause() : resumeTimer();
            } else if (event.target.classList[0] === "clear__timer") {
                resetTimer();
            }
        })
    }
    var replaceEventHandlers = () => {
        this.removeHandlers();
        document.addEventListener("keydown", handlerForActiveTimer);
        isActive ? listenForTimerBtns() : listnerForSettingTimer();
    }
    var resetTimer = () => {
        if (!hasStarted && isTimerUIActive()) {
            resetProperties();
            document.querySelector(".start__button").classList.toggle("active");
            document.querySelector(".time").innerHTML = "00:00:00";
        } 
        if (hasStarted && isTimerUIActive()) {
            resetProperties();  
            document.querySelector(".simple__timer").innerHTML = getSetTimerHtml();
            replaceEventHandlers();
        }
    }  
    var getPercentTimeLeft = () => {
        // circle is always .1 second early to account for .1 second transition effect. 
        const timeAfterAdjustment = this.getTimeLeft() - .1 > 0 ? this.getTimeLeft() - .1 : 0; 
        return timeAfterAdjustment / timerLength;
    }
    var setCircleDashArray = () => {
        const TimeLeftDasharray = Math.round(getPercentTimeLeft() * 283);
        const circleDashArray = `${TimeLeftDasharray} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDashArray);
    }
    var didSecondPass = () => {
        return Math.floor(getTimePassed()) > Math.floor(recordedSeconds);
    }
    var updateActiveTimerUI = () => {
        document.querySelector(".base-timer__label").innerHTML = getTimerWithColons();
        if (this.getTimeLeft() !== 0) {
            setCircleDashArray();   
        }
    }
    var countDown = () => {
            let clockLoop = setInterval(() => {
                if (false) {
                    clearInterval(clockLoop);
                } else {
                    console.log(getTimePassed());
                    secondsSinceStart = (Date.now() - startedTime) / 1000;
                    if (didSecondPass()) {
                        updateTimerUIArr();
                    }
                    recordedSeconds = Math.floor(getTimePassed());
                    runIfInterfaceActive(updateActiveTimerUI);
                    if (this.getTimeLeft() === 0) {
                        // this.onTimerEnd();
                        timerFinish();
                    }
                }
            }, 100);
    }
    var pause = () => {
        if (this.getTimeLeft() <= .1) { // edge case for pausing near end of timer since 
            return;                     // timer is delayed by .1s for transition effect to be accurate
        }
        isActive ? isActive = false : countDown();
        runIfInterfaceActive(toggleActiveButtonStyle);
    }
    var getStartedButtonsHtml = () => {
        let toggleStopwatchClass = isActive ? "toggle__timer active" : "toggle__timer";
        let toggleStopwatchText = isActive ? "Pause" : "Start";

        return `<div class="started__timer__buttons__container">
                    <button class="${toggleStopwatchClass}">${toggleStopwatchText}</button>
                    <button class="clear__timer">Clear</button>
                </div>`;
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
                        ${getTimerWithColons()} 
                    </span>
                </div>`;
    }
    var getActiveTimerUI = () => {
        return `<div class="timer">` 
                + activeTimerCircleHtml()
                + getStartedButtonsHtml()
                + `</div>`;
    }
    var getTimePassed = () => {
        return secondsBeforePause + secondsSinceStart;
    }
    this.createClockUI = () => {
        document.addEventListener("keydown", handlerForActiveTimer);
        document.querySelector(".simple__timer").innerHTML = (hasStarted) ? getActiveTimerUI() : getSetTimerHtml();
        hasStarted ? listenForTimerBtns() : listnerForSettingTimer();
    }
    this.removeHandlers = () => {
        document.removeEventListener("keydown", handlerForActiveTimer);
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