"use strict";
import { stopwatch } from "./modules/stopwatch.js";

const clockInterface = document.querySelectorAll(".timers");
let playIconDetermination = document.querySelector(".play__button__icon").classList;
let mainClock = new stopwatch();
let btnPresses = 0;
let timeOfThoughts = document.querySelector(".thought__times");
let lostFocusAmount = 0; 
let lostFocusText = document.querySelector("#number__of__thoughts");

const sideClock = new stopwatch();
sideClock.seconds = 1000;
sideClock.countDown();

mainClock.onTimerEnd = () => {
    let audio = new Audio("./images_sound/alarm.mp3");
    audio.play();
    playIconDetermination.toggle("active"); 
}

document.addEventListener("keydown", function(input) {
    if (!isNaN(parseInt(input.key)) && !mainClock.hasStarted) 
        if ((input.key !== "0" || !mainClock.isEmpty)) {
            mainClock.isEmpty = false;
            mainClock.setInterface(input.key, clockInterface);
            mainClock.seconds = mainClock.convertToSeconds(mainClock.interface);
            mainClock.updateInterface();
        }
    if (input.key === "Backspace" && !mainClock.isEmpty) {
        btnPresses++;
        setTimeout(function() {
            btnPresses = 0;
        }, 500);
        if (btnPresses === 2) {
            if (mainClock.isActive) {
                playIconDetermination.toggle("active"); 
            }
            mainClock.reset();
            mainClock.updateInterface(clockInterface);
        }
    }
    if (input.key === "Enter" && !mainClock.isActive && !mainClock.isEmpty) {
        mainClock.hasStarted = true;
        mainClock.isActive = true;
        mainClock.seconds = mainClock.convertToSeconds(mainClock.interface);
        mainClock.countDown(clockInterface);
        playIconDetermination.toggle("active"); 
    }
    else if (input.key === "Enter" && mainClock.isActive) {
        let recordedTime = mainClock.interface[0] + mainClock.interface[1] + ":" + mainClock.interface[2] + 
                mainClock.interface[3] + ":" + mainClock.interface[4] + mainClock.interface[5];
        timeOfThoughts.innerHTML += `<span>
                            ${recordedTime}
                        </span>`;
        lostFocusText.innerHTML = "Lost focus: " + ++lostFocusAmount;
    }
    if (input.code === "Space" && mainClock.hasStarted) {
        mainClock.isActive ? mainClock.isActive = false : mainClock.countDown(clockInterface);
        playIconDetermination.toggle("active");
    }
})

// still has spamming spacebar problem
// pretty sure spacebar problem is due to the timer being called twice in order to lower the seconds.
// so for instance if you press if 2x really fast itll increment by -2 instead of -1. so probably what is happening
// is that setTimer function is getting called twice i think.

// fix scalable div container 
