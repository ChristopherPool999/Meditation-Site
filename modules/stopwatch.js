"use strict";

let poopoo = 123;

const stopwatch = function() {
    this.interface = [0, 0, 0, 0, 0, 0];
    this.isActive = false;
    this.seconds = 0;
    this.hasStarted = false;
    this.isEmpty = true;
    this.onTimerEnd = function() {};

    let clockLoop = null;
    this.countDown = elements => {
        this.isActive = true;
        if (clockLoop === null) {
            clockLoop = setInterval(() => {
                if (this.isActive === false) {
                    clearInterval(clockLoop);
                    clockLoop = null;
                    return;
                }
                this.seconds--;
                if (this.seconds === 0) {
                    this.onTimerEnd();
                    this.reset();
                }
                if (elements !== undefined) {
                    this.interface = this.convertToClockFormat(this.seconds);
                    this.updateInterface(elements);
                }
            }, 1000);
        }
    } 

    this.reset = () => {
        this.interface = [0, 0, 0, 0, 0, 0];
        this.isActive = false;
        this.seconds = 0;
        this.isEmpty = true;
        this.hasStarted = false;
    }

    const timerUnitsAsSeconds = [36000, 3600, 600, 60, 10, 1]; // different positions of a timer converted to seconds.
    this.convertToSeconds = clock => {
        let totalSeconds = 0;
        for (let i = 0; i < clock.length; i++) {
            totalSeconds += clock[i] * timerUnitsAsSeconds[i];
        }
        return totalSeconds;
    }

    this.convertToClockFormat = seconds => {
        let newTimer = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < newTimer.length; i++) {
            if (seconds >= timerUnitsAsSeconds[i]) {
                newTimer[i] = Math.floor(seconds / timerUnitsAsSeconds[i]);
                seconds = seconds % timerUnitsAsSeconds[i];
            }
        }
        return newTimer;
    }

    // functions for directly changing elements
    this.setInterface = (input, elementList) => {
        if (this.interface[0] === 0) {
            this.interface.shift();
            this.interface.push(input);
            this.updateInterface(elementList);
        }
    }

    this.updateInterface = elementList => {
        for (let i = 0; i < 6; i++) {
            if (parseInt(elementList[i].innerHTML) === this.interface[i]) {
                continue;
            }
            elementList[i].innerHTML = this.interface[i];
        }
    }
}

export { stopwatch };