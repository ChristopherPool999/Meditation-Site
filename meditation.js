"use strict";   
import { simpleTimer } from "./modules/timer.js";
import { simpleCalendar } from "./modules/calendar.js";

const calendar = new simpleCalendar();
const mainClock = new simpleTimer();
mainClock.createClock();
mainClock.onTimerEnd = () => {
    let audio = new Audio("./images_sound/alarm.mp3");
    audio.play();
    document.querySelector(".play__button").toggle("paused");
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
                mainClock.removeHandlers();
                if (event.target.id === "clock__selector") {
                    mainClock.createClock();
                }
                if (event.target.id === "stopwatch__selector") {
                }
                if (event.target.id === "calendar__selector") {
                    calendar.createCalendar();
                }
            }
        }
    }
})

// play button doesnt get reset after chaning functionality

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