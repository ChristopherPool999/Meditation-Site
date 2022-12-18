"use strict";   
import { simpleTimer } from "./modules/timer.js";
import { simpleCalendar } from "./modules/calendar.js";

showCountdown();
function showCalendar() {
    const mainCalendar = new simpleCalendar();
    document.addEventListener("click", event => {
        if (event.target.id === "last__month" || event.target.id === "last__month__bar") {
            mainCalendar.previousMonth();
        }
        if (event.target.id === "next__month" || event.target.id === "next__month__bar") {
            mainCalendar.nextMonth();
        }
    })
}

function showCountdown() {
    const mainClock = new simpleTimer(); // can start the search for a node from another querySelector to improve performance do this after fixing other shit lul
    mainClock.onTimerEnd = () => {
        let audio = new Audio("./images_sound/alarm.mp3");
        audio.play();
        document.querySelector(".play__button").toggle("paused");
    }
    let timer = document.querySelector(".timer");
    timer.addEventListener("keydown", event => {
        if (event.target.classList[0] === "play__button" || event.target.classList[0]
                === "play__button__highlight") {
            !mainClock.isActive() ? mainClock.start() : mainClock.pause();
        }
    })
    var timerKeyHandler = function(input) {
        if (!isNaN(parseInt(input.key))) {
            mainClock.addTime(input.key);
        }
        else if (input.code === "Backspace") {
            mainClock.clear();
        }
        else if (input.code === "Space") {
            mainClock.pause();
        }
        else if (input.key === "Enter") {
            mainClock.start();
        }
    }
    document.addEventListener("keydown", timerKeyHandler);
}

document.addEventListener("click", event => {
    const navbarMenu = document.querySelector("#navbar__menu").classList;
    const mobileDropdown = document.querySelector(".navbar__toggle").classList;

    if (event.target.classList[0] === "bar" || event.target.classList[0] === "navbar__toggle" || 
                event.target.classList[0] === "navbar__toggle__highlight") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    }
    else if (navbarMenu[0] === "active" && event.target.classList[0] !== "tabs") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    }
})

document.addEventListener("click", event => {
    let changeToStopwatch = document.querySelector("#stopwatch__selector");
    let changeToClock = document.querySelector("#clock__selector");
    let changeToCalendar = document.querySelector("#calendar__selector");

    if (event.target.id === "clock__selector" || event.target.id === "stopwatch__selector" 
            || event.target.id === "calendar__selector") {
        if (event.target.classList[0] !== "active") {
            swapIcons();
            removeOldFunctionality();
            getNewFunctionality();

            function swapIcons() {
                if (changeToCalendar.classList[0] === "active") {
                    changeToCalendar.classList.toggle("active");
                    
                } else {
                    changeToClock.classList[0] === "active" ? changeToClock.classList.toggle("active") 
                        : changeToStopwatch.classList.toggle("active");   
                }
                event.target.classList.toggle("active");
            }
            function removeOldFunctionality() {
                if (document.querySelector(".simple__timer__container").firstChild) {
                    document.querySelector(".simple__timer__container").replaceChildren();
                }
                if (document.querySelector(".simple__stopwatch__container").firstChild) {
                    document.querySelector(".simple__stopwatch__container").replaceChildren();
                }
                if (document.querySelector(".simple__calendar__container").firstChild) {
                    document.querySelector(".simple__calendar__container").replaceChildren();
                }
            }
            function getNewFunctionality() {
                if (event.target.id === "clock__selector") {
                    showCountdown();   
                }
                if (event.target.id === "stopwatch__selector") {
                    // placeholder
                }
                if (event.target.id === "calendar__selector") {
                    showCalendar();
                }
            }
        }
    }
})

// gotta add opitimation for query selector
// gotta also change all event listeners to be on specific nodes

// maybe add functionality so that calendar month stays the same when swapping features
// make it so there is animation when either alarm or stopwatch is running and so you will be able to tell while not on that screen
// a hourglass with sand would be a cool idea for the timer function. 

// add calendar and tracking
// implement log data button
// cookies to save user information
// functionality for FAQ, login, about
// light dark mode

// make responsive
// make it better looking --- look into UX design and other timer designs 