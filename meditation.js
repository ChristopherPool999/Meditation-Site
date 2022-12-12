"use strict";   
import { simpleStopwatch } from "./modules/timer.js";
import { simpleCalendar } from "./modules/calendar.js";

showCountdown();
function showCalendar() {
    let calendarGrid = document.querySelectorAll(".calendar__dates");
    let monthName = document.querySelector(".calendar__month"); 
    const mainCalendar = new simpleCalendar(calendarGrid, monthName);
    mainCalendar.changeCalendar();

    document.addEventListener("click", event => {
        if (event.target.id === "last__month" || event.target.id === "last__month__bar") {
            mainCalendar.previousMonth();
            mainCalendar.changeCalendar();
        }
        if (event.target.id === "next__month" || event.target.id === "next__month__bar") {
            mainCalendar.nextMonth();
            mainCalendar.changeCalendar();
        }
    })
}

function showCountdown() {
    const mainClock = new simpleStopwatch(); // can start the search for a node from another querySelector to improve performance do this after fixing other shit lul

    mainClock.onTimerEnd = () => {
        let audio = new Audio("./images_sound/alarm.mp3");
        audio.play();
        document.querySelector(".play__button").toggle("paused");
    }
    document.addEventListener("mousedown", function(event) {
        if (event.target.classList[0] === "play__button" || event.target.classList[0]
                === "play__button__highlight") {
            !mainClock.isActive() ? mainClock.start() : mainClock.pause();
        }
    })
    document.addEventListener("keydown", function(input) {
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
    })
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
            swapactiveIcons();

            function swapactiveIcons() {
                if (changeToCalendar.classList[0] === "active") {
                    changeToCalendar.classList.toggle("active");
                } else {
                    changeToClock.classList[0] === "active" ? changeToClock.classList.toggle("active") 
                        : changeToStopwatch.classList.toggle("active");   
                }
                event.target.classList.toggle("active");
            }

            // function swapFeatures() {
            //     if (changeToCalendar.classList[0] === "active") {
            //         let countdownContainer = document.querySelector(".countdown__container");
            //         countdownContainer.style.transition = "all 0.2s";
            //         countdownContainer.style.transform = "translateY(-400px)";
            //     }
            // }
        }
    }
})



// add calendar and tracking
// implement log data button
// cookies to save user information
// functionality for FAQ, login, about
// light dark mode

// make responsive
// make it better looking --- look into UX design and other timer designs 