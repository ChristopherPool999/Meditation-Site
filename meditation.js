"use strict";   
import { simpleTimer } from "./modules/timer.js";
import { simpleCalendar } from "./modules/calendar.js";
import { simpleStopwatch } from "./modules/stopwatch.js"; 

const calendar = new simpleCalendar();
const stopwatch = new simpleStopwatch();
const timer = new simpleTimer();
timer.createClockUI();

var toggleMobileMenu = () => {
    const navbarMenu = document.querySelector("#navbar__menu").classList.toggle("active");
    const mobileDropdown = navbar.querySelector(".navbar__toggle").classList.toggle("active");
    navbarMenu.toggle("active");
    mobileDropdown.toggle("active");
}
document.addEventListener("click", event => {
    if (event.target.classList[0] === "bar" || event.target.classList[0] === "navbar__toggle" || 
                event.target.classList[0] === "navbar__toggle__highlight") {
        toggleMobileMenu();
    } else if (document.querySelector("#navbar__menu").classList[0] === "active" && event.target.classList[0] !== "tabs") {
        toggleMobileMenu();
    }
});
var resetIcons = () =>{
    const featureSelector = document.querySelector(".feature__selector");
    featureSelector.querySelector("#stopwatch__selector").classList = "";
    featureSelector.querySelector("#clock__selector").classList = "";
    featureSelector.querySelector("#calendar__selector").classList = "";
}
var swapIcons = event => {
    resetIcons();
    event.target.classList.toggle("active");
}
var removeOldFunctionality = () => {
    const timerNode = document.querySelector(".simple__timer");
    const stopwatchNode = document.querySelector(".simple__stopwatch");
    const calendarNode = document.querySelector(".simple__calendar");
    if (timerNode.firstChild) {
        timerNode.replaceChildren();
        timer.removeHandlers();
    } else if (stopwatchNode.firstChild) {
        stopwatchNode.replaceChildren();
        stopwatch.removeHandlers();
    } else if (calendarNode.firstChild) {
        calendarNode.replaceChildren();
    }
}
var getNewFunctionality = event => {
    if (event.target.id === "clock__selector") {
        timer.createClockUI();
    } else if (event.target.id === "stopwatch__selector") {
        stopwatch.createStopwatch();
    } else {
        calendar.createCalendar();
    }
}
document.querySelector(".feature__selector").addEventListener("click", event => {
    if (event.target.classList[0] !== "active") {
        swapIcons(event);
        removeOldFunctionality();
        getNewFunctionality(event);
    }
});


// functionality for FAQ, login, about
// maybe save notes for calendar
// would require cookies, and then we have a reason for the login 


// make responsive
// make it better looking --- look into UX design and other timer designs 

// post application internship
////// -----------------------------


// gotta add opitimation for query selector
// gotta also change all event listeners to be on specific nodes