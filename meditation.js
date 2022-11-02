"use strict";
import { stopwatch } from "./modules/stopwatch.js";

const clockInterface = document.querySelectorAll(".time");
const playIconDetermination = document.querySelector(".play__button__icon").classList;
const timeOfThoughts = document.querySelector(".analysis__info");
const lostFocusText = document.querySelector("#lost__focus__count");
const mainClock = new stopwatch();
let lostFocusAmount = 0; 
let btnPresses = 0;

const dynamicEventListener = action => {
    if (!isNaN(parseInt(action)) && !mainClock.hasStarted) 
    if ((action !== "0" || !mainClock.isEmpty)) {
        mainClock.isEmpty = false;
        mainClock.setInterface(action, clockInterface);
        mainClock.seconds = mainClock.convertToSeconds(mainClock.interface);
        mainClock.updateInterface();
    }
    if (action === "Backspace" && !mainClock.isEmpty) {
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
    if (action === "Enter" && !mainClock.isActive && !mainClock.isEmpty) {
        mainClock.hasStarted = true;
        mainClock.isActive = true;
        mainClock.seconds = mainClock.convertToSeconds(mainClock.interface);
        mainClock.countDown(clockInterface);
        playIconDetermination.toggle("active"); 
    }
    else if (action === "Enter" && mainClock.isActive) {
        let recordedTime = mainClock.interface[0] + mainClock.interface[1] + ":" + mainClock.interface[2] + 
                mainClock.interface[3] + ":" + mainClock.interface[4] + mainClock.interface[5];
        timeOfThoughts.innerHTML += `<span>
                            ${recordedTime}
                        </span>`;
        lostFocusText.innerHTML = "Lost focus: " + ++lostFocusAmount;
    }
    if (action === "Space" && mainClock.hasStarted) {
        mainClock.isActive ? mainClock.isActive = false : mainClock.countDown(clockInterface);
        playIconDetermination.toggle("active");
    }
}

document.addEventListener("keydown", function(input) {
    input.code === "Backspace" || input.code === "Space" ? dynamicEventListener(input.code) 
        : dynamicEventListener(input.key);
})

document.addEventListener("click", function(event) {
    if (event.target.classList[0] === "play__button__icon") {
        !mainClock.isActive ? dynamicEventListener("Enter") : dynamicEventListener("Space");
    }
})

if (document.addEventListener("click", function() {
    console.log("foo");
}))

mainClock.onTimerEnd = () => {
    let audio = new Audio("./images_sound/alarm.mp3");
    audio.play();
    playIconDetermination.toggle("active"); 
}

// make responsive
// make it better looking --- look into UX design and other timer designs 
// functionality for FAQ, login, about