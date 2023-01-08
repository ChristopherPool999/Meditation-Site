"use strict";   
import { simpleTimer } from "./modules/timer.js";
import { simpleCalendar } from "./modules/calendar.js";
import { simpleStopwatch } from "./modules/stopwatch.js"; 

const calendar = new simpleCalendar();
const stopwatch = new simpleStopwatch();
const timer = new simpleTimer();
timer.createClockUI();

var playMusic = () => {
    let audio = new Audio("./images_sound/alarm.mp3");
    // audio.play();
    // if (document.querySelector(".simple__timer").firstChild) {
    //     document.querySelector(".play__button").classList.toggle("active");
    // } needs to be replaced now that we are using circle
}
timer.onTimerEnd = playMusic;

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