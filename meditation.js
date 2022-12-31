"use strict";   
import { simpleTimer } from "./modules/timer.js";
import { simpleCalendar } from "./modules/calendar.js";
import { simpleStopwatch } from "./modules/stopwatch.js"; 

const calendar = new simpleCalendar();
const stopwatch = new simpleStopwatch();
const mainClock = new simpleTimer();
mainClock.createClock();

var playMusic = () => {
    let audio = new Audio("./images_sound/alarm.mp3");
    audio.play();
    if (document.querySelector(".simple__timer").firstChild) {
        document.querySelector(".play__button").classList.toggle("active");
    }
}
mainClock.onTimerEnd = playMusic;

document.addEventListener("click", event => {
    const navbarMenu = document.querySelector("#navbar__menu").classList;
    const mobileDropdown = navbar.querySelector(".navbar__toggle").classList;

    if (event.target.classList[0] === "bar" || event.target.classList[0] === "navbar__toggle" || 
                event.target.classList[0] === "navbar__toggle__highlight") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    } else if (navbarMenu[0] === "active" && event.target.classList[0] !== "tabs") {
        navbarMenu.toggle("active");
        mobileDropdown.toggle("active");
    }
})

{
    const featureSelector = document.querySelector(".feature__selector");
    const stopwatchBtn = featureSelector.querySelector("#stopwatch__selector");
    const clockBtn = featureSelector.querySelector("#clock__selector");
    const calendarBtn = featureSelector.querySelector("#calendar__selector");

    var swapIcons = event => {
        if (calendarBtn.classList[0] === "active") {
            calendarBtn.classList.toggle("active");
            
        } else {
            clockBtn.classList[0] === "active" ? clockBtn.classList.toggle("active") 
                : stopwatchBtn.classList.toggle("active");   
        }
        event.target.classList.toggle("active");
    }
    var removeOldFunctionality = () => {
            mainClock.removeHandlers();
            stopwatch.removeHandlers();
            const timerContainer = document.querySelector(".simple__timer");
            const stopwatchContainer = document.querySelector(".simple__stopwatch");
            const calendarContainer = document.querySelector(".simple__calendar");
            if (timerContainer && timerContainer.firstChild) {
                timerContainer.replaceChildren();
            } else if (stopwatchContainer && stopwatchContainer.firstChild) {
                stopwatchContainer.replaceChildren();
            } else if (calendarContainer && calendarContainer.firstChild) {
                calendarContainer.replaceChildren();
            }
    }
    var getNewFunctionality = event => {
        if (event.target.id === "clock__selector") {
            mainClock.createClock();
        } else if (event.target.id === "stopwatch__selector") {
            stopwatch.createStopwatch();
        } else {
            calendar.createCalendar();
        }
    }
    featureSelector.addEventListener("click", event => {
        if (event.target.classList[0] !== "active") {
            swapIcons(event);
            removeOldFunctionality();
            getNewFunctionality(event);
        }
    })
}

// figure out accessability and why they keep fucking up my buttons

// need to remember why we changed the settime to be before everything else, pretty sure there was a bug but it doesnt happen now?
// gotta add opitimation for query selector
// gotta also change all event listeners to be on specific nodes

// make it so there is animation when either alarm or stopwatch is running and so you will be able to tell while not on that screen
// a hourglass with sand would be a cool idea for the timer function. 

// add calendar and tracking
// implement log data button
// cookies to save user information
// functionality for FAQ, login, about
// light dark mode

// make responsive
// make it better looking --- look into UX design and other timer designs 