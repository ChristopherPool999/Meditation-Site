"use strict";
import { stopwatch } from "./modules/stopwatch.js";
import { calendarFormat } from "./modules/calendar.js";

const clockInterface = document.querySelectorAll(".time");
const playButtonIcon = document.querySelector(".play__button__icon").classList;
const navbarMenu = document.querySelector("#navbar__menu").classList;
const mobileDropdown = document.querySelector(".navbar__toggle").classList;
const interfaceContainer = document.querySelector(".timer").classList;
let interfaceFlash = null;
let btnPresses = 0;
const mainClock = new stopwatch();

const dynamicEventListener = input => {
    if (!isNaN(parseInt(input)) && !mainClock.hasStarted) 
        if (input !== "0" || !mainClock.isEmpty) {
            mainClock.isEmpty = false;
            mainClock.setInterface(input, clockInterface);
            mainClock.seconds = mainClock.convertToSeconds(mainClock.interface);
            mainClock.updateInterface();
        }
    if (input === "Backspace" && !mainClock.isEmpty) {
        btnPresses++;
        setTimeout(function() {
            btnPresses = 0;
        }, 500);
        if (btnPresses === 2) {
            if (mainClock.isActive) {
                playButtonIcon.toggle("active"); 
            }
            mainClock.reset();
            mainClock.updateInterface(clockInterface);
        }
    }
    if (input === "Enter" && !mainClock.isActive) {
        if (mainClock.isEmpty && interfaceFlash === null) {
            let clockflashAmount = 0;
            interfaceFlash = setInterval(() => {
                interfaceContainer.toggle("active");
                clockflashAmount++;
                if (clockflashAmount === 4) {
                    clearInterval(interfaceFlash);
                    interfaceFlash = null;
                    return;
                }
            }, 500); 
        }
        else if (!mainClock.isEmpty) {
            mainClock.hasStarted = true;
            mainClock.isActive = true;
            mainClock.seconds = mainClock.convertToSeconds(mainClock.interface);
            mainClock.countDown(clockInterface);
            playButtonIcon.toggle("active"); 
        }
    }
    if (input === "Space" && mainClock.hasStarted) {
        mainClock.isActive ? mainClock.isActive = false : mainClock.countDown(clockInterface);
        playButtonIcon.toggle("active");
    }
}

document.addEventListener("keydown", function(input) {
    input.code === "Backspace" || input.code === "Space" ? dynamicEventListener(input.code) 
            : dynamicEventListener(input.key);
})

document.addEventListener("click", function(event) {
    if (event.target.classList[0] === "play__button__icon" || event.target.classList[0]
                === "play__button__icon__highlight") {
        !mainClock.isActive ? dynamicEventListener("Enter") : dynamicEventListener("Space");
    }
    if (event.target.classList[0] === "bar" || event.target.classList[0] === "navbar__toggle" || 
                event.target.classList[0] === "navbar__toggle__highlight") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    }
    else if (navbarMenu[0] === "active" && event.target.classList[0] !== "tabs") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    }
    console.log(event.target.classList[0]);
})

mainClock.onTimerEnd = () => {
    let audio = new Audio("./images_sound/alarm.mp3");
    audio.play();
    playButtonIcon.toggle("active"); 
}

console.log(calendarFormat("2022", "11"));


// add calendar and tracking
// implement log data button
// cookies to save user information
// options for music played at end
// cover time with animated curtain
// functionality for FAQ, login, about
// light dark mode

// make responsive
// make it better looking --- look into UX design and other timer designs 